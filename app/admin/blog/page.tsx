import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  AdminEmpty,
  AdminEditLink,
  AdminFlash,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRow,
} from "@/components/admin/form-controls";
import { deleteBlogAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllPostsAdmin } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminBlogPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved, deleted } = await searchParams;
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <AdminPageHeader
        kicker="Blog"
        title="Posts"
        description="Published posts appear on /blog. Drafts stay admin-only until you check Published."
        action={
          <AdminPrimaryLink href="/admin/blog/new">New post</AdminPrimaryLink>
        }
      />
      <AdminFlash saved={Boolean(saved)} deleted={Boolean(deleted)} />

      {posts.length === 0 ? (
        <AdminEmpty
          title="No posts yet"
          description="Write a post here, or load built-in sample posts from the dashboard seed."
          action={
            <AdminPrimaryLink href="/admin/blog/new">
              Write a post
            </AdminPrimaryLink>
          }
        />
      ) : (
        <ul className="mt-8 space-y-2">
          {posts.map((p) => (
            <AdminRow
              key={p.id}
              title={p.title}
              meta={`/blog/${p.slug} · ${p.published ? "published" : "draft"}`}
              actions={
                <>
                  <AdminEditLink href={`/admin/blog/${p.id}`} />
                  <form action={deleteBlogAction} className="flex flex-1 sm:flex-none">
                    <input type="hidden" name="id" value={p.id} />
                    <DeleteButton itemLabel={p.title} />
                  </form>
                </>
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
