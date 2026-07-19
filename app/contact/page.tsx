import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { CodePane } from "@/components/code-pane";
import { getAllPersonas, getProfile } from "@/lib/queries";
import {
  normalizePhoneDisplay,
  type ContactIntent,
} from "@/lib/contact";
import { isPersonaKey } from "@/lib/schema";

export const revalidate = 45;

export const metadata = {
  title: "Contact — Moses Edem",
  description:
    "Get in touch with Moses Edem — hire, partner, collaborate, or say hello. Email, WhatsApp, and a contact form.",
};

type Props = {
  searchParams: Promise<{ intent?: string; lens?: string }>;
};

function isContactIntent(value: string | undefined): value is ContactIntent {
  return (
    value === "hire" ||
    value === "partner" ||
    value === "collaborate" ||
    value === "personal" ||
    value === "press" ||
    value === "other"
  );
}

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const defaultIntent = isContactIntent(sp.intent) ? sp.intent : "other";
  const lens =
    sp.lens && isPersonaKey(sp.lens) ? sp.lens : undefined;

  const [profile, personas] = await Promise.all([
    getProfile(),
    getAllPersonas(),
  ]);

  const lenses = personas.map((p) => ({
    key: p.key,
    label: p.label,
    iconName: p.iconName,
  }));

  // Public contact address (also the Resend from/to domain mailbox)
  const email =
    process.env.CONTACT_TO_EMAIL?.trim() ||
    profile.email ||
    "moses@mosesedem.me";
  const phone = profile.phone ?? "+2349030465501";
  const phoneDisplay = normalizePhoneDisplay(phone);
  const phoneTel = phoneDisplay.replace(/\s/g, "");
  const phoneDigits = phone.replace(/\D/g, "");
  const whatsappHref = `https://api.whatsapp.com/send?phone=${phoneDigits}&type=phone_number&app_absent=0`;

  const channels = [
    {
      id: "email",
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
      external: false,
      hint: "Best for roles, decks, and long context",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: phoneDisplay,
      href: whatsappHref,
      icon: MessageCircle,
      external: true,
      hint: "Fast replies · Nigeria-friendly",
    },
    {
      id: "phone",
      label: "Phone",
      value: phoneDisplay,
      href: `tel:${phoneTel}`,
      icon: Phone,
      external: false,
      hint: "Call or text · please introduce yourself",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/mosesedem",
      href: profile.linkedinUrl ?? "https://linkedin.com/in/mosesedem",
      icon: Linkedin,
      external: true,
      hint: "Professional network",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/mosesedem",
      href: profile.githubUrl ?? "https://github.com/mosesedem",
      icon: Github,
      external: true,
      hint: "Code and open work",
    },
    {
      id: "location",
      label: "Location",
      value: profile.location ?? "Uyo, Akwa Ibom, Nigeria",
      href: null,
      icon: MapPin,
      external: false,
      hint: "Based in Uyo · remote-friendly",
    },
  ] as const;

  const snippet = `// contact.ts
export const moses = {
  email: "${email}",
  phone: "${phoneDisplay}",
  location: "${profile.location ?? "Uyo, NG"}",
  openTo: ["roles", "partnerships", "collabs", "real conversations"],
  responseTime: "a few days",
} as const;`;

  return (
    <div className="page-shell">
      <SiteHeader lenses={lenses} currentKey={lens} />
      <main className="page-main">
        {/* Hero */}
        <section className="section-block">
          <div className="section-inner !pb-10 sm:!pb-12">
            <p className="section-label">CONTACT</p>
            <h1 className="hero-title mt-3 max-w-2xl">Let&apos;s talk</h1>
            <p className="section-lead max-w-2xl sm:text-lg">
              Hiring, partnerships, collaboration, or a personal note — pick a
              channel or send a message. Based in{" "}
              {profile.location ?? "Uyo, Nigeria"}; happy to work remote.
            </p>
            <div className="cta-row mt-7">
              <a href={`mailto:${email}`} className="btn-primary">
                <Mail size={16} strokeWidth={1.75} />
                Email me
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle size={16} strokeWidth={1.75} />
                WhatsApp
              </a>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} className="btn-secondary">
                  <FileText size={16} strokeWidth={1.75} />
                  Resume
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* Channels + form */}
        <section className="section-block">
          <div className="section-inner">
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-2">
                <p className="section-label mb-4">Channels</p>
                <ul className="space-y-2">
                  {channels.map((ch) => {
                    const Icon = ch.icon;
                    const inner = (
                      <>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border">
                          <Icon size={18} strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                            {ch.label}
                          </p>
                          <p className="truncate text-sm font-medium text-foreground">
                            {ch.value}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {ch.hint}
                          </p>
                        </div>
                        {ch.href ? (
                          <ArrowRight
                            size={14}
                            strokeWidth={1.75}
                            className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        ) : null}
                      </>
                    );

                    const className =
                      "card-surface-interactive group flex w-full items-start gap-3 p-4 text-left";

                    if (ch.href) {
                      return (
                        <li key={ch.id}>
                          <a
                            href={ch.href}
                            target={ch.external ? "_blank" : undefined}
                            rel={
                              ch.external ? "noopener noreferrer" : undefined
                            }
                            className={className}
                          >
                            {inner}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={ch.id}>
                        <div className="card-surface flex items-start gap-3 p-4">
                          {inner}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 hidden lg:block">
                  <CodePane filename="contact.ts" code={snippet} animate />
                </div>
              </div>

              <div className="lg:col-span-3">
                <ContactForm
                  toEmail={email}
                  phone={phone}
                  defaultIntent={defaultIntent}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick intents */}
        <section className="section-block">
          <div className="section-inner">
            <p className="section-label mb-3">Common paths</p>
            <h2 className="section-title mb-2">What brings you here?</h2>
            <p className="section-lead mb-6">
              Jump straight into the form with the right intent pre-selected.
            </p>
            <div className="content-grid">
              {(
                [
                  {
                    intent: "hire" as const,
                    title: "Employers & recruiters",
                    body: "Backend roles, contracts, systems work. Resume ready.",
                    href: "/contact?intent=hire",
                  },
                  {
                    intent: "partner" as const,
                    title: "Investors & partners",
                    body: "Ventures, traction conversations, co-building.",
                    href: "/contact?intent=partner",
                  },
                  {
                    intent: "personal" as const,
                    title: "Personal / dating",
                    body: "You saw the romantic lens. Serious introductions only.",
                    href: "/contact?intent=personal",
                  },
                  {
                    intent: "collaborate" as const,
                    title: "Collaborate",
                    body: "Side projects, research, open source, talks.",
                    href: "/contact?intent=collaborate",
                  },
                ] as const
              ).map((item, i) => (
                <Link
                  key={item.intent}
                  href={item.href}
                  className="card-surface-interactive block p-4 sm:p-5"
                >
                  <span className="mb-2 block font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground sm:text-sm">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Response expectations */}
        <section className="section-block">
          <div className="section-inner">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Response time",
                  body: "Usually within a few days. Urgent? WhatsApp is faster.",
                },
                {
                  title: "Timezone",
                  body: "WAT (UTC+1). Async by default; calls by appointment.",
                },
                {
                  title: "What helps",
                  body: "Clear intent, context, and how you found me. No cold spam decks.",
                },
              ].map((item) => (
                <div key={item.title} className="card-surface p-4 sm:p-5">
                  <p className="section-label mb-2">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} lenses={lenses} currentKey={lens} />
    </div>
  );
}
