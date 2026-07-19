import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveIcon } from "@/lib/icons";

type PersonaCardProps = {
  href: string;
  label: string;
  tagline?: string | null;
  iconName: string;
  index?: number;
};

export function PersonaCard({
  href,
  label,
  tagline,
  iconName,
  index = 0,
}: PersonaCardProps) {
  const Icon = resolveIcon(iconName);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={href}
      className="card-surface-interactive group flex min-h-[7.5rem] items-stretch gap-4 p-4 sm:min-h-0 sm:flex-col sm:gap-5 sm:p-5"
    >
      <div className="flex shrink-0 flex-col items-start justify-between sm:w-full sm:flex-row sm:items-start">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground transition-colors group-hover:border-accent group-hover:text-accent sm:h-10 sm:w-10 sm:rounded-md">
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <span className="mt-auto font-mono text-[11px] text-muted-foreground sm:mt-0">
          {num}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-[0.95rem] font-medium leading-snug tracking-tight text-foreground sm:text-base">
            {label}
          </h2>
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent sm:hidden"
          />
        </div>
        {tagline ? (
          <p className="text-[0.8125rem] leading-relaxed text-muted-foreground line-clamp-2 sm:text-sm">
            {tagline}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
