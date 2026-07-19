import { asc, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import {
  contentBlocks,
  personas,
  profile,
  type ContentBlock,
  type Persona,
  type PersonaKey,
  type Profile,
  isPersonaKey,
} from "@/lib/schema";
import {
  seedBlocks,
  seedPersonas,
  seedProfile,
  type SeedBlock,
  type SeedPersona,
} from "@/lib/seed-data";

function toPersona(row: SeedPersona): Persona {
  return {
    id: row.id,
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
  };
}

function toBlock(row: SeedBlock): ContentBlock {
  return {
    id: row.id,
    personaKey: row.personaKey,
    type: row.type,
    title: row.title,
    body: row.body,
    iconName: row.iconName,
    href: row.href,
    metadata: row.metadata,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
  };
}

function toProfile(row: typeof seedProfile): Profile {
  return {
    id: row.id,
    fullName: row.fullName,
    location: row.location,
    email: row.email,
    githubUrl: row.githubUrl,
    linkedinUrl: row.linkedinUrl,
    resumeUrl: row.resumeUrl,
    updatedAt: null,
  };
}

async function withDbFallback<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!isDatabaseConfigured()) return fallback();
  try {
    return await fn();
  } catch {
    return fallback();
  }
}

export async function getAllPersonas(): Promise<Persona[]> {
  return withDbFallback(
    async () => {
      const rows = await getDb()
        .select()
        .from(personas)
        .where(eq(personas.isActive, true))
        .orderBy(asc(personas.sortOrder));
      return rows.length > 0 ? rows : seedPersonas.map(toPersona);
    },
    () => seedPersonas.map(toPersona)
  );
}

export async function getPersona(key: string): Promise<{
  persona: Persona;
  blocks: ContentBlock[];
} | null> {
  if (!isPersonaKey(key)) return null;

  return withDbFallback(
    async () => {
      const [persona] = await getDb()
        .select()
        .from(personas)
        .where(eq(personas.key, key))
        .limit(1);

      if (!persona) {
        const seed = seedPersonas.find((p) => p.key === key);
        if (!seed) return null;
        const blocks = seedBlocks
          .filter((b) => b.personaKey === key && b.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(toBlock);
        return { persona: toPersona(seed), blocks };
      }

      const blocks = await getDb()
        .select()
        .from(contentBlocks)
        .where(eq(contentBlocks.personaKey, key))
        .orderBy(asc(contentBlocks.sortOrder));

      const active = blocks.filter((b) => b.isActive !== false);
      return {
        persona,
        blocks:
          active.length > 0
            ? active
            : seedBlocks
                .filter((b) => b.personaKey === key)
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(toBlock),
      };
    },
    () => {
      const seed = seedPersonas.find((p) => p.key === key);
      if (!seed) return null;
      const blocks = seedBlocks
        .filter((b) => b.personaKey === key && b.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(toBlock);
      return { persona: toPersona(seed), blocks };
    }
  );
}

export async function getProfile(): Promise<Profile> {
  return withDbFallback(
    async () => {
      const [row] = await getDb().select().from(profile).limit(1);
      return row ?? toProfile(seedProfile);
    },
    () => toProfile(seedProfile)
  );
}

export type { PersonaKey };
