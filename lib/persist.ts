import { eq, notInArray } from "drizzle-orm";
import { updateCmsStore, type CmsSnapshot } from "@/lib/cms-store";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import {
  blogPosts,
  contentBlocks,
  personas,
  portfolioProjects,
  profile,
  type BlogPost,
  type ContentBlock,
  type Persona,
  type PortfolioProject,
} from "@/lib/schema";

/**
 * Mutate the file CMS and, when DATABASE_URL is set, fully mirror the
 * snapshot into Postgres (upsert + remove orphans) so admin CRUD stays
 * consistent for both storage backends.
 */
export async function persistCms(
  mutator: (snap: CmsSnapshot) => CmsSnapshot | Promise<CmsSnapshot>
): Promise<CmsSnapshot> {
  const next = await updateCmsStore(mutator);

  if (!isDatabaseConfigured()) {
    return next;
  }

  try {
    await syncSnapshotToPostgres(next);
  } catch (err) {
    console.error(
      "[persist] Postgres sync failed (file store still updated):",
      err
    );
  }

  return next;
}

/** Force a full file → Postgres sync of the current CMS snapshot. */
export async function syncCmsToDatabase(): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!isDatabaseConfigured()) {
    return { ok: false, error: "DATABASE_URL is not configured" };
  }
  try {
    const { readCmsStore } = await import("@/lib/cms-store");
    const snap = await readCmsStore();
    await syncSnapshotToPostgres(snap);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[persist] syncCmsToDatabase failed:", message);
    return { ok: false, error: message };
  }
}

async function syncSnapshotToPostgres(snap: CmsSnapshot) {
  const db = getDb();

  await db.transaction(async (tx) => {
    // Profile (single canonical row)
    await tx
      .insert(profile)
      .values({
        id: snap.profile.id,
        fullName: snap.profile.fullName,
        location: snap.profile.location,
        email: snap.profile.email,
        githubUrl: snap.profile.githubUrl,
        linkedinUrl: snap.profile.linkedinUrl,
        resumeUrl: snap.profile.resumeUrl,
        phone: snap.profile.phone ?? null,
        updatedAt: snap.profile.updatedAt ?? new Date(),
      })
      .onConflictDoUpdate({
        target: profile.id,
        set: {
          fullName: snap.profile.fullName,
          location: snap.profile.location,
          email: snap.profile.email,
          githubUrl: snap.profile.githubUrl,
          linkedinUrl: snap.profile.linkedinUrl,
          resumeUrl: snap.profile.resumeUrl,
          phone: snap.profile.phone ?? null,
          updatedAt: snap.profile.updatedAt ?? new Date(),
        },
      });

    // Drop any other profile rows so only the CMS profile remains
    await tx.delete(profile).where(notInArray(profile.id, [snap.profile.id]));

    const personaIds = snap.personas.map((r) => r.id);
    for (const row of snap.personas) {
      await tx
        .insert(personas)
        .values(row as Persona)
        .onConflictDoUpdate({
          target: personas.id,
          set: {
            key: row.key,
            label: row.label,
            tagline: row.tagline,
            heroHeading: row.heroHeading,
            heroBody: row.heroBody,
            ctaLabel: row.ctaLabel,
            ctaHref: row.ctaHref,
            iconName: row.iconName,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
          },
        });
    }
    if (personaIds.length > 0) {
      await tx.delete(personas).where(notInArray(personas.id, personaIds));
    } else {
      await tx.delete(personas);
    }

    const blockIds = snap.blocks.map((r) => r.id);
    for (const row of snap.blocks) {
      await tx
        .insert(contentBlocks)
        .values(row as ContentBlock)
        .onConflictDoUpdate({
          target: contentBlocks.id,
          set: {
            personaKey: row.personaKey,
            type: row.type,
            title: row.title,
            body: row.body,
            iconName: row.iconName,
            href: row.href,
            metadata: row.metadata,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
          },
        });
    }
    if (blockIds.length > 0) {
      await tx
        .delete(contentBlocks)
        .where(notInArray(contentBlocks.id, blockIds));
    } else {
      await tx.delete(contentBlocks);
    }

    const projectIds = (snap.projects ?? []).map((r) => r.id);
    for (const row of snap.projects ?? []) {
      await tx
        .insert(portfolioProjects)
        .values(row as PortfolioProject)
        .onConflictDoUpdate({
          target: portfolioProjects.id,
          set: {
            slug: row.slug,
            title: row.title,
            category: row.category,
            iconName: row.iconName,
            href: row.href,
            tech: row.tech,
            featured: row.featured,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
            lens: row.lens,
          },
        });
    }
    if (projectIds.length > 0) {
      await tx
        .delete(portfolioProjects)
        .where(notInArray(portfolioProjects.id, projectIds));
    } else {
      await tx.delete(portfolioProjects);
    }

    const postIds = snap.blogPosts.map((r) => r.id);
    for (const row of snap.blogPosts) {
      await tx
        .insert(blogPosts)
        .values(row as BlogPost)
        .onConflictDoUpdate({
          target: blogPosts.id,
          set: {
            slug: row.slug,
            title: row.title,
            excerpt: row.excerpt,
            body: row.body,
            coverImage: row.coverImage,
            tags: row.tags,
            published: row.published,
            publishedAt: row.publishedAt,
            updatedAt: row.updatedAt ?? new Date(),
          },
        });
    }
    if (postIds.length > 0) {
      await tx.delete(blogPosts).where(notInArray(blogPosts.id, postIds));
    } else {
      await tx.delete(blogPosts);
    }
  });
}

export async function deleteBlockDb(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb().delete(contentBlocks).where(eq(contentBlocks.id, id));
  } catch (err) {
    console.error("[persist] delete block failed:", err);
  }
}

export async function deleteProjectDb(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb()
      .delete(portfolioProjects)
      .where(eq(portfolioProjects.id, id));
  } catch (err) {
    console.error("[persist] delete project failed:", err);
  }
}

export async function deleteBlogDb(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb().delete(blogPosts).where(eq(blogPosts.id, id));
  } catch (err) {
    console.error("[persist] delete blog failed:", err);
  }
}

export async function deletePersonaDb(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb().delete(personas).where(eq(personas.id, id));
  } catch (err) {
    console.error("[persist] delete persona failed:", err);
  }
}
