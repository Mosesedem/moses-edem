import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteBlogAction } from "@/lib/admin-actions";
import { getAllPostsAdmin } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminBlogPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved, deleted } = await searchParams;
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            BLOG
          </p>
          <h1 className="mt-2 text-2xl font-medium">Posts</h1>
          {saved || deleted ? (
            <p className="mt-2 font-mono text-xs text-accent">
              {deleted ? "Deleted" : "Saved"}
            </p>
          ) : null}
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
        >
          New post
        </Link>
      </div>
      <ul className="mt-8 space-y-2">
        {posts.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="font-mono text-xs text-muted-foreground">
                /blog/{p.slug} · {p.published ? "published" : "draft"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/blog/${p.id}`}
                className="rounded border border-border px-2 py-1 text-xs hover:border-accent"
              >
                Edit
              </Link>
              <form action={deleteBlogAction}>
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
