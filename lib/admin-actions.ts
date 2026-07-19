"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { revalidateAdmin, revalidatePublicSite } from "@/lib/admin-revalidate";
import { defaultSnapshot, writeCmsStore } from "@/lib/cms-store";
import { isDatabaseConfigured } from "@/lib/db";
import {
  deleteBlogDb,
  deleteBlockDb,
  deletePersonaDb,
  deleteProjectDb,
  persistCms,
  syncCmsToDatabase,
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
import { PERSONA_KEYS, isPersonaKey } from "@/lib/schema";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function afterWrite() {
  revalidatePublicSite();
  revalidateAdmin();
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

/** Push current CMS snapshot to Postgres (no content changes). */
export async function syncDatabaseAction() {
  await requireAdmin();
  const result = await syncCmsToDatabase();
  afterWrite();
  if (!result.ok) {
    redirect(
      `/admin?error=${encodeURIComponent(result.error ?? "Sync failed")}`
    );
  }
  redirect("/admin?synced=1");
}

/**
 * Reload built-in seed into file CMS + Postgres.
 * Overwrites all CMS content — intentional reseed tool.
 */
export async function reseedContentAction() {
  await requireAdmin();
  const snap = defaultSnapshot();
  await writeCmsStore(snap);
  if (isDatabaseConfigured()) {
    const result = await syncCmsToDatabase();
    if (!result.ok) {
      afterWrite();
      redirect(
        `/admin?error=${encodeURIComponent(result.error ?? "Reseed DB sync failed")}`
      );
    }
  }
  afterWrite();
  redirect("/admin?seeded=1");
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
  afterWrite();
  redirect("/admin/profile?saved=1");
}

export async function savePersonaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const isNew = !id || id === "new";
  const personaId = isNew ? randomUUID() : id;
  const rawKey = String(formData.get("key") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    await persistCms((snap) => {
      const existing = snap.personas.find((p) => p.id === personaId);
      const keyCandidate = isNew ? rawKey : existing?.key ?? rawKey;

      if (!keyCandidate || !isPersonaKey(keyCandidate)) {
        throw new Error(
          `Persona key must be one of: ${PERSONA_KEYS.join(", ")}`
        );
      }

      const key = (isNew ? keyCandidate : existing!.key) as PersonaKey;

      const keyTaken = snap.personas.some(
        (p) => p.key === key && p.id !== personaId
      );
      if (keyTaken) {
        throw new Error(`Persona key “${key}” is already in use`);
      }

      const next: Persona = {
        id: personaId,
        key,
        label: String(formData.get("label") ?? existing?.label ?? key),
        tagline: String(formData.get("tagline") ?? "") || null,
        heroHeading: String(formData.get("heroHeading") ?? "") || null,
        heroBody: String(formData.get("heroBody") ?? "") || null,
        ctaLabel: String(formData.get("ctaLabel") ?? "") || null,
        ctaHref: String(formData.get("ctaHref") ?? "") || null,
        iconName: String(
          formData.get("iconName") ?? existing?.iconName ?? "User"
        ),
        sortOrder: Number(
          formData.get("sortOrder") ?? existing?.sortOrder ?? 0
        ),
        isActive: formData.get("isActive") === "on",
      };

      const personas = isNew
        ? [...snap.personas, next]
        : snap.personas.map((p) => (p.id === personaId ? next : p));

      return { ...snap, personas };
    });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Could not save persona";
    redirect(
      `/admin/personas/${isNew ? "new" : personaId}?error=${encodeURIComponent(msg)}`
    );
  }

  afterWrite();
  redirect(`/admin/personas/${personaId}?saved=1`);
}

export async function deletePersonaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/personas");

  await persistCms((snap) => {
    const persona = snap.personas.find((p) => p.id === id);
    const key = persona?.key;
    return {
      ...snap,
      personas: snap.personas.filter((p) => p.id !== id),
      // Drop blocks that only applied to this lens
      blocks: key
        ? snap.blocks.filter((b) => b.personaKey !== key)
        : snap.blocks,
    };
  });
  await deletePersonaDb(id);
  afterWrite();
  redirect("/admin/personas?deleted=1");
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
    const personaKey = String(formData.get("personaKey") ?? "visitor");
    const nextBlock: ContentBlock = {
      id: blockId,
      personaKey,
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

  afterWrite();
  redirect(`/admin/blocks/${blockId}?saved=1`);
}

export async function deleteBlockAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => ({
    ...snap,
    blocks: snap.blocks.filter((b) => b.id !== id),
  }));
  await deleteBlockDb(id);
  afterWrite();
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

  afterWrite();
  redirect(`/admin/blog/${postId}?saved=1`);
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => ({
    ...snap,
    blogPosts: snap.blogPosts.filter((p) => p.id !== id),
  }));
  await deleteBlogDb(id);
  afterWrite();
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

  afterWrite();
  redirect(`/admin/projects/${projectId}?saved=1`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await persistCms((snap) => ({
    ...snap,
    projects: (snap.projects ?? []).filter((p) => p.id !== id),
  }));
  await deleteProjectDb(id);
  afterWrite();
  redirect("/admin/projects?deleted=1");
}
