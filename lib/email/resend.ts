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

/** Where new form submissions are delivered. */
export const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL?.trim() || "moses@mosesedem.me";

export type ContactDeliveryResult = {
  ok: true;
  inboundId: string;
  confirmationId: string | null;
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
 * 1. Inbound HTML email to Moses (Reply-To = submitter)
 * 2. Confirmation HTML auto-reply to the submitter
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

  const { data: inboundData, error: inboundError } = await resend.emails.send({
    from: CONTACT_FROM,
    to: [CONTACT_TO],
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

  // Auto-reply — non-fatal if it fails after inbound succeeded
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
  };
}

/**
 * Optional side-channel (Slack, Zapier, n8n, Make, custom CRM).
 * Fire-and-forget — never blocks or fails the user-facing request
 * after email has already succeeded.
 *
 * Payload is a structured JSON event of the form entry.
 */
export async function notifyContactWebhook(
  submission: ContactSubmission,
  delivery: { inboundId: string; confirmationId: string | null }
): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!url) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4_000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "mosesedem.me-contact/1.0",
      },
      body: JSON.stringify({
        event: "contact.submitted",
        version: 1,
        data: {
          name: submission.name,
          email: submission.email,
          intent: submission.intent,
          message: submission.message,
          submittedAt: submission.submittedAt,
          meta: submission.meta ?? null,
          emailDelivery: {
            provider: "resend",
            inboundId: delivery.inboundId,
            confirmationId: delivery.confirmationId,
            to: CONTACT_TO,
            from: CONTACT_FROM,
          },
        },
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error(
        "[email] webhook non-OK:",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (err) {
    console.error("[email] webhook failed:", err);
  } finally {
    clearTimeout(timer);
  }
}
