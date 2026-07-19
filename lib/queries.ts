import { cache } from "react";
import { unstable_cache } from "next/cache";
import { asc, eq, and } from "drizzle-orm";
import { defaultSnapshot, readCmsStore } from "@/lib/cms-store";
import { getDb, isDatabaseConfigured } from "@/lib/db";
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

/** Fail over to file/seed quickly — don't block the page for a cold Neon wake. */
const DB_TIMEOUT_MS = 2_500;
/** Public pages revalidate this often; admin writes call revalidateTag("cms"). */
const PUBLIC_REVALIDATE_SECONDS = 45;

export const CMS_CACHE_TAG = "cms";

function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Postgres timeout after ${DB_TIMEOUT_MS}ms (${label})`));
    }, DB_TIMEOUT_MS);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

async function withDbFallback<T>(
  label: string,
  dbFn: () => Promise<T>,
  fileFn: () => Promise<T> | T
): Promise<T> {
  const runFile = async (): Promise<T> => {
    try {
      return await fileFn();
    } catch (fallbackErr) {
      console.error(
        `[queries] CMS fallback failed (${label}):`,
        fallbackErr instanceof Error ? fallbackErr.message : fallbackErr
      );
      return fileFnFromSnapshot(label) as T;
    }
  };

  if (!isDatabaseConfigured()) {
    return runFile();
  }

  try {
    return await withTimeout(dbFn(), label);
  } catch (err) {
    console.error(
      `[queries] Postgres failed (${label}), falling back to seed/file CMS:`,
      err instanceof Error ? err.message : err
    );
    return runFile();
  }
}

function fileFnFromSnapshot(label: string): unknown {
  const snap = defaultSnapshot();
  switch (label) {
    case "getAllPersonas":
      return snap.personas.filter((p) => p.isActive !== false);
    case "getProfile":
      return snap.profile;
    case "getPublishedPosts":
    case "getAllPostsAdmin":
      return snap.blogPosts.filter((p) =>
        label === "getPublishedPosts" ? p.published : true
      );
    case "getProjects":
    case "getAllProjectsAdmin":
      return (snap.projects ?? []).filter((p) =>
        label === "getProjects" ? p.isActive !== false : true
      );
    case "getPersona":
    case "getProjectBySlug":
    case "getPostBySlug":
      return null;
    case "getCmsSnapshot":
      return snap;
    default:
      return snap;
  }
}

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

// ─── Core fetchers (no React cache / no ISR) ─────────────────────────────────

async function fetchAllPersonas(): Promise<Persona[]> {
  return withDbFallback(
    "getAllPersonas",
    async () => {
      const rows = await getDb()
        .select()
        .from(personas)
        .where(eq(personas.isActive, true))
        .orderBy(asc(personas.sortOrder));
      if (rows.length === 0) {
        const snap = await readCmsStore();
        return snap.personas
          .filter((p) => p.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      }
      return rows;
    },
    async () => {
      const snap = await readCmsStore();
      return snap.personas
        .filter((p) => p.isActive !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }
  );
}

async function fetchProjects(): Promise<PortfolioProject[]> {
  return withDbFallback(
    "getProjects",
    async () => {
      const rows = await getDb()
        .select()
        .from(portfolioProjects)
        .where(eq(portfolioProjects.isActive, true))
        .orderBy(asc(portfolioProjects.sortOrder));
      if (rows.length === 0) {
        const snap = await readCmsStore();
        return (snap.projects ?? [])
          .filter((p) => p.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map(normalizeProject);
      }
      return rows.map(normalizeProject);
    },
    async () => {
      const snap = await readCmsStore();
      return (snap.projects ?? [])
        .filter((p) => p.isActive !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map(normalizeProject);
    }
  );
}

async function fetchPersona(
  key: string
): Promise<{ persona: Persona; blocks: ContentBlock[] } | null> {
  if (!isPersonaKey(key)) return null;

  return withDbFallback(
    "getPersona",
    async () => {
      // Parallel: persona row + blocks for this key
      const [[persona], blocks] = await Promise.all([
        getDb().select().from(personas).where(eq(personas.key, key)).limit(1),
        getDb()
          .select()
          .from(contentBlocks)
          .where(eq(contentBlocks.personaKey, key))
          .orderBy(asc(contentBlocks.sortOrder)),
      ]);

      if (!persona) {
        const snap = await readCmsStore();
        const p = snap.personas.find((x) => x.key === key);
        if (!p) return null;
        const seedBlocks = snap.blocks
          .filter((b) => b.personaKey === key && b.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        return { persona: p, blocks: seedBlocks };
      }

      const active = blocks.filter((b) => b.isActive !== false);
      if (active.length === 0) {
        const snap = await readCmsStore();
        const seedBlocks = snap.blocks
          .filter((b) => b.personaKey === key && b.isActive !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        return { persona, blocks: seedBlocks };
      }

      return { persona, blocks: active };
    },
    async () => {
      const snap = await readCmsStore();
      const persona = snap.personas.find((p) => p.key === key);
      if (!persona) return null;
      const blocks = snap.blocks
        .filter((b) => b.personaKey === key && b.isActive !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      return { persona, blocks };
    }
  );
}

async function fetchProfile(): Promise<Profile> {
  return withDbFallback(
    "getProfile",
    async () => {
      const [row] = await getDb().select().from(profile).limit(1);
      if (row) {
        return {
          ...row,
          fullName: row.fullName || "Moses Jacob Edem",
          updatedAt: asDate(row.updatedAt),
        };
      }
      const snap = await readCmsStore();
      return snap.profile;
    },
    async () => {
      const snap = await readCmsStore();
      return snap.profile;
    }
  );
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  return withDbFallback(
    "getPublishedPosts",
    async () => {
      const rows = await getDb()
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, true));
      if (rows.length === 0) {
        const snap = await readCmsStore();
        return snap.blogPosts
          .filter((p) => p.published)
          .map(normalizeBlogPost)
          .sort((a, b) => {
            const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
            const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
            return tb - ta;
          });
      }
      return rows
        .map(normalizeBlogPost)
        .sort((a, b) => {
          const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
          const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
          return tb - ta;
        });
    },
    async () => {
      const snap = await readCmsStore();
      return snap.blogPosts
        .filter((p) => p.published)
        .map(normalizeBlogPost)
        .sort((a, b) => {
          const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
          const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
          return tb - ta;
        });
    }
  );
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  return withDbFallback(
    "getPostBySlug",
    async () => {
      const [row] = await getDb()
        .select()
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
        .limit(1);
      if (row) return normalizeBlogPost(row);
      const snap = await readCmsStore();
      const found =
        snap.blogPosts.find((p) => p.slug === slug && p.published) ?? null;
      return found ? normalizeBlogPost(found) : null;
    },
    async () => {
      const snap = await readCmsStore();
      const found =
        snap.blogPosts.find((p) => p.slug === slug && p.published) ?? null;
      return found ? normalizeBlogPost(found) : null;
    }
  );
}

async function fetchCmsSnapshot() {
  return withDbFallback(
    "getCmsSnapshot",
    async () => {
      const db = getDb();
      const [p, b, pr, posts, projects] = await Promise.all([
        db.select().from(personas).orderBy(asc(personas.sortOrder)),
        db.select().from(contentBlocks).orderBy(asc(contentBlocks.sortOrder)),
        db.select().from(profile).limit(1),
        db.select().from(blogPosts),
        db
          .select()
          .from(portfolioProjects)
          .orderBy(asc(portfolioProjects.sortOrder)),
      ]);
      if (
        p.length === 0 &&
        b.length === 0 &&
        posts.length === 0 &&
        projects.length === 0 &&
        !pr[0]
      ) {
        return readCmsStore();
      }
      const snap = await readCmsStore();
      return {
        personas: p.length ? p : snap.personas,
        blocks: b.length ? b : snap.blocks,
        profile: pr[0]
          ? { ...pr[0], updatedAt: asDate(pr[0].updatedAt) }
          : snap.profile,
        blogPosts: posts.length
          ? posts.map(normalizeBlogPost)
          : snap.blogPosts,
        projects: projects.length
          ? projects.map(normalizeProject)
          : snap.projects,
      };
    },
    () => readCmsStore()
  );
}

// ─── Public API: request memoization + short ISR cache ───────────────────────

/** Active personas for picker / nav. Cached across requests. */
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
      return withDbFallback(
        "getProjectBySlug",
        async () => {
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
          if (row) return normalizeProject(row);
          const snap = await readCmsStore();
          const found =
            (snap.projects ?? []).find(
              (p) => p.slug === slug && p.isActive !== false
            ) ?? null;
          return found ? normalizeProject(found) : null;
        },
        async () => {
          const snap = await readCmsStore();
          const found =
            (snap.projects ?? []).find(
              (p) => p.slug === slug && p.isActive !== false
            ) ?? null;
          return found ? normalizeProject(found) : null;
        }
      );
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

// ─── Admin: request-memoized only (always fresh after navigation) ────────────

export const getAllProjectsAdmin = cache(
  async (): Promise<PortfolioProject[]> => {
    return withDbFallback(
      "getAllProjectsAdmin",
      async () => {
        const rows = await getDb()
          .select()
          .from(portfolioProjects)
          .orderBy(asc(portfolioProjects.sortOrder));
        if (rows.length === 0) {
          const snap = await readCmsStore();
          return [...(snap.projects ?? [])]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map(normalizeProject);
        }
        return rows.map(normalizeProject);
      },
      async () => {
        const snap = await readCmsStore();
        return [...(snap.projects ?? [])]
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map(normalizeProject);
      }
    );
  }
);

export const getAllPostsAdmin = cache(async (): Promise<BlogPost[]> => {
  return withDbFallback(
    "getAllPostsAdmin",
    async () => {
      const rows = await getDb().select().from(blogPosts);
      if (rows.length === 0) {
        const snap = await readCmsStore();
        return [...snap.blogPosts]
          .map(normalizeBlogPost)
          .sort((a, b) => {
            const ta = a.updatedAt ? a.updatedAt.getTime() : 0;
            const tb = b.updatedAt ? b.updatedAt.getTime() : 0;
            return tb - ta;
          });
      }
      return rows
        .map(normalizeBlogPost)
        .sort((a, b) => {
          const ta = a.updatedAt ? a.updatedAt.getTime() : 0;
          const tb = b.updatedAt ? b.updatedAt.getTime() : 0;
          return tb - ta;
        });
    },
    async () => {
      const snap = await readCmsStore();
      return [...snap.blogPosts]
        .map(normalizeBlogPost)
        .sort((a, b) => {
          const ta = a.updatedAt ? a.updatedAt.getTime() : 0;
          const tb = b.updatedAt ? b.updatedAt.getTime() : 0;
          return tb - ta;
        });
    }
  );
});

/** Full CMS snapshot for admin dashboard (not ISR-cached). */
export const getCmsSnapshot = cache(async () => fetchCmsSnapshot());

export type { PersonaKey };
