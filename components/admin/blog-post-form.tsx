"use client";

import { useState } from "react";
import {
  AdminCheckbox,
  AdminField,
  AdminSubmit,
  AdminTextArea,
} from "@/components/admin/form-controls";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { saveBlogAction } from "@/lib/admin-actions";

type BlogPostFormProps = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  tags: string;
  coverImage: string;
  published: boolean;
  isNew: boolean;
};

export function BlogPostForm({
  id,
  title,
  slug,
  excerpt,
  body: initialBody,
  tags,
  coverImage,
  published,
  isNew,
}: BlogPostFormProps) {
  const [body, setBody] = useState(initialBody || "");

  return (
    <form action={saveBlogAction} className="mt-8 space-y-5">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="body" value={body} />

      <AdminField name="title" label="Title" defaultValue={title} required />
      <AdminField
        name="slug"
        label="Slug"
        defaultValue={slug}
        placeholder="my-post-slug"
        hint="URL: /blog/your-slug"
      />
      <AdminTextArea
        name="excerpt"
        label="Excerpt"
        rows={2}
        defaultValue={excerpt}
        hint="Short summary for the blog index and social previews"
      />

      <div>
        <p className="mb-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Body <span className="text-accent">*</span>
        </p>
        <p className="mb-2 text-[11px] leading-snug text-muted-foreground">
          Rich text is saved as HTML and rendered cleanly on the public post
          page.
        </p>
        <RichTextEditor
          content={initialBody || ""}
          onChange={setBody}
          placeholder="Write something worth shipping..."
        />
      </div>

      <AdminField
        name="tags"
        label="Tags (comma-separated)"
        defaultValue={tags}
      />
      <AdminField
        name="coverImage"
        label="Cover image URL"
        defaultValue={coverImage}
      />
      <AdminCheckbox
        name="published"
        label="Published"
        defaultChecked={published}
        hint="Only published posts appear on the public blog"
      />
      <AdminSubmit>{isNew ? "Create post" : "Save post"}</AdminSubmit>
    </form>
  );
}
