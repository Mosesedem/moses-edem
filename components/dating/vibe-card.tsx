"use client";

import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import {
  datingProfile,
  getWhatsAppUrl,
  type ConversationStarter,
} from "@/lib/dating-profile";
import { cn } from "@/lib/utils";

type Tab = "conv" | "faq";
type Category = "all" | ConversationStarter["category"];

const CATS: Category[] = ["all", "icebreaker", "deep", "values", "fun"];

export function DatingVibeCard() {
  const [tab, setTab] = useState<Tab>("conv");
  const [convCat, setConvCat] = useState<Category>("all");
  const [convIdx, setConvIdx] = useState(0);
  const [faqIdx, setFaqIdx] = useState(0);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [fading, setFading] = useState(false);

  const starters = datingProfile.conversationStarters;
  const faqs = datingProfile.faqs;

  const filtered =
    convCat === "all"
      ? [...starters]
      : starters.filter((s) => s.category === convCat);
  const convItem = filtered[convIdx % Math.max(filtered.length, 1)];
  const faqItem = faqs[faqIdx % faqs.length];

  const convTouchX = useRef(0);
  const faqTouchX = useRef(0);

  function fadeNav(fn: () => void) {
    setFading(true);
    window.setTimeout(() => {
      fn();
      setFading(false);
    }, 150);
  }

  function convNav(dir: number) {
    if (filtered.length === 0) return;
    fadeNav(() =>
      setConvIdx((prev) => (prev + dir + filtered.length) % filtered.length)
    );
  }

  function faqNav(dir: number) {
    fadeNav(() => {
      setFaqIdx((prev) => (prev + dir + faqs.length) % faqs.length);
      setAnswerOpen(false);
    });
  }

  const dmHref =
    tab === "conv" && convItem
      ? getWhatsAppUrl(
          `Hey! I saw your conversation starter: "${convItem.question}" — I'd love to chat about this.`
        )
      : getWhatsAppUrl(
          `Hey! I saw your FAQ: "${faqItem.question}" — I'd love to discuss this with you.`
        );

  return (
    <div className="card-surface p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
          {tab === "conv" ? (
            <MessageCircle size={16} strokeWidth={1.75} />
          ) : (
            <HelpCircle size={16} strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            {tab === "conv" ? "Conversation starters" : "Quick answers"}
          </p>
          <p className="text-xs text-muted-foreground">
            {tab === "conv"
              ? "Swipe or tap to explore"
              : "Questions people actually ask"}
          </p>
        </div>
      </div>

      <div className="mb-4 flex border-b border-border">
        {(
          [
            { key: "conv" as const, label: "Starters" },
            { key: "faq" as const, label: "FAQs" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "flex-1 pb-2.5 text-center text-xs font-medium transition-colors",
              tab === key
                ? "border-b-2 border-foreground text-foreground"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "conv" ? (
        <div>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setConvCat(c);
                  setConvIdx(0);
                }}
                className={cn(
                  "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors",
                  convCat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div
            className={cn(
              "flex min-h-[140px] flex-col justify-center py-4 transition-opacity duration-150",
              fading ? "opacity-0" : "opacity-100"
            )}
            onTouchStart={(e) => {
              convTouchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - convTouchX.current;
              if (Math.abs(dx) > 40) convNav(dx < 0 ? 1 : -1);
            }}
          >
            {convItem ? (
              <>
                <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {convItem.category}
                </span>
                <p className="text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl">
                  {convItem.question}
                </p>
              </>
            ) : null}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Dots total={filtered.length} active={convIdx % Math.max(filtered.length, 1)} />
            <div className="flex gap-1.5">
              <NavBtn onClick={() => convNav(-1)} label="Previous starter">
                <ChevronLeft size={16} strokeWidth={1.75} />
              </NavBtn>
              <NavBtn onClick={() => convNav(1)} label="Next starter">
                <ChevronRight size={16} strokeWidth={1.75} />
              </NavBtn>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={cn(
              "flex min-h-[140px] flex-col justify-center py-4 transition-opacity duration-150",
              fading ? "opacity-0" : "opacity-100"
            )}
            onTouchStart={(e) => {
              faqTouchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - faqTouchX.current;
              if (Math.abs(dx) > 40) faqNav(dx < 0 ? 1 : -1);
            }}
          >
            <p className="text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl">
              {faqItem.question}
            </p>
            {answerOpen ? (
              <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                {faqItem.answer}
              </p>
            ) : null}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Dots total={faqs.length} active={faqIdx} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAnswerOpen((v) => !v)}
                className="text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                {answerOpen ? "Hide answer" : "Show answer"}
              </button>
              <div className="flex gap-1.5">
                <NavBtn onClick={() => faqNav(-1)} label="Previous FAQ">
                  <ChevronLeft size={16} strokeWidth={1.75} />
                </NavBtn>
                <NavBtn onClick={() => faqNav(1)} label="Next FAQ">
                  <ChevronRight size={16} strokeWidth={1.75} />
                </NavBtn>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 h-px bg-border" />

      <a
        href={dmHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full"
      >
        <MessageCircle size={16} strokeWidth={1.75} />
        {tab === "conv" ? "Discuss this with me" : "Ask me about this"}
      </a>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
        {tab === "conv"
          ? "Don't fire these off like a job interview — weave them in naturally."
          : "Tap show answer, or message me if you want the long version."}
      </p>
    </div>
  );
}

function Dots({ total, active }: { total: number; active: number }) {
  const max = Math.min(total, 7);
  if (total <= 0) return <div />;
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 rounded-full transition-all",
            i === active % max
              ? "w-4 bg-foreground"
              : "w-1 bg-border"
          )}
        />
      ))}
    </div>
  );
}

function NavBtn({
  onClick,
  children,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="btn-icon h-9 w-9"
    >
      {children}
    </button>
  );
}
