import { notFound, redirect } from "next/navigation";
import {
  AdminBackLink,
  AdminFlash,
  AdminPageHeader,
} from "@/components/admin/form-controls";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
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
    <div className="max-w-3xl">
      <AdminBackLink href="/admin/blog" label="All posts" />
      <AdminPageHeader
        kicker={isNew ? "New post" : "Edit post"}
        title={isNew ? "Write a post" : post.title}
        description="Use the rich editor for headings, lists, images, embeds, and tables. Content is stored as HTML in the CMS."
      />
      <AdminFlash saved={Boolean(saved)} />

      <BlogPostForm
        id={post.id}
        title={post.title}
        slug={post.slug}
        excerpt={post.excerpt ?? ""}
        body={post.body}
        tags={tags}
        coverImage={post.coverImage ?? ""}
        published={post.published === true}
        isNew={isNew}
      />
    </div>
  );
}
