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
  /** pills = footer/desktop wrap; menu = full-width stacked rows; compact = header desktop icons */
  variant?: "pills" | "compact" | "menu";
  onSelect?: () => void;
};

export function LensSwitcher({
  lenses,
  currentKey,
  variant = "pills",
  onSelect,
}: LensSwitcherProps) {
  const pathname = usePathname();
  const active =
    currentKey ??
    lenses.find(
      (l) => pathname === `/${l.key}` || pathname?.startsWith(`/${l.key}/`)
    )?.key;

  if (variant === "menu") {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        {lenses.map((lens) => {
          const Icon = resolveIcon(lens.iconName);
          const isActive = active === lens.key;
          return (
            <Link
              key={lens.key}
              href={`/${lens.key}`}
              onClick={onSelect}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0 transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} className="shrink-0" />
              <span className="flex-1 text-sm font-medium leading-tight">
                {lens.label}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  isActive ? "opacity-80" : "text-muted-foreground"
                }`}
              >
                {lens.key}
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-0.5 rounded-md border border-border p-0.5">
        {lenses.map((lens) => {
          const Icon = resolveIcon(lens.iconName);
          const isActive = active === lens.key;
          return (
            <Link
              key={lens.key}
              href={`/${lens.key}`}
              onClick={onSelect}
              title={lens.label}
              aria-label={lens.label}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center justify-center rounded p-2 transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
            </Link>
          );
        })}
      </div>
    );
  }

  // pills — footer: full labels, scrollable row on narrow screens
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
      {lenses.map((lens) => {
        const Icon = resolveIcon(lens.iconName);
        const isActive = active === lens.key;
        return (
          <Link
            key={lens.key}
            href={`/${lens.key}`}
            onClick={onSelect}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
            }`}
          >
            <Icon size={16} strokeWidth={1.75} className="shrink-0" />
            <span className="whitespace-nowrap">{lens.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
