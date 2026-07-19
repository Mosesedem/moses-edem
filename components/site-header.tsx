import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

type SiteHeaderProps = {
  showBack?: boolean;
  personaLabel?: string | null;
};

export function SiteHeader({ showBack = false, personaLabel }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-accent"
          >
            mosesedem.me
          </Link>
          {showBack && (
            <>
              <span className="font-mono text-xs text-muted-foreground">/</span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {personaLabel ?? "profile"}
              </span>
            </>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
