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
            <span className="font-mono text-xs text-muted-foreground">{num}</span>
          ) : null}
          <div className="flex h-8 w-8 items-center justify-center rounded border border-border text-foreground">
            <Icon size={16} strokeWidth={1.75} />
          </div>
        </div>
        {metric ? (
          <span className="font-mono text-xs text-muted-foreground">{metric}</span>
        ) : null}
      </div>
      {title ? (
        <h3 className="text-sm font-medium tracking-tight text-foreground">
          {title}
        </h3>
      ) : null}
      {body ? (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {body}
        </p>
      ) : null}
      {metaLine ? (
        <p className="mt-2 font-mono text-xs text-muted-foreground">{metaLine}</p>
      ) : null}
    </>
  );

  const className =
    "block rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent";

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
