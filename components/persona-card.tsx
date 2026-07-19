import Link from "next/link";
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
      className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{num}</span>
      </div>
      <div className="space-y-1.5">
        <h2 className="text-base font-medium tracking-tight text-foreground">
          {label}
        </h2>
        {tagline ? (
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {tagline}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
