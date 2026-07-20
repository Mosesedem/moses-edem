import { cache } from "react";
import { unstable_cache } from "next/cache";
import { asc, eq, and } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  blogPosts,
  contentBlocks,
  isPersonaKey,
  personas,
  portfolioProjects,
  profile,
  type BlogPost,
  type ContentBlock,
  type Persona,
  type PersonaKey,
  type PortfolioProject,
  type Profile,
} from "@/lib/schema";

/** Public pages revalidate this often; admin writes call revalidateTag("cms"). */
const PUBLIC_REVALIDATE_SECONDS = 45;

export const CMS_CACHE_TAG = "cms";

function asDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const d = new Date(value as string | number);
  return Number.isNaN(d.getTime()) ? null : d;
}

function normalizeBlogPost(row: BlogPost): BlogPost {
  return {
    ...row,
    body: row.body ?? "",
    title: row.title ?? "Untitled",
    slug: row.slug ?? row.id,
    tags: Array.isArray(row.tags) ? row.tags : [],
    published: Boolean(row.published),
    publishedAt: asDate(row.publishedAt),
    createdAt: asDate(row.createdAt),
    updatedAt: asDate(row.updatedAt),
  };
}

function normalizeProject(row: PortfolioProject): PortfolioProject {
  return {
    ...row,
    title: row.title ?? "Project",
    slug: row.slug ?? row.id,
    tech: Array.isArray(row.tech) ? row.tech : [],
    featured: Boolean(row.featured),
    isActive: row.isActive !== false,
    sortOrder: row.sortOrder ?? 0,
    lens: row.lens && typeof row.lens === "object" ? row.lens : {},
  };
}

function publicCache<T>(keyParts: string[], fn: () => Promise<T>): Promise<T> {
  return unstable_cache(fn, keyParts, {
    revalidate: PUBLIC_REVALIDATE_SECONDS,
    tags: [CMS_CACHE_TAG],
  })();
}

// ─── Core fetchers ────────────────────────────────────────────────────────────

async function fetchAllPersonas(): Promise<Persona[]> {
  const rows = await getDb()
    .select()
    .from(personas)
    .where(eq(personas.isActive, true))
    .orderBy(asc(personas.sortOrder));
  return rows;
}

async function fetchProjects(): Promise<PortfolioProject[]> {
  const rows = await getDb()
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.isActive, true))
    .orderBy(asc(portfolioProjects.sortOrder));
  return rows.map(normalizeProject);
}

async function fetchPersona(
  key: string
): Promise<{ persona: Persona; blocks: ContentBlock[] } | null> {
  if (!isPersonaKey(key)) return null;

  const [[persona], blocks] = await Promise.all([
    getDb().select().from(personas).where(eq(personas.key, key)).limit(1),
    getDb()
      .select()
      .from(contentBlocks)
      .where(
        and(eq(contentBlocks.personaKey, key), eq(contentBlocks.isActive, true))
      )
      .orderBy(asc(contentBlocks.sortOrder)),
  ]);

  if (!persona) return null;
  return { persona, blocks };
}

async function fetchProfile(): Promise<Profile> {
  const [row] = await getDb().select().from(profile).limit(1);
  if (!row) {
    // Fallback for a completely empty DB (shouldn't happen post-seed)
    return {
      id: "default",
      fullName: "Moses Jacob Edem",
      location: null,
      email: null,
      githubUrl: null,
      linkedinUrl: null,
      resumeUrl: null,
      phone: null,
      updatedAt: null,
    };
  }
  return { ...row, updatedAt: asDate(row.updatedAt) };
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const rows = await getDb()
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true));
  return rows
    .map(normalizeBlogPost)
    .sort((a, b) => {
      const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
      const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
      return tb - ta;
    });
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const [row] = await getDb()
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
    .limit(1);
  return row ? normalizeBlogPost(row) : null;
}

// ─── Public API: request memoization + short ISR cache ───────────────────────

/** Active personas for picker / nav. */
export const getAllPersonas = cache(async (): Promise<Persona[]> => {
  return publicCache(["cms", "personas", "active"], fetchAllPersonas);
});

/** Active portfolio projects. */
export const getProjects = cache(async (): Promise<PortfolioProject[]> => {
  return publicCache(["cms", "projects", "active"], fetchProjects);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<PortfolioProject | null> => {
    return publicCache(["cms", "project", slug], async () => {
      const [row] = await getDb()
        .select()
        .from(portfolioProjects)
        .where(
          and(
            eq(portfolioProjects.slug, slug),
            eq(portfolioProjects.isActive, true)
          )
        )
        .limit(1);
      return row ? normalizeProject(row) : null;
    });
  }
);

export const getPersona = cache(
  async (
    key: string
  ): Promise<{ persona: Persona; blocks: ContentBlock[] } | null> => {
    if (!isPersonaKey(key)) return null;
    return publicCache(["cms", "persona", key], () => fetchPersona(key));
  }
);

export const getProfile = cache(async (): Promise<Profile> => {
  return publicCache(["cms", "profile"], fetchProfile);
});

export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  return publicCache(["cms", "posts", "published"], fetchPublishedPosts);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    return publicCache(["cms", "post", slug], () => fetchPostBySlug(slug));
  }
);

// ─── Admin: request-memoized only (always fresh after navigation) ─────────────

export const getAllProjectsAdmin = cache(
  async (): Promise<PortfolioProject[]> => {
    const rows = await getDb()
      .select()
      .from(portfolioProjects)
      .orderBy(asc(portfolioProjects.sortOrder));
    return rows.map(normalizeProject);
  }
);

export const getAllPostsAdmin = cache(async (): Promise<BlogPost[]> => {
  const rows = await getDb().select().from(blogPosts);
  return rows
    .map(normalizeBlogPost)
    .sort((a, b) => {
      const ta = a.updatedAt ? a.updatedAt.getTime() : 0;
      const tb = b.updatedAt ? b.updatedAt.getTime() : 0;
      return tb - ta;
    });
});

/** Full snapshot for admin dashboard (personas, blocks, profile, posts, projects). */
export const getCmsSnapshot = cache(async () => {
  const db = getDb();
  const [p, b, pr, posts, projects] = await Promise.all([
    db.select().from(personas).orderBy(asc(personas.sortOrder)),
    db.select().from(contentBlocks).orderBy(asc(contentBlocks.sortOrder)),
    db.select().from(profile).limit(1),
    db.select().from(blogPosts),
    db.select().from(portfolioProjects).orderBy(asc(portfolioProjects.sortOrder)),
  ]);
  return {
    personas: p,
    blocks: b,
    profile: pr[0]
      ? { ...pr[0], updatedAt: asDate(pr[0].updatedAt) }
      : null,
    blogPosts: posts.map(normalizeBlogPost),
    projects: projects.map(normalizeProject),
  };
});

export type { PersonaKey };
