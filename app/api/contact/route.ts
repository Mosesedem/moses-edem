import { NextResponse } from "next/server";
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  type ContactIntent,
} from "@/lib/contact";
import { deliverContactEmails } from "@/lib/email/resend";
import type { ContactSubmission } from "@/lib/email/contact-templates";
import { getProfile } from "@/lib/queries";

export const runtime = "nodejs";

const MAX_MESSAGE = 4000;
const MAX_NAME = 120;
const MAX_EMAIL = 160;

/** Simple in-memory rate limit: max N submissions per IP per window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const hits = new Map<string, number[]>();

type Body = {
  name?: string;
  email?: string;
  intent?: string;
  message?: string;
  /** Honeypot — bots fill this; humans leave empty. */
  company?: string;
};

const INTENTS: ContactIntent[] = [
  "hire",
  "partner",
  "collaborate",
  "personal",
  "press",
  "other",
];

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isIntent(value: string): value is ContactIntent {
  return (INTENTS as string[]).includes(value);
}

function clientIp(request: Request): string | null {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || null;
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    null
  );
}

function rateLimited(ip: string | null): boolean {
  if (!ip) return false;
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prev.length >= RATE_LIMIT) {
    hits.set(ip, prev);
    return true;
  }
  prev.push(now);
  hits.set(ip, prev);
  return false;
}

function jsonError(
  status: number,
  code: string,
  error: string,
  extras?: Record<string, unknown>
) {
  return NextResponse.json({ ok: false, code, error, ...extras }, { status });
}

/**
 * POST /api/contact
 *
 * Industry-standard contact intake:
 * 1. Validate + honeypot + rate limit
 * 2. Deliver HTML email via Resend to moses@mosesedem.me
 *    with CC copies to configured inboxes
 * 3. Auto-reply HTML confirmation to the visitor only
 *
 * Response:
 *   { ok: true, delivered: "resend", id, confirmationId, whatsapp }
 *   { ok: false, code, error, whatsapp?, mailto? }
 */
export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return jsonError(
      429,
      "RATE_LIMITED",
      "Too many messages. Please wait a bit, or use WhatsApp."
    );
  }

  let json: Body;
  try {
    json = (await request.json()) as Body;
  } catch {
    return jsonError(400, "INVALID_JSON", "Invalid request body.");
  }

  // Honeypot — pretend success so bots stop
  if (json.company && String(json.company).trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: "ignored" });
  }

  const name = String(json.name ?? "").trim();
  const email = String(json.email ?? "").trim().toLowerCase();
  const message = String(json.message ?? "").trim();
  const intentRaw = String(json.intent ?? "other").trim();

  if (!name || name.length > MAX_NAME) {
    return jsonError(
      400,
      "VALIDATION_ERROR",
      "Please enter a name (max 120 characters)."
    );
  }
  if (!email || email.length > MAX_EMAIL || !isEmail(email)) {
    return jsonError(
      400,
      "VALIDATION_ERROR",
      "Please enter a valid email address."
    );
  }
  if (!message || message.length < 10) {
    return jsonError(
      400,
      "VALIDATION_ERROR",
      "Message should be at least 10 characters."
    );
  }
  if (message.length > MAX_MESSAGE) {
    return jsonError(
      400,
      "VALIDATION_ERROR",
      "Message is too long (max 4000 characters)."
    );
  }
  if (!isIntent(intentRaw)) {
    return jsonError(400, "VALIDATION_ERROR", "Invalid intent.");
  }

  const intent = intentRaw;
  const submittedAt = new Date().toISOString();

  const submission: ContactSubmission = {
    name,
    email,
    intent,
    message,
    submittedAt,
    meta: {
      ip,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    },
  };

  // Fallback channels if email delivery fails
  let phone = "+2349030465501";
  let fallbackTo = "moses@mosesedem.me";
  try {
    const profile = await getProfile();
    if (profile.phone) phone = profile.phone;
    if (profile.email) fallbackTo = profile.email;
  } catch {
    /* seed defaults above */
  }

  const whatsapp = buildWhatsAppUrl({
    phone,
    name,
    intent,
    message,
    fromEmail: email,
  });
  const mailto = buildMailtoUrl({
    to: fallbackTo,
    name,
    fromEmail: email,
    intent,
    message,
  });

  const delivery = await deliverContactEmails(submission);

  if (!delivery.ok) {
    console.error("[contact] delivery failed:", delivery.code, delivery.message);
    return NextResponse.json(
      {
        ok: false,
        code: delivery.code,
        error: delivery.message,
        whatsapp,
        mailto,
      },
      { status: delivery.code === "MISSING_API_KEY" ? 503 : 502 }
    );
  }

  console.info("[contact] delivered", {
    intent,
    name,
    email,
    inboundId: delivery.inboundId,
    confirmationId: delivery.confirmationId,
    cc: delivery.cc,
  });

  return NextResponse.json({
    ok: true,
    delivered: "resend" as const,
    id: delivery.inboundId,
    confirmationId: delivery.confirmationId,
    whatsapp,
    message:
      "Message sent. Check your inbox for a confirmation — I will reply soon.",
  });
}
