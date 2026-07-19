import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteBlockAction } from "@/lib/admin-actions";
import { getCmsSnapshot } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminBlocksPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved, deleted } = await searchParams;
  const { blocks } = await getCmsSnapshot();
  const sorted = [...blocks].sort((a, b) => {
    if (a.personaKey !== b.personaKey)
      return a.personaKey.localeCompare(b.personaKey);
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            BLOCKS
          </p>
          <h1 className="mt-2 text-2xl font-medium">Content blocks</h1>
          {saved || deleted ? (
            <p className="mt-2 font-mono text-xs text-accent">
              {deleted ? "Deleted" : "Saved"}
            </p>
          ) : null}
        </div>
        <Link
          href="/admin/blocks/new"
          className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
        >
          New block
        </Link>
      </div>
      <ul className="mt-8 space-y-2">
        {sorted.map((b) => (
          <li
            key={b.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {b.title || "(untitled)"}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {b.personaKey} · {b.type} · order {b.sortOrder ?? 0}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/blocks/${b.id}`}
                className="rounded border border-border px-2 py-1 text-xs hover:border-accent"
              >
                Edit
              </Link>
              <form action={deleteBlockAction}>
                <input type="hidden" name="id" value={b.id} />
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
