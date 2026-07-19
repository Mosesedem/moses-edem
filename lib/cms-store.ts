import { promises as fs } from "fs";
import path from "path";
import type {
  BlogPost,
  ContentBlock,
  Persona,
  PortfolioProject,
  Profile,
} from "@/lib/schema";
import {
  seedBlocks,
  seedBlogPosts,
  seedPersonas,
  seedProfile,
  type SeedBlock,
  type SeedBlogPost,
  type SeedPersona,
} from "@/lib/seed-data";
import { seedProjects, type SeedProject } from "@/lib/seed-projects";

export type CmsSnapshot = {
  personas: Persona[];
  blocks: ContentBlock[];
  profile: Profile;
  blogPosts: BlogPost[];
  projects: PortfolioProject[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "cms.json");

/** In-memory fallback when disk is read-only (e.g. Vercel). */
let memorySnapshot: CmsSnapshot | null = null;

function toPersona(row: SeedPersona): Persona {
  return { ...row };
}

function toBlock(row: SeedBlock): ContentBlock {
  return { ...row };
}

function toProfile(): Profile {
  return {
    ...seedProfile,
    updatedAt: null,
  };
}

function toBlog(row: SeedBlogPost): BlogPost {
  return {
    ...row,
    publishedAt: row.publishedAt ? new Date(row.publishedAt) : null,
    createdAt: row.createdAt ? new Date(row.createdAt) : null,
    updatedAt: row.updatedAt ? new Date(row.updatedAt) : null,
  };
}

function toProject(row: SeedProject): PortfolioProject {
  return { ...row };
}

export function defaultSnapshot(): CmsSnapshot {
  return {
    personas: seedPersonas.map(toPersona),
    blocks: seedBlocks.map(toBlock),
    profile: toProfile(),
    blogPosts: seedBlogPosts.map(toBlog),
    projects: seedProjects.map(toProject),
  };
}

function revive(raw: CmsSnapshot): CmsSnapshot {
  const defaults = defaultSnapshot();
  return {
    personas: raw.personas ?? defaults.personas,
    blocks: raw.blocks ?? defaults.blocks,
    profile: raw.profile ?? defaults.profile,
    blogPosts: (raw.blogPosts ?? []).map((p) => ({
      ...p,
      publishedAt: p.publishedAt
        ? new Date(p.publishedAt as unknown as string)
        : null,
      createdAt: p.createdAt
        ? new Date(p.createdAt as unknown as string)
        : null,
      updatedAt: p.updatedAt
        ? new Date(p.updatedAt as unknown as string)
        : null,
    })),
    projects:
      raw.projects && raw.projects.length > 0
        ? raw.projects
        : defaults.projects,
  };
}

/**
 * Read CMS data. Never throws because of a read-only filesystem.
 * Order: memory → disk → built-in seed.
 */
export async function readCmsStore(): Promise<CmsSnapshot> {
  if (memorySnapshot) {
    return revive(memorySnapshot);
  }

  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as CmsSnapshot & { projects?: unknown };
    const snap = revive(parsed);
    memorySnapshot = snap;
    return snap;
  } catch {
    // Missing file or unreadable path (common on serverless deploys).
    const snap = defaultSnapshot();
    memorySnapshot = snap;
    // Best-effort persist for local/dev only — never fail the request.
    void writeCmsStore(snap).catch(() => undefined);
    return snap;
  }
}

/**
 * Persist snapshot. On serverless (read-only FS) keeps memory only and
 * does not throw so public pages still work. Callers that need durable
 * storage should also write Postgres via persistCms.
 */
export async function writeCmsStore(snapshot: CmsSnapshot): Promise<void> {
  memorySnapshot = revive(snapshot);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      STORE_PATH,
      JSON.stringify(memorySnapshot, null, 2),
      "utf8"
    );
  } catch (err) {
    // Vercel / Lambda / read-only deploy: disk write is expected to fail.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[cms-store] disk write skipped/failed; using in-memory snapshot:",
        err instanceof Error ? err.message : err
      );
    }
  }
}

export async function updateCmsStore(
  mutator: (snap: CmsSnapshot) => CmsSnapshot | Promise<CmsSnapshot>
): Promise<CmsSnapshot> {
  const current = await readCmsStore();
  const next = revive(await mutator(current));
  await writeCmsStore(next);
  return next;
}
