import type { ContactIntent } from "@/lib/contact";
import { getIntent } from "@/lib/contact";

export type ContactSubmission = {
  name: string;
  email: string;
  intent: ContactIntent;
  message: string;
  /** ISO timestamp */
  submittedAt: string;
  /** Optional request metadata */
  meta?: {
    ip?: string | null;
    userAgent?: string | null;
    referer?: string | null;
  };
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    });
  } catch {
    return iso;
  }
}

function messageToHtml(message: string): string {
  return escapeHtml(message)
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br />");
}

const brand = {
  bg: "#0a0a0a",
  card: "#111111",
  border: "#262626",
  text: "#f5f5f5",
  muted: "#a3a3a3",
  accent: "#3b82f6",
  rowBg: "#161616",
};

/**
 * Inbound notification — goes to Moses with the full form entry.
 * Reply-To is set to the submitter so "Reply" works in the inbox.
 */
export function buildInboundEmail(sub: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const intent = getIntent(sub.intent);
  const when = formatWhen(sub.submittedAt);
  const subject = `[Contact · ${intent.label}] ${sub.name}`;

  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: "Name", value: escapeHtml(sub.name) },
    {
      label: "Email",
      value: `<a href="mailto:${escapeHtml(sub.email)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(sub.email)}</a>`,
    },
    { label: "Intent", value: escapeHtml(intent.label) },
    { label: "Submitted", value: escapeHtml(when) },
    { label: "Source", value: "mosesedem.me/contact", mono: true },
  ];

  if (sub.meta?.ip) {
    rows.push({ label: "IP", value: escapeHtml(sub.meta.ip), mono: true });
  }

  const detailRows = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid ${brand.border};width:110px;vertical-align:top;">
          <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">${r.label}</span>
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid ${brand.border};vertical-align:top;font-size:14px;line-height:1.5;color:${brand.text};${r.mono ? `font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;` : ""}">
          ${r.value}
        </td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.bg};color:${brand.text};font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border:1px solid ${brand.border};border-radius:10px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px 16px;border-bottom:1px solid ${brand.border};">
              <p style="margin:0 0 8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.muted};">New contact submission</p>
              <h1 style="margin:0;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:${brand.text};line-height:1.25;">
                ${escapeHtml(sub.name)}
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:${brand.muted};">
                ${escapeHtml(intent.label)} · ${escapeHtml(intent.description)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 8px;">
              <p style="margin:0 0 10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.muted};">Message</p>
              <div style="padding:16px 18px;background:${brand.rowBg};border:1px solid ${brand.border};border-radius:8px;font-size:15px;line-height:1.65;color:${brand.text};">
                ${messageToHtml(sub.message)}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;">
              <a href="mailto:${escapeHtml(sub.email)}?subject=${encodeURIComponent(`Re: ${intent.subject}`)}"
                 style="display:inline-block;background:${brand.accent};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 18px;border-radius:8px;">
                Reply to ${escapeHtml(sub.name.split(" ")[0] || "sender")}
              </a>
              <p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:${brand.muted};">
                Hitting reply in your mail client also works — Reply-To is set to their address.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:11px;color:${brand.muted};font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">
          mosesedem.me · contact form
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "NEW CONTACT SUBMISSION",
    "======================",
    `Name: ${sub.name}`,
    `Email: ${sub.email}`,
    `Intent: ${intent.label}`,
    `Submitted: ${when}`,
    `Source: mosesedem.me/contact`,
    sub.meta?.ip ? `IP: ${sub.meta.ip}` : null,
    "",
    "MESSAGE",
    "-------",
    sub.message,
    "",
    `Reply to: ${sub.email}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

/**
 * Auto-reply confirmation to the person who submitted the form.
 */
export function buildConfirmationEmail(sub: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const intent = getIntent(sub.intent);
  const first = sub.name.split(/\s+/)[0] || sub.name;
  const subject = `Thanks for reaching out, ${first}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${brand.bg};color:${brand.text};font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border:1px solid ${brand.border};border-radius:10px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 12px;">
              <p style="margin:0 0 8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${brand.muted};">mosesedem.me</p>
              <h1 style="margin:0;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:${brand.text};line-height:1.3;">
                Got it, ${escapeHtml(first)}.
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;font-size:15px;line-height:1.65;color:${brand.muted};">
              <p style="margin:0 0 14px;">
                Thanks for writing. I received your message
                ${intent.id !== "other" ? ` about <strong style="color:${brand.text};">${escapeHtml(intent.label.toLowerCase())}</strong>` : ""}
                and will get back to you as soon as I can — usually within a few days.
              </p>
              <p style="margin:0 0 14px;">
                If it is time-sensitive, reply to this email or reach me on WhatsApp from the site.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <div style="padding:14px 16px;background:${brand.rowBg};border:1px solid ${brand.border};border-radius:8px;">
                <p style="margin:0 0 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.muted};">Your message</p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:${brand.text};">
                  ${messageToHtml(sub.message.length > 400 ? `${sub.message.slice(0, 400)}…` : sub.message)}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;font-size:13px;line-height:1.55;color:${brand.muted};">
              <p style="margin:0;">
                — Moses Jacob Edem<br />
                <a href="https://mosesedem.me" style="color:${brand.accent};text-decoration:none;">mosesedem.me</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:11px;color:${brand.muted};">
          You are receiving this because you submitted the contact form on mosesedem.me.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Got it, ${first}.`,
    "",
    `Thanks for writing. I received your message${intent.id !== "other" ? ` about ${intent.label.toLowerCase()}` : ""} and will get back to you as soon as I can — usually within a few days.`,
    "",
    "If it is time-sensitive, reply to this email.",
    "",
    "Your message:",
    sub.message.length > 400 ? `${sub.message.slice(0, 400)}…` : sub.message,
    "",
    "— Moses Jacob Edem",
    "https://mosesedem.me",
  ].join("\n");

  return { subject, html, text };
}
