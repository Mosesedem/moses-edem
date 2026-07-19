import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";

export const personas = mysqlTable("personas", {
  id: varchar("id", { length: 36 }).primaryKey(),
  key: varchar("key", { length: 32 }).notNull().unique(),
  label: varchar("label", { length: 64 }).notNull(),
  tagline: varchar("tagline", { length: 160 }),
  heroHeading: varchar("hero_heading", { length: 160 }),
  heroBody: text("hero_body"),
  ctaLabel: varchar("cta_label", { length: 64 }),
  ctaHref: varchar("cta_href", { length: 255 }),
  iconName: varchar("icon_name", { length: 32 }).notNull(),
  sortOrder: int("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const contentBlocks = mysqlTable("content_blocks", {
  id: varchar("id", { length: 36 }).primaryKey(),
  personaKey: varchar("persona_key", { length: 32 }).notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  title: varchar("title", { length: 160 }),
  body: text("body"),
  iconName: varchar("icon_name", { length: 32 }),
  href: varchar("href", { length: 255 }),
  metadata: json("metadata"),
  sortOrder: int("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const profile = mysqlTable("profile", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }),
  email: varchar("email", { length: 160 }),
  githubUrl: varchar("github_url", { length: 255 }),
  linkedinUrl: varchar("linkedin_url", { length: 255 }),
  resumeUrl: varchar("resume_url", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Persona = typeof personas.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type Profile = typeof profile.$inferSelect;

export const PERSONA_KEYS = [
  "employer",
  "investor",
  "romantic",
  "academic",
  "visitor",
] as const;

export type PersonaKey = (typeof PERSONA_KEYS)[number];

export function isPersonaKey(value: string): value is PersonaKey {
  return (PERSONA_KEYS as readonly string[]).includes(value);
}
