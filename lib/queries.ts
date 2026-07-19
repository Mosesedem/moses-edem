import { readCmsStore } from "@/lib/cms-store";
import {
  isPersonaKey,
  type BlogPost,
  type ContentBlock,
  type Persona,
  type PersonaKey,
  type PortfolioProject,
  type Profile,
} from "@/lib/schema";

export async function getAllPersonas(): Promise<Persona[]> {
  const snap = await readCmsStore();
  return snap.personas
    .filter((p) => p.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getProjects(): Promise<PortfolioProject[]> {
  const snap = await readCmsStore();
  return (snap.projects ?? [])
    .filter((p) => p.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  const snap = await readCmsStore();
  return (
    (snap.projects ?? []).find((p) => p.slug === slug && p.isActive !== false) ??
    null
  );
}

export async function getAllProjectsAdmin(): Promise<PortfolioProject[]> {
  const snap = await readCmsStore();
  return [...(snap.projects ?? [])].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );
}

export async function getPersona(key: string): Promise<{
  persona: Persona;
  blocks: ContentBlock[];
} | null> {
  if (!isPersonaKey(key)) return null;
  const snap = await readCmsStore();
  const persona = snap.personas.find((p) => p.key === key);
  if (!persona) return null;
  const blocks = snap.blocks
    .filter((b) => b.personaKey === key && b.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  return { persona, blocks };
}

export async function getProfile(): Promise<Profile> {
  const snap = await readCmsStore();
  return snap.profile;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const snap = await readCmsStore();
  return snap.blogPosts
    .filter((p) => p.published)
    .sort((a, b) => {
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return tb - ta;
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const snap = await readCmsStore();
  return snap.blogPosts.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const snap = await readCmsStore();
  return [...snap.blogPosts].sort((a, b) => {
    const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return tb - ta;
  });
}

export async function getCmsSnapshot() {
  return readCmsStore();
}

export type { PersonaKey };
