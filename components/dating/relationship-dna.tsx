"use client";

import { useState } from "react";
import { datingProfile } from "@/lib/dating-profile";
import { cn } from "@/lib/utils";

export function RelationshipDna() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <div>
      <p className="section-label mb-3">Relationship DNA</p>
      <h2 className="section-title mb-2">In a relationship, I am...</h2>
      <p className="section-lead mb-6">
        Tap a card to flip — love language, communication, attachment, and the
        green flag you should know.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {datingProfile.relationshipDna.map((card, i) => {
          const isFlipped = flipped[i];
          return (
            <button
              key={card.label}
              type="button"
              onClick={() =>
                setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
              }
              className={cn(
                "card-surface-interactive min-h-[160px] p-5 text-left transition-colors sm:p-6",
                card.accent && !isFlipped && "border-accent/40 bg-muted/30",
                isFlipped && "border-accent"
              )}
            >
              <p className="section-label mb-3">{card.label}</p>
              {!isFlipped ? (
                <>
                  <p className="text-xl font-medium tracking-tight text-foreground">
                    {card.highlight}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Tap to read more
                  </p>
                </>
              ) : (
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {card.highlight}.{" "}
                  </span>
                  {card.body}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
