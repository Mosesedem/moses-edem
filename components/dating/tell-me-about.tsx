"use client";

import { useState } from "react";
import { datingProfile } from "@/lib/dating-profile";
import { cn } from "@/lib/utils";

export function TellMeAbout() {
  const chapters = datingProfile.aboutChapters;
  const [active, setActive] = useState(chapters[0]?.id ?? "who");
  const current = chapters.find((c) => c.id === active) ?? chapters[0];

  return (
    <div>
      <p className="section-label mb-3">Tell me about yourself</p>
      <h2 className="section-title mb-2">The full answer</h2>
      <p className="section-lead mb-6 max-w-2xl">
        Everything people mean when they say &quot;so, tell me about
        yourself&quot; — without the awkward first-date scramble.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div
          className="flex gap-2 overflow-x-auto pb-1 sm:w-48 sm:shrink-0 sm:flex-col sm:overflow-visible sm:pb-0"
          role="tablist"
          aria-label="About chapters"
        >
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              type="button"
              role="tab"
              aria-selected={active === ch.id}
              onClick={() => setActive(ch.id)}
              className={cn(
                "shrink-0 rounded-[var(--radius)] border px-3 py-2.5 text-left transition-colors sm:w-full",
                active === ch.id
                  ? "border-accent bg-accent/5 text-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              )}
            >
              <span className="mb-0.5 block font-mono text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block text-sm font-medium leading-snug">
                {ch.title}
              </span>
            </button>
          ))}
        </div>

        <div
          className="card-surface min-h-[200px] flex-1 p-5 sm:p-6"
          role="tabpanel"
        >
          {current ? (
            <>
              <h3 className="mb-3 text-lg font-medium tracking-tight text-foreground">
                {current.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                {current.body}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
