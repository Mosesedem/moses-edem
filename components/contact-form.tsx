"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import {
  CONTACT_INTENTS,
  type ContactIntent,
  buildWhatsAppUrl,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  toEmail: string;
  phone: string;
  defaultIntent?: ContactIntent;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | {
      kind: "success";
      message: string;
      whatsapp: string;
      id?: string;
    }
  | {
      kind: "error";
      message: string;
      whatsapp?: string;
      mailto?: string;
    };

export function ContactForm({
  toEmail,
  phone,
  defaultIntent = "other",
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<ContactIntent>(defaultIntent);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const charCount = message.length;
  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length >= 10 &&
    status.kind !== "submitting";

  const whatsappPreview = useMemo(
    () =>
      buildWhatsAppUrl({
        phone,
        name: name || "Someone",
        intent,
        message: message || "(your message)",
        fromEmail: email || undefined,
      }),
    [phone, name, email, intent, message]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, intent, message, company }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        delivered?: string;
        id?: string;
        whatsapp?: string;
        mailto?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message:
            data.error ??
            "Could not send your message. Try WhatsApp or email me directly.",
          whatsapp: data.whatsapp ?? whatsappPreview,
          mailto: data.mailto,
        });
        return;
      }

      setStatus({
        kind: "success",
        message:
          data.message ??
          "Message sent. Check your inbox for a confirmation — I will reply soon.",
        whatsapp: data.whatsapp ?? whatsappPreview,
        id: data.id,
      });
      setMessage("");
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Try again, or use WhatsApp below.",
        whatsapp: whatsappPreview,
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="card-surface p-5 sm:p-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border text-accent">
          <CheckCircle2 size={22} strokeWidth={1.75} />
        </div>
        <p className="section-label mb-2">Delivered</p>
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          Message received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {status.message}
        </p>
        {status.id ? (
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">
            Ref: {status.id}
          </p>
        ) : null}
        <div className="cta-row mt-6">
          <a
            href={status.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle size={16} strokeWidth={1.75} />
            Prefer WhatsApp?
          </a>
        </div>
        <button
          type="button"
          className="mt-5 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-surface p-5 sm:p-6" noValidate>
      <p className="section-label mb-2">Message</p>
      <h2 className="mb-1 text-lg font-medium tracking-tight text-foreground">
        Write me
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Pick an intent, say what you need, and send. You will get a confirmation
        email; I usually reply within a few days.
      </p>

      <fieldset className="mb-5">
        <legend className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Intent
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_INTENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIntent(item.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                intent === item.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              )}
              title={item.description}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Name
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex h-11 w-full rounded-[var(--radius)] border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            placeholder="Your name"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={160}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-11 w-full rounded-[var(--radius)] border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>Message</span>
          <span className="normal-case tracking-normal tabular-nums">
            {charCount}/4000
          </span>
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-[var(--radius)] border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          placeholder="What should I know? Context, timeline, and how I can help."
        />
      </label>

      {status.kind === "error" ? (
        <div className="mt-3 space-y-2" role="alert">
          <p className="text-sm text-destructive">{status.message}</p>
          <div className="flex flex-wrap gap-2">
            {status.whatsapp ? (
              <a
                href={status.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !min-h-9 !px-3 !text-xs"
              >
                <MessageCircle size={14} strokeWidth={1.75} />
                WhatsApp
              </a>
            ) : null}
            {status.mailto ? (
              <a href={status.mailto} className="btn-secondary !min-h-9 !px-3 !text-xs">
                Open mail app
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="cta-row mt-5">
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary disabled:pointer-events-none disabled:opacity-50"
        >
          {status.kind === "submitting" ? (
            <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />
          ) : (
            <Send size={16} strokeWidth={1.75} />
          )}
          {status.kind === "submitting" ? "Sending…" : "Send message"}
        </button>
        <a
          href={whatsappPreview}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <MessageCircle size={16} strokeWidth={1.75} />
          WhatsApp
        </a>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        Messages go to my inbox via Resend. Prefer direct mail?{" "}
        <a
          href={`mailto:${toEmail}`}
          className="text-foreground underline decoration-border underline-offset-2 hover:text-accent"
        >
          {toEmail}
        </a>
      </p>
    </form>
  );
}
