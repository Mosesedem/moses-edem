import {
  pgTable,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const personas = pgTable("personas", {
  id: varchar("id", { length: 36 }).primaryKey(),
  key: varchar("key", { length: 32 }).notNull().unique(),
  label: varchar("label", { length: 64 }).notNull(),
  tagline: varchar("tagline", { length: 160 }),
  heroHeading: varchar("hero_heading", { length: 160 }),
  heroBody: text("hero_body"),
  ctaLabel: varchar("cta_label", { length: 64 }),
  ctaHref: varchar("cta_href", { length: 255 }),
  iconName: varchar("icon_name", { length: 32 }).notNull(),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const contentBlocks = pgTable("content_blocks", {
  id: varchar("id", { length: 36 }).primaryKey(),
  personaKey: varchar("persona_key", { length: 32 }).notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  title: varchar("title", { length: 160 }),
  body: text("body"),
  iconName: varchar("icon_name", { length: 32 }),
  href: varchar("href", { length: 255 }),
  metadata: jsonb("metadata"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const profile = pgTable("profile", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }),
  email: varchar("email", { length: 160 }),
  githubUrl: varchar("github_url", { length: 255 }),
  linkedinUrl: varchar("linkedin_url", { length: 255 }),
  resumeUrl: varchar("resume_url", { length: 255 }),
  phone: varchar("phone", { length: 40 }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  excerpt: varchar("excerpt", { length: 400 }),
  body: text("body").notNull(),
  coverImage: varchar("cover_image", { length: 255 }),
  tags: jsonb("tags"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  category: varchar("category", { length: 80 }),
  iconName: varchar("icon_name", { length: 32 }),
  href: varchar("href", { length: 255 }),
  tech: jsonb("tech"),
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  /** Per-lens copy: { employer: { summary, body, metric }, ... } */
  lens: jsonb("lens").notNull(),
});

export type Persona = typeof personas.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type Profile = typeof profile.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;

export const PERSONA_KEYS = [
  "employer",
  "investor",
  "romantic",
  "academic",
  "visitor",
] as const;

export type PersonaKey = (typeof PERSONA_KEYS)[number];

export type ProjectLensCopy = {
  summary: string;
  body: string;
  metric?: string;
};

export type ProjectLensMap = Partial<Record<PersonaKey, ProjectLensCopy>>;

export function isPersonaKey(value: string): value is PersonaKey {
  return (PERSONA_KEYS as readonly string[]).includes(value);
}

export function getProjectLensCopy(
  project: PortfolioProject,
  lens: PersonaKey
): ProjectLensCopy {
  const map = (project.lens ?? {}) as ProjectLensMap;
  const copy =
    map[lens] ??
    map.visitor ??
    (Object.values(map).find(Boolean) as ProjectLensCopy | undefined) ??
    null;
  if (copy) return copy;
  return {
    summary: project.title,
    body: project.category ?? "",
  };
}
