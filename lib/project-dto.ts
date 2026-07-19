import type { PortfolioProject } from "@/lib/schema";

export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  iconName: string | null;
  href: string | null;
  tech: string[];
  featured: boolean;
  sortOrder: number | null;
  isActive: boolean | null;
  lens: PortfolioProject["lens"];
};

/** Serialize CMS projects for client components (server-safe). */
export function toProjectDTO(p: PortfolioProject): ProjectDTO {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category ?? null,
    iconName: p.iconName ?? null,
    href: p.href ?? null,
    tech: Array.isArray(p.tech)
      ? (p.tech as string[]).filter((t): t is string => typeof t === "string")
      : [],
    featured: Boolean(p.featured),
    sortOrder: p.sortOrder ?? 0,
    isActive: p.isActive ?? true,
    lens: p.lens,
  };
}
