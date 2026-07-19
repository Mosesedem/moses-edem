import { eq } from "drizzle-orm";
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
  type Profile,
} from "@/lib/schema";

/**
 * Mutate the file CMS and, when DATABASE_URL is set, mirror the same
 * snapshot fields into MySQL so admin edits and public reads stay aligned.
 */
export async function persistCms(
  mutator: (snap: CmsSnapshot) => CmsSnapshot | Promise<CmsSnapshot>
): Promise<CmsSnapshot> {
  const next = await updateCmsStore(mutator);

  if (!isDatabaseConfigured()) {
    return next;
  }

  try {
    await syncSnapshotToMysql(next);
  } catch (err) {
    console.error("[persist] MySQL sync failed (file store still updated):", err);
  }

  return next;
}

async function syncSnapshotToMysql(snap: CmsSnapshot) {
  const db = getDb();

  // Profile (single row)
  await db
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
    })
    .onDuplicateKeyUpdate({
      set: {
        fullName: snap.profile.fullName,
        location: snap.profile.location,
        email: snap.profile.email,
        githubUrl: snap.profile.githubUrl,
        linkedinUrl: snap.profile.linkedinUrl,
        resumeUrl: snap.profile.resumeUrl,
        phone: snap.profile.phone ?? null,
      },
    });

  for (const row of snap.personas) {
    await db
      .insert(personas)
      .values(row as Persona)
      .onDuplicateKeyUpdate({
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

  for (const row of snap.blocks) {
    await db
      .insert(contentBlocks)
      .values(row as ContentBlock)
      .onDuplicateKeyUpdate({
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

  for (const row of snap.projects ?? []) {
    await db
      .insert(portfolioProjects)
      .values(row as PortfolioProject)
      .onDuplicateKeyUpdate({
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

  for (const row of snap.blogPosts) {
    await db
      .insert(blogPosts)
      .values(row as BlogPost)
      .onDuplicateKeyUpdate({
        set: {
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          body: row.body,
          coverImage: row.coverImage,
          tags: row.tags,
          published: row.published,
          publishedAt: row.publishedAt,
        },
      });
  }
}

export async function deleteBlockMysql(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb().delete(contentBlocks).where(eq(contentBlocks.id, id));
  } catch (err) {
    console.error("[persist] delete block MySQL failed:", err);
  }
}

export async function deleteProjectMysql(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb()
      .delete(portfolioProjects)
      .where(eq(portfolioProjects.id, id));
  } catch (err) {
    console.error("[persist] delete project MySQL failed:", err);
  }
}

export async function deleteBlogMysql(id: string) {
  if (!isDatabaseConfigured()) return;
  try {
    await getDb().delete(blogPosts).where(eq(blogPosts.id, id));
  } catch (err) {
    console.error("[persist] delete blog MySQL failed:", err);
  }
}

export type { Profile };
