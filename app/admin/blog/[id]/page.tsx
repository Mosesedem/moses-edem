import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { saveBlogAction } from "@/lib/admin-actions";
import { getAllPostsAdmin } from "@/lib/queries";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminBlogEditPage({
  params,
  searchParams,
}: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const posts = await getAllPostsAdmin();
  const post = isNew
    ? {
        id: "new",
        slug: "",
        title: "",
        excerpt: "",
        body: "",
        coverImage: "",
        tags: [] as string[],
        published: false,
      }
    : posts.find((p) => p.id === id);
  if (!post) notFound();

  const tags = Array.isArray(post.tags)
    ? (post.tags as string[]).join(", ")
    : "";

  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {isNew ? "NEW POST" : "EDIT POST"}
      </p>
      <h1 className="mt-2 text-2xl font-medium">
        {isNew ? "Write a post" : post.title}
      </h1>
      {saved ? (
        <p className="mt-2 font-mono text-xs text-accent">Saved</p>
      ) : null}
      <form action={saveBlogAction} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={post.id} />
        <div>
          <label className="text-xs font-mono text-muted-foreground">Title</label>
          <input
            name="title"
            required
            defaultValue={post.title}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Slug
          </label>
          <input
            name="slug"
            defaultValue={post.slug}
            placeholder="my-post-slug"
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={post.excerpt ?? ""}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Body (markdown-lite)
          </label>
          <textarea
            name="body"
            rows={16}
            required
            defaultValue={post.body}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Tags (comma-separated)
          </label>
          <input
            name="tags"
            defaultValue={tags}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Cover image URL
          </label>
          <input
            name="coverImage"
            defaultValue={post.coverImage ?? ""}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post.published === true}
          />
          Published
        </label>
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Save post
        </button>
      </form>
    </div>
  );
}
