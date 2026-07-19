import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LensSwitcher, type LensOption } from "@/components/lens-switcher";

type SiteHeaderProps = {
  showBack?: boolean;
  personaLabel?: string | null;
  lenses?: LensOption[];
  currentKey?: string;
};

export function SiteHeader({
  showBack = false,
  personaLabel,
  lenses,
  currentKey,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="shrink-0 font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-accent"
          >
            mosesedem.me
          </Link>
          {showBack && personaLabel ? (
            <>
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                /
              </span>
              <span className="hidden font-mono text-xs uppercase tracking-wider text-muted-foreground sm:inline">
                {personaLabel}
              </span>
            </>
          ) : null}
          <nav className="hidden items-center gap-3 text-sm text-muted-foreground md:flex">
            <Link
              href="/projects"
              className="transition-colors hover:text-accent"
            >
              Projects
            </Link>
            <Link href="/blog" className="transition-colors hover:text-accent">
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {lenses && lenses.length > 0 ? (
            <LensSwitcher
              lenses={lenses}
              currentKey={currentKey}
              variant="compact"
            />
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
