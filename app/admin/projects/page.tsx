import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteProjectAction } from "@/lib/admin-actions";
import { getAllProjectsAdmin } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminProjectsPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved, deleted } = await searchParams;
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            PROJECTS
          </p>
          <h1 className="mt-2 text-2xl font-medium">Portfolio projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Canonical project records with per-lens summaries for the sheet UI.
          </p>
          {saved || deleted ? (
            <p className="mt-2 font-mono text-xs text-accent">
              {deleted ? "Deleted" : "Saved"}
            </p>
          ) : null}
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
        >
          New project
        </Link>
      </div>
      <ul className="mt-8 space-y-2">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="font-mono text-xs text-muted-foreground">
                /projects?project={p.slug} · {p.category ?? "—"} ·{" "}
                {p.isActive ? "active" : "off"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${p.id}`}
                className="rounded border border-border px-2 py-1 text-xs hover:border-accent"
              >
                Edit
              </Link>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={p.id} />
                <button
                  type="submit"
                  className="rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-red-500 hover:text-red-500"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
