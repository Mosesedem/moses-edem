"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LensSwitcher, type LensOption } from "@/components/lens-switcher";
import { resolveIcon } from "@/lib/icons";

type SiteHeaderProps = {
  showBack?: boolean;
  personaLabel?: string | null;
  lenses?: LensOption[];
  currentKey?: string;
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({
  showBack = false,
  personaLabel,
  lenses,
  currentKey,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const activeLens =
    lenses?.find((l) => l.key === currentKey) ??
    lenses?.find(
      (l) => pathname === `/${l.key}` || pathname?.startsWith(`/${l.key}/`)
    );
  const ActiveLensIcon = activeLens
    ? resolveIcon(activeLens.iconName)
    : null;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="page-container flex h-14 items-center justify-between gap-3">
          <Link
            href="/"
            className="min-w-0 shrink font-mono text-[13px] font-medium tracking-tight text-foreground transition-colors hover:text-accent sm:text-sm"
          >
            <span className="sm:hidden">moses</span>
            <span className="hidden sm:inline">mosesedem.me</span>
            {showBack && personaLabel ? (
              <span className="hidden text-muted-foreground md:inline">
                {" "}
                / {personaLabel}
              </span>
            ) : null}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {NAV.filter((n) => n.href !== "/").map((item) => {
              const isActive =
                pathname === item.href ||
                pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-accent ${
                    isActive ? "text-foreground" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {lenses && lenses.length > 0 ? (
            <div className="hidden items-center gap-2 md:flex">
              <LensSwitcher
                lenses={lenses}
                currentKey={currentKey}
                variant="compact"
              />
            </div>
          ) : (
            <div className="hidden md:block" aria-hidden />
          )}

          <div className="flex items-center gap-2 md:hidden">
            {activeLens && ActiveLensIcon ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1.5 text-[11px] text-muted-foreground"
                title={activeLens.label}
              >
                <ActiveLensIcon size={13} strokeWidth={1.75} />
                <span className="font-mono">{activeLens.key}</span>
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn-icon !h-10 !w-10"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="sheet-bottom absolute inset-x-0 bottom-0 flex max-h-[min(92dvh,40rem)] flex-col rounded-t-2xl border border-border bg-background shadow-2xl">
            <div className="relative flex shrink-0 items-center justify-between px-4 pb-3 pt-5">
              <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-border" />
              <p className="section-label pt-1">Menu</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-icon !h-10 !w-10"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-4 pb-6">
              <p className="section-label mb-2">Navigate</p>
              <div className="mb-6 overflow-hidden rounded-[var(--radius)] border border-border">
                {NAV.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href ||
                        pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center border-b border-border px-4 py-3.5 text-sm font-medium last:border-b-0 ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-foreground active:bg-muted/60"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {lenses && lenses.length > 0 ? (
                <>
                  <p className="section-label mb-2">Audience lens</p>
                  <div className="mb-2">
                    <LensSwitcher
                      lenses={lenses}
                      currentKey={currentKey}
                      variant="menu"
                      onSelect={() => setOpen(false)}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
