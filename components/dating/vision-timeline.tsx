"use client";

import { useState } from "react";
import { datingProfile } from "@/lib/dating-profile";
import { cn } from "@/lib/utils";

export function VisionTimeline() {
  const steps = datingProfile.vision;
  const [active, setActive] = useState(steps.length - 2); // default near "family man"

  const current = steps[active] ?? steps[0];

  return (
    <div>
      <p className="section-label mb-3">The vision</p>
      <h2 className="section-title mb-2">Where I&apos;m headed</h2>
      <p className="section-lead mb-6">
        From Uyo to family and legacy — tap a milestone.
      </p>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {steps.map((step, i) => (
          <button
            key={`${step.date}-${step.title}`}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors",
              active === i
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
            )}
          >
            {step.date}
          </button>
        ))}
      </div>

      <div className="card-surface p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-[11px] text-muted-foreground">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(steps.length).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[11px] text-accent">
            {current.date}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-medium tracking-tight text-foreground">
          {current.title}
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {current.description}
        </p>
      </div>
    </div>
  );
}
