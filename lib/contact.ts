/** Shared contact helpers — profile-driven channels + form intents. */

export type ContactIntent =
  | "hire"
  | "partner"
  | "collaborate"
  | "personal"
  | "press"
  | "other";

export const CONTACT_INTENTS: {
  id: ContactIntent;
  label: string;
  description: string;
  subject: string;
}[] = [
  {
    id: "hire",
    label: "Hire / Recruit",
    description: "Roles, contracts, engineering work",
    subject: "Opportunity — hiring / contract",
  },
  {
    id: "partner",
    label: "Invest / Partner",
    description: "Ventures, capital, co-building",
    subject: "Partnership / investment",
  },
  {
    id: "collaborate",
    label: "Collaborate",
    description: "Projects, open source, research",
    subject: "Collaboration",
  },
  {
    id: "personal",
    label: "Personal",
    description: "Dating profile, introductions",
    subject: "Personal introduction",
  },
  {
    id: "press",
    label: "Press / Media",
    description: "Interviews, features, quotes",
    subject: "Press / media inquiry",
  },
  {
    id: "other",
    label: "Something else",
    description: "Anything that does not fit above",
    subject: "Hello from mosesedem.me",
  },
];

export function getIntent(id: string | null | undefined) {
  return (
    CONTACT_INTENTS.find((i) => i.id === id) ??
    CONTACT_INTENTS.find((i) => i.id === "other")!
  );
}

export function buildMailtoUrl(opts: {
  to: string;
  name: string;
  fromEmail: string;
  intent: ContactIntent;
  message: string;
}): string {
  const intent = getIntent(opts.intent);
  const body = [
    opts.message.trim(),
    "",
    "---",
    `From: ${opts.name.trim()} <${opts.fromEmail.trim()}>`,
    `Intent: ${intent.label}`,
    "via mosesedem.me/contact",
  ].join("\n");

  const params = new URLSearchParams({
    subject: intent.subject,
    body,
  });
  return `mailto:${opts.to}?${params.toString()}`;
}

export function buildWhatsAppUrl(opts: {
  phone: string;
  name: string;
  intent: ContactIntent;
  message: string;
  fromEmail?: string;
}): string {
  const intent = getIntent(opts.intent);
  const digits = opts.phone.replace(/\D/g, "");
  const lines = [
    `Hi Moses — ${opts.name.trim()} here.`,
    `Re: ${intent.label}`,
    "",
    opts.message.trim(),
  ];
  if (opts.fromEmail?.trim()) {
    lines.push("", `Email: ${opts.fromEmail.trim()}`);
  }
  const params = new URLSearchParams({
    phone: digits,
    text: lines.join("\n"),
    type: "phone_number",
    app_absent: "0",
  });
  return `https://api.whatsapp.com/send?${params.toString()}`;
}

export function normalizePhoneDisplay(phone: string): string {
  const raw = phone.trim();
  if (raw.startsWith("+")) return raw;
  if (raw.startsWith("234")) return `+${raw}`;
  return raw;
}
