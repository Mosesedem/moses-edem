import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsSnapshot } from "@/lib/queries";

export default async function AdminHomePage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const snap = await getCmsSnapshot();

  const cards = [
    {
      href: "/admin/personas",
      label: "Personas",
      count: snap.personas.length,
      desc: "Lens labels, heroes, CTAs",
    },
    {
      href: "/admin/blocks",
      label: "Content blocks",
      count: snap.blocks.length,
      desc: "Stats, experience, skills",
    },
    {
      href: "/admin/projects",
      label: "Projects",
      count: (snap.projects ?? []).length,
      desc: "Portfolio + per-lens sheet copy",
    },
    {
      href: "/admin/blog",
      label: "Blog posts",
      count: snap.blogPosts.length,
      desc: "Drafts and published writing",
    },
    {
      href: "/admin/profile",
      label: "Profile",
      count: 1,
      desc: "Name, location, social links",
    },
  ];

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        DASHBOARD
      </p>
      <h1 className="mt-2 text-2xl font-medium">Content management</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Updates persist to <code className="font-mono text-xs">.data/cms.json</code>.
        Set <code className="font-mono text-xs">ADMIN_PASSWORD</code> in env for
        production.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-border p-5 transition-colors hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {c.count}
              </span>
            </div>
            <h2 className="mt-2 text-base font-medium">{c.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
