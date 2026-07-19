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

function defaultSnapshot(): CmsSnapshot {
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

export async function readCmsStore(): Promise<CmsSnapshot> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as CmsSnapshot & { projects?: unknown };
    const snap = revive(parsed);
    // Migrate older cms.json files missing projects
    if (!parsed.projects) {
      await writeCmsStore(snap);
    }
    return snap;
  } catch {
    const snap = defaultSnapshot();
    await writeCmsStore(snap);
    return snap;
  }
}

export async function writeCmsStore(snapshot: CmsSnapshot): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(snapshot, null, 2), "utf8");
}

export async function updateCmsStore(
  mutator: (snap: CmsSnapshot) => CmsSnapshot | Promise<CmsSnapshot>
): Promise<CmsSnapshot> {
  const current = await readCmsStore();
  const next = await mutator(current);
  await writeCmsStore(next);
  return next;
}
