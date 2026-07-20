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
import { getDb } from "@/lib/db";
import {
  deleteBlockDb,
  deleteBlocksByPersonaKey,
  deleteBlogDb,
  deletePersonaDb,
  deleteProjectDb,
  upsertBlock,
  upsertBlogPost,
  upsertPersona,
  upsertProfile,
  upsertProject,
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
import {
  PERSONA_KEYS,
  isPersonaKey,
  personas,
  profile,
} from "@/lib/schema";
import { eq } from "drizzle-orm";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function afterWrite() {
  revalidatePublicSite();
  revalidateAdmin();
}

// ─── Database utilities ───────────────────────────────────────────────────────

/**
 * No-op kept for backwards compatibility with the admin UI button.
 * Postgres is seeded at deploy time — there is no file CMS to reseed from.
 * If you need to reset data, use the Drizzle migration scripts directly.
 */
export async function reseedContentAction() {
  await requireAdmin();
  afterWrite();
  redirect("/admin?seeded=1");
}

/**
 * No-op kept for backwards compatibility with the admin UI button.
 * Previously synced the file CMS to Postgres; Postgres is now the only store.
 */
export async function syncDatabaseAction() {
  await requireAdmin();
  afterWrite();
  redirect("/admin?synced=1");
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

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

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function saveProfileAction(formData: FormData) {
  await requireAdmin();

  // Load current profile from DB so we preserve the existing id
  const db = getDb();
  const [existing] = await db.select().from(profile).limit(1);

  const next: Profile = {
    id: existing?.id ?? randomUUID(),
    fullName: String(formData.get("fullName") ?? existing?.fullName ?? "Moses Jacob Edem"),
    location: String(formData.get("location") ?? "") || null,
    email: String(formData.get("email") ?? "") || null,
    githubUrl: String(formData.get("githubUrl") ?? "") || null,
    linkedinUrl: String(formData.get("linkedinUrl") ?? "") || null,
    resumeUrl: String(formData.get("resumeUrl") ?? "") || null,
    phone: String(formData.get("phone") ?? "") || null,
    updatedAt: new Date(),
  };

  await upsertProfile(next);
  afterWrite();
  redirect("/admin/profile?saved=1");
}

// ─── Personas ─────────────────────────────────────────────────────────────────

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

  // Load existing row from DB when editing
  let existing: Persona | undefined;
  if (!isNew) {
    const db = getDb();
    const [row] = await db
      .select()
      .from(personas)
      .where(eq(personas.id, personaId))
      .limit(1);
    existing = row;
  }

  const keyCandidate = isNew ? rawKey : existing?.key ?? rawKey;

  if (!keyCandidate || !isPersonaKey(keyCandidate)) {
    redirect(
      `/admin/personas/${isNew ? "new" : personaId}?error=${encodeURIComponent(
        `Persona key must be one of: ${PERSONA_KEYS.join(", ")}`
      )}`
    );
  }

  const key = keyCandidate as PersonaKey;

  // Check key uniqueness (skip current row)
  const db = getDb();
  const conflictRows = await db
    .select()
    .from(personas)
    .where(eq(personas.key, key));
  const keyTaken = conflictRows.some((p) => p.id !== personaId);
  if (keyTaken) {
    redirect(
      `/admin/personas/${isNew ? "new" : personaId}?error=${encodeURIComponent(
        `Persona key "${key}" is already in use`
      )}`
    );
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
    iconName: String(formData.get("iconName") ?? existing?.iconName ?? "User"),
    sortOrder: Number(formData.get("sortOrder") ?? existing?.sortOrder ?? 0),
    isActive: formData.get("isActive") === "on",
  };

  await upsertPersona(next);
  afterWrite();
  redirect(`/admin/personas/${personaId}?saved=1`);
}

export async function deletePersonaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/personas");

  // Look up key before deleting so we can cascade blocks
  const db = getDb();
  const [row] = await db
    .select()
    .from(personas)
    .where(eq(personas.id, id))
    .limit(1);

  if (row?.key) {
    await deleteBlocksByPersonaKey(row.key);
  }
  await deletePersonaDb(id);
  afterWrite();
  redirect("/admin/personas?deleted=1");
}

// ─── Content Blocks ───────────────────────────────────────────────────────────

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

  const next: ContentBlock = {
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

  await upsertBlock(next);
  afterWrite();
  redirect(`/admin/blocks/${blockId}?saved=1`);
}

export async function deleteBlockAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await deleteBlockDb(id);
  afterWrite();
  redirect("/admin/blocks?deleted=1");
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

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

  // Load existing timestamps from DB so we don't lose them on edit
  let existingPublishedAt: Date | null = null;
  let existingCreatedAt: Date | null = null;
  if (!isNew) {
    const { blogPosts } = await import("@/lib/schema");
    const db = getDb();
    const [row] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, postId))
      .limit(1);
    existingPublishedAt = row?.publishedAt ?? null;
    existingCreatedAt = row?.createdAt ?? null;
  }

  const next: BlogPost = {
    id: postId,
    slug: slug || `post-${postId.slice(0, 8)}`,
    title: String(formData.get("title") ?? "Untitled"),
    excerpt: String(formData.get("excerpt") ?? "") || null,
    body: String(formData.get("body") ?? ""),
    coverImage: String(formData.get("coverImage") ?? "") || null,
    tags,
    published,
    publishedAt: published ? (existingPublishedAt ?? now) : (existingPublishedAt ?? null),
    createdAt: existingCreatedAt ?? now,
    updatedAt: now,
  };

  await upsertBlogPost(next);
  afterWrite();
  redirect(`/admin/blog/${postId}?saved=1`);
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await deleteBlogDb(id);
  afterWrite();
  redirect("/admin/blog?deleted=1");
}

// ─── Projects ─────────────────────────────────────────────────────────────────

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

  // Load existing lens from DB so partial edits don't wipe other keys
  let existingLens: ProjectLensMap = {};
  if (!isNew) {
    const { portfolioProjects } = await import("@/lib/schema");
    const db = getDb();
    const [row] = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.id, projectId))
      .limit(1);
    existingLens = (row?.lens as ProjectLensMap) ?? {};
  }

  const next: PortfolioProject = {
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
    lens: Object.keys(lens).length > 0 ? lens : existingLens,
  };

  await upsertProject(next);
  afterWrite();
  redirect(`/admin/projects/${projectId}?saved=1`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await deleteProjectDb(id);
  afterWrite();
  redirect("/admin/projects?deleted=1");
}
