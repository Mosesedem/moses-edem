"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveIcon } from "@/lib/icons";

export type LensOption = {
  key: string;
  label: string;
  iconName: string;
};

type LensSwitcherProps = {
  lenses: LensOption[];
  currentKey?: string;
  variant?: "pills" | "compact";
};

export function LensSwitcher({
  lenses,
  currentKey,
  variant = "pills",
}: LensSwitcherProps) {
  const pathname = usePathname();
  const active =
    currentKey ??
    lenses.find((l) => pathname === `/${l.key}` || pathname?.startsWith(`/${l.key}/`))
      ?.key;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-1 rounded-md border border-border p-1">
        {lenses.map((lens) => {
          const Icon = resolveIcon(lens.iconName);
          const isActive = active === lens.key;
          return (
            <Link
              key={lens.key}
              href={`/${lens.key}`}
              title={lens.label}
              aria-label={lens.label}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-xs transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={14} strokeWidth={1.75} />
              <span className="hidden sm:inline font-mono">
                {lens.key}
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {lenses.map((lens) => {
        const Icon = resolveIcon(lens.iconName);
        const isActive = active === lens.key;
        return (
          <Link
            key={lens.key}
            href={`/${lens.key}`}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
              isActive
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
            }`}
          >
            <Icon size={16} strokeWidth={1.75} />
            <span>{lens.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
