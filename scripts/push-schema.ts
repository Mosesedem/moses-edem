/**
 * Non-interactive schema ensure for Postgres (CI / agent shells).
 * Set DROP_SCHEMA=1 (used by db:reset) to drop and recreate public tables.
 */
import "dotenv/config";
import { Pool } from "pg";

const DROP = process.env.DROP_SCHEMA === "1" || process.env.DROP_SCHEMA === "true";

const dropSql = `
DROP TABLE IF EXISTS portfolio_projects CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS content_blocks CASCADE;
DROP TABLE IF EXISTS personas CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
`;

const createSql = `
CREATE TABLE IF NOT EXISTS profile (
  id varchar(36) PRIMARY KEY,
  full_name varchar(120) NOT NULL,
  location varchar(120),
  email varchar(160),
  github_url varchar(255),
  linkedin_url varchar(255),
  resume_url varchar(255),
  phone varchar(40),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS personas (
  id varchar(36) PRIMARY KEY,
  key varchar(32) NOT NULL UNIQUE,
  label varchar(64) NOT NULL,
  tagline varchar(160),
  hero_heading varchar(160),
  hero_body text,
  cta_label varchar(64),
  cta_href varchar(255),
  icon_name varchar(32) NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS content_blocks (
  id varchar(36) PRIMARY KEY,
  persona_key varchar(32) NOT NULL,
  type varchar(32) NOT NULL,
  title varchar(160),
  body text,
  icon_name varchar(32),
  href varchar(255),
  metadata jsonb,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id varchar(36) PRIMARY KEY,
  slug varchar(160) NOT NULL UNIQUE,
  title varchar(200) NOT NULL,
  excerpt varchar(400),
  body text NOT NULL,
  cover_image varchar(255),
  tags jsonb,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id varchar(36) PRIMARY KEY,
  slug varchar(160) NOT NULL UNIQUE,
  title varchar(160) NOT NULL,
  category varchar(80),
  icon_name varchar(32),
  href varchar(255),
  tech jsonb,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  lens jsonb NOT NULL
);

CREATE INDEX IF NOT EXISTS content_blocks_persona_key_idx ON content_blocks (persona_key);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts (published);
CREATE INDEX IF NOT EXISTS portfolio_projects_active_idx ON portfolio_projects (is_active);
`;

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }
  const pool = new Pool({ connectionString: url, ssl: false });
  try {
    if (DROP) {
      console.log("Dropping existing CMS tables ...");
      await pool.query(dropSql);
    }
    await pool.query(createSql);
    const { rows } = await pool.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`
    );
    console.log(
      "Tables ready:",
      rows.map((r) => r.tablename).join(", ") || "(none)"
    );
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
