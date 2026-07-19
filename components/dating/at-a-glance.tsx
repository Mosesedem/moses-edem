"use client";

import { useState } from "react";
import { datingProfile } from "@/lib/dating-profile";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AtAGlance() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <p className="section-label mb-3">At a glance</p>
      <h2 className="section-title mb-2">The facts</h2>
      <p className="section-lead mb-6">
        The short answers before the long ones. Tap any row.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {datingProfile.facts.map((f) => {
          const Icon = resolveIcon(f.iconName);
          const isOpen = open === f.key;
          return (
            <li key={f.key}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : f.key)}
                className={cn(
                  "card-surface-interactive flex w-full items-start gap-3 p-4 text-left",
                  isOpen && "border-accent"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {f.key}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-medium text-foreground",
                      !isOpen && "truncate"
                    )}
                  >
                    {f.value}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
