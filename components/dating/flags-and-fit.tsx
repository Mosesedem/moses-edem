"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { datingProfile } from "@/lib/dating-profile";
import { cn } from "@/lib/utils";

export function FlagsAndFit() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div>
        <p className="section-label mb-3">Substance over surface</p>
        <h2 className="section-title mb-2">
          Win my heart with real substance
        </h2>
        <p className="section-lead mb-6">
          Tap the green flags that sound like you — a quick self-check, not a
          scoreboard.
        </p>
        <ul className="space-y-2">
          {datingProfile.greenFlags.map((flag, i) => {
            const on = checked[i];
            return (
              <li key={flag}>
                <button
                  type="button"
                  onClick={() =>
                    setChecked((prev) => ({ ...prev, [i]: !prev[i] }))
                  }
                  className={cn(
                    "flex w-full items-start gap-3 rounded-[var(--radius)] border px-3.5 py-3 text-left text-sm transition-colors",
                    on
                      ? "border-accent bg-accent/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                      on
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border"
                    )}
                  >
                    {on ? <Check size={12} strokeWidth={2.5} /> : null}
                  </span>
                  <span className="leading-snug">{flag}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {checkedCount > 0 ? (
          <p className="mt-4 font-mono text-[11px] text-muted-foreground">
            {checkedCount} of {datingProfile.greenFlags.length} selected — if
            most of these are you, we should talk.
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="card-surface p-5 sm:p-6">
          <p className="section-label mb-4">Non-negotiables</p>
          <div className="flex flex-wrap gap-2">
            {datingProfile.dealbreakers.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive"
              >
                <X size={12} strokeWidth={2} />
                {d}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Clarity early saves everyone time. I&apos;d rather be direct than
            polite and unclear.
          </p>
        </div>

        <div className="card-surface p-5 sm:p-6">
          <p className="section-label mb-3">Perfect first date</p>
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground italic">
            &ldquo;{datingProfile.firstDate}&rdquo;
          </p>
        </div>

        <div className="card-surface p-5 sm:p-6">
          <p className="section-label mb-3">Perfect weekend</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {datingProfile.perfectWeekend}
          </p>
        </div>
      </div>
    </div>
  );
}
