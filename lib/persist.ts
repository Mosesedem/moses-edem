import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
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

// ─── Individual upserts (used by admin actions) ───────────────────────────────

export async function upsertProfile(data: Profile): Promise<void> {
  const db = getDb();
  await db
    .insert(profile)
    .values({
      id: data.id,
      fullName: data.fullName,
      location: data.location,
      email: data.email,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      resumeUrl: data.resumeUrl,
      phone: data.phone ?? null,
      updatedAt: data.updatedAt ?? new Date(),
    })
    .onConflictDoUpdate({
      target: profile.id,
      set: {
        fullName: data.fullName,
        location: data.location,
        email: data.email,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        resumeUrl: data.resumeUrl,
        phone: data.phone ?? null,
        updatedAt: data.updatedAt ?? new Date(),
      },
    });
}

export async function upsertPersona(data: Persona): Promise<void> {
  const db = getDb();
  await db
    .insert(personas)
    .values(data as Persona)
    .onConflictDoUpdate({
      target: personas.id,
      set: {
        key: data.key,
        label: data.label,
        tagline: data.tagline,
        heroHeading: data.heroHeading,
        heroBody: data.heroBody,
        ctaLabel: data.ctaLabel,
        ctaHref: data.ctaHref,
        iconName: data.iconName,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
    });
}

export async function upsertBlock(data: ContentBlock): Promise<void> {
  const db = getDb();
  await db
    .insert(contentBlocks)
    .values(data as ContentBlock)
    .onConflictDoUpdate({
      target: contentBlocks.id,
      set: {
        personaKey: data.personaKey,
        type: data.type,
        title: data.title,
        body: data.body,
        iconName: data.iconName,
        href: data.href,
        metadata: data.metadata,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
    });
}

export async function upsertProject(data: PortfolioProject): Promise<void> {
  const db = getDb();
  await db
    .insert(portfolioProjects)
    .values(data as PortfolioProject)
    .onConflictDoUpdate({
      target: portfolioProjects.id,
      set: {
        slug: data.slug,
        title: data.title,
        category: data.category,
        iconName: data.iconName,
        href: data.href,
        tech: data.tech,
        featured: data.featured,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
        lens: data.lens,
      },
    });
}

export async function upsertBlogPost(data: BlogPost): Promise<void> {
  const db = getDb();
  await db
    .insert(blogPosts)
    .values(data as BlogPost)
    .onConflictDoUpdate({
      target: blogPosts.id,
      set: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        body: data.body,
        coverImage: data.coverImage,
        tags: data.tags,
        published: data.published,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt ?? new Date(),
      },
    });
}

// ─── Deletes ──────────────────────────────────────────────────────────────────

export async function deleteBlockDb(id: string): Promise<void> {
  await getDb().delete(contentBlocks).where(eq(contentBlocks.id, id));
}

export async function deleteProjectDb(id: string): Promise<void> {
  await getDb().delete(portfolioProjects).where(eq(portfolioProjects.id, id));
}

export async function deleteBlogDb(id: string): Promise<void> {
  await getDb().delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function deletePersonaDb(id: string): Promise<void> {
  await getDb().delete(personas).where(eq(personas.id, id));
}

export async function deleteBlocksByPersonaKey(key: string): Promise<void> {
  await getDb().delete(contentBlocks).where(eq(contentBlocks.personaKey, key));
}
