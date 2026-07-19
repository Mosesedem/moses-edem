import { Resend } from "resend";
import {
  buildConfirmationEmail,
  buildInboundEmail,
  type ContactSubmission,
} from "@/lib/email/contact-templates";

/** Verified domain sender — must match a domain in the Resend dashboard. */
export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  "Moses Edem <moses@mosesedem.me>";

/** Primary inbox for new form submissions. */
export const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL?.trim() || "moses@mosesedem.me";

/** Default CC copies when CONTACT_CC_EMAILS is unset. */
const DEFAULT_CC = [
  "moses@renboot.com",
  "mosesedem81@gmail.com",
  "moses@protonmedicare.com",
];

/**
 * Extra inboxes that receive a copy of every contact submission.
 * Comma-separated override via CONTACT_CC_EMAILS.
 */
export function getContactCc(): string[] {
  const raw = process.env.CONTACT_CC_EMAILS?.trim();
  const list = raw
    ? raw
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    : DEFAULT_CC;

  const primary = CONTACT_TO.toLowerCase();
  // Dedupe and never CC the primary To address
  return Array.from(new Set(list)).filter((e) => e !== primary);
}

export type ContactDeliveryResult = {
  ok: true;
  inboundId: string;
  confirmationId: string | null;
  cc: string[];
};

export type ContactDeliveryError = {
  ok: false;
  code: "MISSING_API_KEY" | "RESEND_ERROR";
  message: string;
  details?: unknown;
};

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

/**
 * Sends:
 * 1. Inbound HTML email to Moses + CC copies (Reply-To = submitter)
 * 2. Confirmation HTML auto-reply to the submitter only
 */
export async function deliverContactEmails(
  submission: ContactSubmission
): Promise<ContactDeliveryResult | ContactDeliveryError> {
  const resend = getClient();
  if (!resend) {
    return {
      ok: false,
      code: "MISSING_API_KEY",
      message: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }

  const inbound = buildInboundEmail(submission);
  const confirm = buildConfirmationEmail(submission);
  const cc = getContactCc();

  const { data: inboundData, error: inboundError } = await resend.emails.send({
    from: CONTACT_FROM,
    to: [CONTACT_TO],
    ...(cc.length > 0 ? { cc } : {}),
    replyTo: submission.email,
    subject: inbound.subject,
    html: inbound.html,
    text: inbound.text,
    tags: [
      { name: "source", value: "contact_form" },
      { name: "intent", value: submission.intent },
    ],
  });

  if (inboundError || !inboundData?.id) {
    console.error("[email] inbound send failed:", inboundError);
    return {
      ok: false,
      code: "RESEND_ERROR",
      message:
        inboundError?.message ||
        "Failed to deliver your message. Please try again or use WhatsApp.",
      details: inboundError,
    };
  }

  // Auto-reply — only to the visitor (no CC of internal inboxes)
  let confirmationId: string | null = null;
  try {
    const { data: confirmData, error: confirmError } = await resend.emails.send(
      {
        from: CONTACT_FROM,
        to: [submission.email],
        replyTo: CONTACT_TO,
        subject: confirm.subject,
        html: confirm.html,
        text: confirm.text,
        tags: [
          { name: "source", value: "contact_confirmation" },
          { name: "intent", value: submission.intent },
        ],
      }
    );
    if (confirmError) {
      console.error("[email] confirmation send failed:", confirmError);
    } else {
      confirmationId = confirmData?.id ?? null;
    }
  } catch (err) {
    console.error("[email] confirmation exception:", err);
  }

  return {
    ok: true,
    inboundId: inboundData.id,
    confirmationId,
    cc,
  };
}
