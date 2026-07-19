import Link from "next/link";
import { redirect } from "next/navigation";
import {
  reseedContentAction,
  syncDatabaseAction,
} from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { getCmsSnapshot } from "@/lib/queries";
import {
  AdminFlash,
  AdminPageHeader,
} from "@/components/admin/form-controls";
import { PendingActionButton } from "@/components/admin/submit-button";

type Props = {
  searchParams: Promise<{
    synced?: string;
    seeded?: string;
    error?: string;
  }>;
};

export default async function AdminHomePage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const sp = await searchParams;
  const snap = await getCmsSnapshot();
  const dbOn = isDatabaseConfigured();

  const cards = [
    {
      href: "/admin/personas",
      label: "Personas",
      count: snap.personas.length,
      desc: "Audience lenses: labels, heroes, CTAs, icons",
    },
    {
      href: "/admin/blocks",
      label: "Content blocks",
      count: snap.blocks.length,
      desc: "Stats, about text, timeline, links per persona",
    },
    {
      href: "/admin/projects",
      label: "Projects",
      count: (snap.projects ?? []).length,
      desc: "Portfolio cards and per-lens detail copy",
    },
    {
      href: "/admin/blog",
      label: "Blog posts",
      count: snap.blogPosts.length,
      desc: "Drafts and published articles",
    },
    {
      href: "/admin/profile",
      label: "Profile",
      count: 1,
      desc: "Name, location, email, social links, resume",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        kicker="Dashboard"
        title="Content management"
        description="Everything on the public site (personas, projects, blog, profile) is edited here. Saves update the CMS store and, when configured, PostgreSQL."
      />

      <AdminFlash
        message={
          sp.synced
            ? "Synced current content to PostgreSQL."
            : sp.seeded
              ? "Loaded built-in seed into CMS (and database when connected)."
              : null
        }
        error={sp.error ? decodeURIComponent(sp.error) : null}
      />

      <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        <p>
          <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">
            Storage
          </span>
          <span className="mx-2 text-border">·</span>
          {dbOn ? (
            <>
              <strong className="font-medium text-foreground">
                File CMS + PostgreSQL
              </strong>
              . Edits write both. Public pages prefer Postgres, with seed/file
              fallback if the database is unreachable.
            </>
          ) : (
            <>
              <strong className="font-medium text-foreground">
                File CMS only
              </strong>
              . Set <code className="font-mono text-xs">DATABASE_URL</code> to a
              Postgres URL to dual-write and serve from the database.
            </>
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {cards.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-border p-4 transition-colors hover:border-accent active:bg-muted/40 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {c.count}
              </span>
            </div>
            <h2 className="mt-2 text-base font-medium leading-snug">{c.label}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Maintenance
        </p>
        <h2 className="mt-2 text-lg font-medium">Database tools</h2>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Use these when setting up a new environment or recovering content.
          Reseed replaces all CMS content with the built-in defaults.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <form action={syncDatabaseAction}>
            <PendingActionButton disabled={!dbOn}>
              Sync CMS → Postgres
            </PendingActionButton>
          </form>
          <form action={reseedContentAction}>
            <PendingActionButton variant="muted">
              Load built-in seed
            </PendingActionButton>
          </form>
        </div>
      </section>
    </div>
  );
}
