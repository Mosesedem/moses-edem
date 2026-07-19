"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
] as const;

type ThemeToggleProps = {
  /** Segmented control (default). Use "menu" for full-width list rows. */
  variant?: "segmented" | "menu";
};

export function ThemeToggle({ variant = "segmented" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return variant === "menu" ? (
      <div className="h-24 rounded-lg border border-border" aria-hidden />
    ) : (
      <div className="h-9 w-[7.5rem] rounded-md border border-border" aria-hidden />
    );
  }

  if (variant === "menu") {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        {OPTIONS.map(({ value, icon: Icon, label }) => {
          const active = theme === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={`flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left text-sm last:border-b-0 transition-colors ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span className="flex-1 font-medium">{label}</span>
              {active ? (
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-80">
                  Active
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border p-0.5">
      {OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          onClick={() => setTheme(value)}
          className={`rounded p-2 transition-colors ${
            theme === value
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Icon size={16} strokeWidth={1.75} />
        </button>
      ))}
    </div>
  );
}
