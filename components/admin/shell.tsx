"use client";

import {
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  Database,
  ExternalLink,
  FileJson,
  FolderKanban,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { logoutAction } from "@/lib/admin-actions";

export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  exact?: boolean;
};

type IconComp = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const ICONS: Record<string, IconComp> = {
  "/admin": LayoutDashboard,
  "/admin/personas": Briefcase,
  "/admin/blocks": Layers,
  "/admin/projects": FolderKanban,
  "/admin/blog": BookOpen,
  "/admin/profile": UserRound,
};

type AdminShellProps = {
  nav: AdminNavItem[];
  dbOn: boolean;
  children: ReactNode;
};

function isActive(pathname: string, item: AdminNavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavList({
  nav,
  pathname,
  onNavigate,
}: {
  nav: AdminNavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Admin sections">
      {nav.map((item) => {
        const active = isActive(pathname, item);
        const Icon = ICONS[item.href] ?? LayoutDashboard;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`group flex min-h-12 items-center gap-3 rounded-lg px-3 py-2.5 transition-colors sm:min-h-11 ${
              active
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-muted active:bg-muted"
            }`}
          >
            <Icon
              size={18}
              strokeWidth={1.75}
              className={`shrink-0 ${
                active
                  ? "opacity-100"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium leading-tight">
                {item.label}
              </span>
              <span
                className={`mt-0.5 block text-[11px] leading-snug ${
                  active
                    ? "text-accent-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {item.description}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function StorageBadge({ dbOn }: { dbOn: boolean }) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5"
      title={
        dbOn
          ? "Writes go to file CMS and Postgres"
          : "Writes go to file CMS only"
      }
    >
      {dbOn ? (
        <Database
          size={16}
          strokeWidth={1.75}
          className="mt-0.5 shrink-0 text-accent"
        />
      ) : (
        <FileJson
          size={16}
          strokeWidth={1.75}
          className="mt-0.5 shrink-0 text-muted-foreground"
        />
      )}
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Storage
        </p>
        <p className="mt-0.5 text-xs font-medium leading-snug text-foreground">
          {dbOn ? "File + Postgres" : "File only"}
        </p>
      </div>
    </div>
  );
}

function SidebarFooter({
  dbOn,
  onNavigate,
}: {
  dbOn: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="mt-auto space-y-3 border-t border-border pt-3">
      <StorageBadge dbOn={dbOn} />
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/"
          onClick={onNavigate}
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-foreground active:bg-muted sm:min-h-11"
        >
          <ExternalLink size={14} strokeWidth={1.75} />
          Site
        </Link>
        <form action={logoutAction} className="contents">
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-lg border border-border px-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-foreground active:bg-muted sm:min-h-11"
          >
            <LogOut size={14} strokeWidth={1.75} />
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminShell({ nav, dbOn, children }: AdminShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  const current =
    nav.find((item) => isActive(pathname, item)) ?? nav[0] ?? null;

  return (
    <div className="min-h-dvh bg-background text-foreground lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-background lg:flex xl:w-72">
        <div className="flex h-14 shrink-0 items-center border-b border-border px-4">
          <Link
            href="/admin"
            className="font-mono text-sm font-medium tracking-tight hover:text-accent"
          >
            moses · admin
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-3">
          <NavList nav={nav} pathname={pathname} />
          <SidebarFooter dbOn={dbOn} />
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header
          className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur lg:hidden"
          style={{ paddingTop: "var(--safe-top)" }}
        >
          <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-foreground active:bg-muted"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="admin-mobile-nav"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Admin
              </p>
              <p className="truncate text-sm font-medium leading-tight">
                {current?.label ?? "Dashboard"}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground active:bg-muted"
            >
              Site
            </Link>
          </div>
        </header>

        {/* Desktop context bar */}
        <div className="hidden h-14 shrink-0 items-center justify-between border-b border-border px-6 lg:flex xl:px-8">
          <p className="truncate text-sm text-muted-foreground">
            {current?.description ?? "Content management"}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {dbOn ? "file + postgres" : "file only"}
          </p>
        </div>

        <main className="flex-1 px-3 py-5 sm:px-5 sm:py-7 lg:px-6 lg:py-8 xl:px-8">
          <div className="mx-auto w-full max-w-4xl pb-[max(1.25rem,var(--safe-bottom))]">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside
            id="admin-mobile-nav"
            className="absolute inset-y-0 left-0 flex w-[min(20rem,90vw)] flex-col border-r border-border bg-background shadow-2xl"
            style={{ paddingTop: "var(--safe-top)" }}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3">
              <p className="font-mono text-sm font-medium">moses · admin</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground active:bg-muted"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-3 pb-[max(1rem,var(--safe-bottom))]">
              <NavList
                nav={nav}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
              <SidebarFooter dbOn={dbOn} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
