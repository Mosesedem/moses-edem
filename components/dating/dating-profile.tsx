import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Ruler,
} from "lucide-react";
import { datingProfile, getWhatsAppUrl } from "@/lib/dating-profile";
import { AiChat } from "@/components/ai-chat";
import { CodePane } from "@/components/code-pane";
import { TellMeAbout } from "@/components/dating/tell-me-about";
import { AtAGlance } from "@/components/dating/at-a-glance";
import { InterestExplorer } from "@/components/dating/interest-explorer";
import { RelationshipDna } from "@/components/dating/relationship-dna";
import { FlagsAndFit } from "@/components/dating/flags-and-fit";
import { VisionTimeline } from "@/components/dating/vision-timeline";
import { CompatibilityQuiz } from "@/components/dating/compatibility-quiz";
import { DatingVibeCard } from "@/components/dating/vibe-card";

type DatingProfileViewProps = {
  email?: string | null;
  phone?: string | null;
};

export function DatingProfileView({ email }: DatingProfileViewProps) {
  const d = datingProfile;
  const wa = getWhatsAppUrl(d.whatsappDefaultText);

  const profileSnippet = `// profile.ts
export const moses = {
  name: "${d.fullName}",
  age: ${d.age},
  height: "${d.height}",
  location: "${d.location}",
  lookingFor: "wife",
  intent: "marriage",
  faith: "foundational",
  humour: "dry / dark",
  available: true,
} as const;`;

  return (
    <>
      {/* Hero — dating profile header */}
      <section className="section-block">
        <div className="section-inner !pb-10 sm:!pb-14">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border">
              <Heart size={20} strokeWidth={1.75} />
            </div>
            <p className="section-label min-w-0 truncate">Dating profile</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-foreground">
                  {d.intent}
                </span>
              </div>

              <h1 className="hero-title max-w-3xl">{d.fullName}</h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {d.age} years old · {d.role} · {d.height}
              </p>

              <p className="section-lead max-w-2xl sm:text-lg">{d.tagline}</p>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                {d.intentBody}
              </p>

              <div className="meta-row mt-6">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={1.75} className="shrink-0" />
                  <span className="text-[0.875rem]">{d.location}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Ruler size={14} strokeWidth={1.75} className="shrink-0" />
                  <span className="text-[0.875rem]">{d.height}</span>
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Serious only · Marriage-minded
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {d.chips.map((chip, i) => (
                  <span
                    key={chip}
                    className={
                      i === 0
                        ? "rounded-full border border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background"
                        : "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="cta-row mt-7">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle size={16} strokeWidth={1.75} />
                  Message on WhatsApp
                </a>
                <a href="#compatibility" className="btn-secondary">
                  Take compatibility quiz
                  <ArrowRight size={16} strokeWidth={1.75} />
                </a>
                <Link href="/contact?intent=personal" className="btn-secondary">
                  <Mail size={16} strokeWidth={1.75} />
                  Contact page
                </Link>
                <Link href="#ai-chat" className="btn-secondary">
                  Ask AI Moses
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs lg:mx-0">
              <div className="card-surface relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/moses.jpg"
                  alt={`${d.fullName} portrait`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 320px, 280px"
                  priority
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {d.stats.map((s) => (
                  <div key={s.title} className="stat-cell !p-2.5 text-center">
                    <p className="stat-value !text-sm">{s.title}</p>
                    <p className="stat-label">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section-block">
        <div className="section-inner !py-6">
          <p className="section-label mb-4">Quick read</p>
          <div className="stat-grid sm:grid-cols-3">
            {d.stats.map((s) => (
              <div key={s.body} className="stat-cell">
                <p className="stat-value">{s.title}</p>
                <p className="stat-label">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tell me about yourself */}
      <section id="about" className="section-block">
        <div className="section-inner">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              <TellMeAbout />
            </div>
            <div className="lg:col-span-2">
              <CodePane filename="profile.ts" code={profileSnippet} animate />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {d.heroIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="section-block">
        <div className="section-inner">
          <AtAGlance />
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="section-block">
        <div className="section-inner">
          <InterestExplorer />
        </div>
      </section>

      {/* Relationship DNA */}
      <section id="dna" className="section-block">
        <div className="section-inner">
          <RelationshipDna />
        </div>
      </section>

      {/* Green flags / dealbreakers */}
      <section id="fit" className="section-block">
        <div className="section-inner">
          <FlagsAndFit />
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="section-block">
        <div className="section-inner">
          <VisionTimeline />
        </div>
      </section>

      {/* What I'm building (short, human) */}
      <section className="section-block">
        <div className="section-inner">
          <p className="section-label mb-3">What I&apos;m building</p>
          <h2 className="section-title mb-2">Work that says who I am</h2>
          <p className="section-lead mb-6">
            Ambition is part of the package — not a substitute for presence.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {d.ventures.map((v, i) => (
              <a
                key={v.name}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface-interactive block p-5 sm:p-6"
              >
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {v.type}
                </span>
                <h3 className="text-lg font-medium text-foreground">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-block">
        <div className="section-inner">
          <blockquote className="mx-auto max-w-2xl text-center">
            <p className="text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl">
              &ldquo;{d.quote}&rdquo;
            </p>
            <cite className="mt-5 block font-mono text-[11px] not-italic uppercase tracking-[0.14em] text-muted-foreground">
              — {d.fullName}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Interactive: quiz + vibe */}
      <section id="compatibility" className="section-block">
        <div className="section-inner">
          <p className="section-label mb-3">Interactive</p>
          <h2 className="section-title mb-2">Play, then talk</h2>
          <p className="section-lead mb-8 max-w-2xl">
            Take the compatibility quiz, browse conversation starters, or open
            the FAQs. Then say hello like a human.
          </p>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <CompatibilityQuiz />
            <DatingVibeCard />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="section-block">
        <div className="section-inner">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label mb-3">The final question</p>
            <h2 className="section-title mb-4">
              Are you the one worth building with?
            </h2>
            <p className="section-lead mx-auto mb-6">
              If you made it this far and something resonated — loyalty, faith,
              family, humour, ambition — I&apos;d rather hear from you than
              wonder.
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {d.ctaChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="cta-row justify-center">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={16} strokeWidth={1.75} />
                Send a signal
              </a>
              <a href="#compatibility" className="btn-secondary">
                Back to quiz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat */}
      <section id="ai-chat" className="section-block">
        <div className="section-inner">
          <p className="section-label">AI CHAT</p>
          <h2 className="mt-2 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            Talk to AI Moses
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Curious but shy? Ask the AI version anything you&apos;d ask on a
            first coffee — values, cooking, boxing, what marriage means to me.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-5 lg:gap-6">
            <div className="lg:col-span-3">
              <AiChat persona="romantic" />
            </div>
            <div className="hidden lg:col-span-2 lg:block">
              <CodePane
                filename="chat-agent.ts"
                code={`// persona-aware agent
const lens = "romantic";

export async function askMoses(q: string) {
  return chat({ persona: lens, message: q });
}`}
                animate
                typingMs={12}
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Warm, sarcastic, honest — no cringe pickup lines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
