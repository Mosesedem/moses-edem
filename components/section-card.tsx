import { resolveIcon } from "@/lib/icons";

type SectionCardProps = {
  title?: string | null;
  body?: string | null;
  iconName?: string | null;
  href?: string | null;
  index?: number;
  metric?: string | null;
  metaLine?: string | null;
};

export function SectionCard({
  title,
  body,
  iconName,
  href,
  index,
  metric,
  metaLine,
}: SectionCardProps) {
  const Icon = resolveIcon(iconName);
  const num =
    typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  const inner = (
    <>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {num ? (
            <span className="w-5 font-mono text-[11px] tabular-nums text-muted-foreground">
              {num}
            </span>
          ) : null}
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground">
            <Icon size={16} strokeWidth={1.75} />
          </div>
        </div>
        {metric ? (
          <span className="max-w-[45%] text-right font-mono text-[10px] leading-snug text-muted-foreground sm:text-xs sm:max-w-none">
            {metric}
          </span>
        ) : null}
      </div>
      {title ? (
        <h3 className="text-[0.9rem] font-medium leading-snug tracking-tight text-foreground sm:text-sm">
          {title}
        </h3>
      ) : null}
      {body ? (
        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground line-clamp-3 sm:text-sm sm:line-clamp-2">
          {body}
        </p>
      ) : null}
      {metaLine ? (
        <p className="mt-2.5 font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
          {metaLine}
        </p>
      ) : null}
    </>
  );

  const className =
    "card-surface-interactive block h-full p-4 sm:p-4";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}
