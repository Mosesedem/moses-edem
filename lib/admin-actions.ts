"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  deleteBlockMysql,
  deleteBlogMysql,
  deleteProjectMysql,
  persistCms,
} from "@/lib/persist";
import type {
  BlogPost,
  ContentBlock,
  Persona,
  PersonaKey,
  PortfolioProject,
  Profile,
  ProjectLensMap,
} from "@/lib/schema";
import { PERSONA_KEYS } from "@/lib/schema";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveProfileAction(formData: FormData) {
  await requireAdmin();
  await persistCms((snap) => {
    const profile: Profile = {
      ...snap.profile,
      fullName: String(formData.get("fullName") ?? snap.profile.fullName),
      location: String(formData.get("location") ?? "") || null,
      email: String(formData.get("email") ?? "") || null,
      githubUrl: String(formData.get("githubUrl") ?? "") || null,
      linkedinUrl: String(formData.get("linkedinUrl") ?? "") || null,
      resumeUrl: String(formData.get("resumeUrl") ?? "") || null,
      phone: String(formData.get("phone") ?? "") || null,
      updatedAt: new Date(),
    };
    return { ...snap, profile };
  });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin/profile?saved=1");
}

export async function savePersonaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => {
    const personas = snap.personas.map((p) => {
      if (p.id !== id) return p;
      const next: Persona = {
        ...p,
        label: String(formData.get("label") ?? p.label),
        tagline: String(formData.get("tagline") ?? "") || null,
        heroHeading: String(formData.get("heroHeading") ?? "") || null,
        heroBody: String(formData.get("heroBody") ?? "") || null,
        ctaLabel: String(formData.get("ctaLabel") ?? "") || null,
        ctaHref: String(formData.get("ctaHref") ?? "") || null,
        iconName: String(formData.get("iconName") ?? p.iconName),
        sortOrder: Number(formData.get("sortOrder") ?? p.sortOrder ?? 0),
        isActive: formData.get("isActive") === "on",
      };
      return next;
    });
    return { ...snap, personas };
  });
  revalidatePath("/");
  revalidatePath("/admin/personas");
  redirect(`/admin/personas/${id}?saved=1`);
}

export async function saveBlockAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const isNew = !id || id === "new";
  const blockId = isNew ? randomUUID() : id;

  let metadata: Record<string, unknown> | null = null;
  const metaRaw = String(formData.get("metadata") ?? "").trim();
  if (metaRaw) {
    try {
      metadata = JSON.parse(metaRaw) as Record<string, unknown>;
    } catch {
      metadata = { note: metaRaw };
    }
  }

  await persistCms((snap) => {
    const nextBlock: ContentBlock = {
      id: blockId,
      personaKey: String(formData.get("personaKey") ?? "visitor"),
      type: String(formData.get("type") ?? "text"),
      title: String(formData.get("title") ?? "") || null,
      body: String(formData.get("body") ?? "") || null,
      iconName: String(formData.get("iconName") ?? "") || null,
      href: String(formData.get("href") ?? "") || null,
      metadata,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") === "on",
    };

    const blocks = isNew
      ? [...snap.blocks, nextBlock]
      : snap.blocks.map((b) => (b.id === blockId ? nextBlock : b));

    return { ...snap, blocks };
  });

  revalidatePath("/");
  revalidatePath("/admin/blocks");
  redirect(`/admin/blocks?saved=1`);
}

export async function deleteBlockAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => ({
    ...snap,
    blocks: snap.blocks.filter((b) => b.id !== id),
  }));
  await deleteBlockMysql(id);
  revalidatePath("/");
  revalidatePath("/admin/blocks");
  redirect("/admin/blocks?deleted=1");
}

export async function saveBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const isNew = !id || id === "new";
  const postId = isNew ? randomUUID() : id;
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
  const published = formData.get("published") === "on";
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const now = new Date();

  await persistCms((snap) => {
    const existing = snap.blogPosts.find((p) => p.id === postId);
    const post: BlogPost = {
      id: postId,
      slug: slug || `post-${postId.slice(0, 8)}`,
      title: String(formData.get("title") ?? "Untitled"),
      excerpt: String(formData.get("excerpt") ?? "") || null,
      body: String(formData.get("body") ?? ""),
      coverImage: String(formData.get("coverImage") ?? "") || null,
      tags,
      published,
      publishedAt: published
        ? existing?.publishedAt ?? now
        : existing?.publishedAt ?? null,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    const blogPosts = isNew
      ? [...snap.blogPosts, post]
      : snap.blogPosts.map((p) => (p.id === postId ? post : p));

    return { ...snap, blogPosts };
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${postId}?saved=1`);
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => ({
    ...snap,
    blogPosts: snap.blogPosts.filter((p) => p.id !== id),
  }));
  await deleteBlogMysql(id);
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog?deleted=1");
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const isNew = !id || id === "new";
  const projectId = isNew ? randomUUID() : id;
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
  const tech = String(formData.get("tech") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const lens: ProjectLensMap = {};
  for (const key of PERSONA_KEYS) {
    const summary = String(formData.get(`lens_${key}_summary`) ?? "").trim();
    const body = String(formData.get(`lens_${key}_body`) ?? "").trim();
    const metric = String(formData.get(`lens_${key}_metric`) ?? "").trim();
    if (summary || body) {
      lens[key as PersonaKey] = {
        summary: summary || body.slice(0, 120),
        body: body || summary,
        ...(metric ? { metric } : {}),
      };
    }
  }

  await persistCms((snap) => {
    const existing = (snap.projects ?? []).find((p) => p.id === projectId);
    const project: PortfolioProject = {
      id: projectId,
      slug: slug || `project-${projectId.slice(0, 8)}`,
      title: String(formData.get("title") ?? "Untitled"),
      category: String(formData.get("category") ?? "") || null,
      iconName: String(formData.get("iconName") ?? "Code2") || "Code2",
      href: String(formData.get("href") ?? "") || null,
      tech,
      featured: formData.get("featured") === "on",
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") === "on",
      lens:
        Object.keys(lens).length > 0
          ? lens
          : (existing?.lens as ProjectLensMap) ?? {},
    };

    const projects = isNew
      ? [...(snap.projects ?? []), project]
      : (snap.projects ?? []).map((p) => (p.id === projectId ? project : p));

    return { ...snap, projects };
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect(`/admin/projects/${projectId}?saved=1`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => ({
    ...snap,
    projects: (snap.projects ?? []).filter((p) => p.id !== id),
  }));
  await deleteProjectMysql(id);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects?deleted=1");
}
