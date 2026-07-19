"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
};

/**
 * Shared UI for route-level error.tsx boundaries.
 * Client component — required by Next.js error boundaries.
 */
export function ErrorPage({
  error,
  reset,
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this page. You can try again, or head home.",
  homeHref = "/",
  homeLabel = "Back home",
}: ErrorPageProps) {
  return (
    <div className="page-shell">
      <main className="page-main flex flex-1 items-center justify-center px-[var(--page-px)] py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-border">
            <AlertTriangle size={22} strokeWidth={1.75} />
          </div>
          <p className="section-label mb-3">Error</p>
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          {error.digest ? (
            <p className="mt-4 font-mono text-[11px] text-muted-foreground">
              Ref: {error.digest}
            </p>
          ) : null}
          <div className="cta-row mt-8 justify-center">
            <button type="button" onClick={reset} className="btn-primary">
              <RefreshCw size={16} strokeWidth={1.75} />
              Try again
            </button>
            <Link href={homeHref} className="btn-secondary">
              <Home size={16} strokeWidth={1.75} />
              {homeLabel}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
