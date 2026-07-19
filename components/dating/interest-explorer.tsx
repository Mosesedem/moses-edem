"use client";

import { useState } from "react";
import { datingProfile } from "@/lib/dating-profile";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function InterestExplorer() {
  const [open, setOpen] = useState<string | null>(
    datingProfile.interests[0]?.title ?? null
  );

  return (
    <div>
      <p className="section-label mb-3">Interests</p>
      <h2 className="section-title mb-2">What I actually care about</h2>
      <p className="section-lead mb-6">
        Tap a card — hobbies, reset buttons, and the things that make me me.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {datingProfile.interests.map((item) => {
          const Icon = resolveIcon(item.iconName);
          const isOpen = open === item.title;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setOpen(isOpen ? null : item.title)}
              className={cn(
                "card-surface-interactive flex flex-col p-4 text-left sm:p-5",
                isOpen && "border-accent"
              )}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
                </h3>
              </div>
              <p
                className={cn(
                  "text-[0.8125rem] leading-relaxed text-muted-foreground transition-all sm:text-sm",
                  isOpen ? "line-clamp-none" : "line-clamp-2"
                )}
              >
                {item.description}
              </p>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {isOpen ? "Tap to collapse" : "Tap to expand"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
