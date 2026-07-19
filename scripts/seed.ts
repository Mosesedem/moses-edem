import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { Pool } from "pg";
import { writeCmsStore } from "../lib/cms-store";
import {
  blogPosts,
  contentBlocks,
  personas,
  portfolioProjects,
  profile,
} from "../lib/schema";
import {
  seedBlocks,
  seedBlogPosts,
  seedPersonas,
  seedProfile,
} from "../lib/seed-data";
import { seedProjects } from "../lib/seed-projects";

async function seedFileStore() {
  console.log("Writing .data/cms.json ...");
  await writeCmsStore({
    personas: seedPersonas,
    blocks: seedBlocks,
    profile: {
      ...seedProfile,
      updatedAt: null,
    },
    blogPosts: seedBlogPosts.map((p) => ({
      ...p,
      publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
      createdAt: p.createdAt ? new Date(p.createdAt) : null,
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
    })),
    projects: seedProjects,
  });
  console.log("File CMS seed complete.");
}

async function seedPostgres() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.log("DATABASE_URL not set — skipping Postgres seed.");
    return;
  }

  console.log("Connecting to Postgres ...");
  const isLocal =
    /localhost|127\.0\.0\.1/.test(url) || url.includes("sslmode=disable");
  const pool = new Pool({
    connectionString: url,
    max: 3,
    ssl: isLocal ? false : undefined,
  });
  const db = drizzle(pool);

  try {
    await pool.query("SELECT 1");

    console.log("Seeding profile ...");
    await db
      .insert(profile)
      .values({
        id: seedProfile.id,
        fullName: seedProfile.fullName,
        location: seedProfile.location,
        email: seedProfile.email,
        githubUrl: seedProfile.githubUrl,
        linkedinUrl: seedProfile.linkedinUrl,
        resumeUrl: seedProfile.resumeUrl,
        phone: seedProfile.phone,
      })
      .onConflictDoUpdate({
        target: profile.id,
        set: {
          fullName: seedProfile.fullName,
          location: seedProfile.location,
          email: seedProfile.email,
          githubUrl: seedProfile.githubUrl,
          linkedinUrl: seedProfile.linkedinUrl,
          resumeUrl: seedProfile.resumeUrl,
          phone: seedProfile.phone,
        },
      });

    console.log(`Seeding ${seedPersonas.length} personas ...`);
    for (const row of seedPersonas) {
      await db
        .insert(personas)
        .values(row)
        .onConflictDoUpdate({
          target: personas.id,
          set: {
            label: row.label,
            tagline: row.tagline,
            heroHeading: row.heroHeading,
            heroBody: row.heroBody,
            ctaLabel: row.ctaLabel,
            ctaHref: row.ctaHref,
            iconName: row.iconName,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
          },
        });
    }

    console.log(`Seeding ${seedBlocks.length} content blocks ...`);
    for (const row of seedBlocks) {
      await db
        .insert(contentBlocks)
        .values(row)
        .onConflictDoUpdate({
          target: contentBlocks.id,
          set: {
            personaKey: row.personaKey,
            type: row.type,
            title: row.title,
            body: row.body,
            iconName: row.iconName,
            href: row.href,
            metadata: row.metadata,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
          },
        });
    }

    console.log(`Seeding ${seedProjects.length} portfolio projects ...`);
    for (const row of seedProjects) {
      await db
        .insert(portfolioProjects)
        .values({
          id: row.id,
          slug: row.slug,
          title: row.title,
          category: row.category,
          iconName: row.iconName,
          href: row.href,
          tech: row.tech,
          featured: row.featured,
          sortOrder: row.sortOrder,
          isActive: row.isActive,
          lens: row.lens,
        })
        .onConflictDoUpdate({
          target: portfolioProjects.id,
          set: {
            slug: row.slug,
            title: row.title,
            category: row.category,
            iconName: row.iconName,
            href: row.href,
            tech: row.tech,
            featured: row.featured,
            sortOrder: row.sortOrder,
            isActive: row.isActive,
            lens: row.lens,
          },
        });
    }

    console.log(`Seeding ${seedBlogPosts.length} blog posts ...`);
    for (const row of seedBlogPosts) {
      await db
        .insert(blogPosts)
        .values({
          id: row.id,
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          body: row.body,
          coverImage: row.coverImage,
          tags: row.tags,
          published: row.published,
          publishedAt: row.publishedAt ? new Date(row.publishedAt) : null,
          createdAt: row.createdAt ? new Date(row.createdAt) : null,
          updatedAt: row.updatedAt ? new Date(row.updatedAt) : null,
        })
        .onConflictDoUpdate({
          target: blogPosts.id,
          set: {
            slug: row.slug,
            title: row.title,
            excerpt: row.excerpt,
            body: row.body,
            coverImage: row.coverImage,
            tags: row.tags,
            published: row.published,
            publishedAt: row.publishedAt ? new Date(row.publishedAt) : null,
          },
        });
    }

    const counts = await db.execute(sql`
      SELECT
        (SELECT COUNT(*)::int FROM personas) AS personas,
        (SELECT COUNT(*)::int FROM content_blocks) AS content_blocks,
        (SELECT COUNT(*)::int FROM portfolio_projects) AS portfolio_projects,
        (SELECT COUNT(*)::int FROM blog_posts) AS blog_posts,
        (SELECT COUNT(*)::int FROM profile) AS profile
    `);
    console.log("Postgres row counts:", counts.rows?.[0] ?? counts);
    console.log("Postgres seed complete.");
  } finally {
    await pool.end();
  }
}

async function main() {
  await seedFileStore();

  if (!process.env.DATABASE_URL?.trim()) {
    console.log(
      "Tip: set DATABASE_URL and run `pnpm db:push` then `pnpm db:seed` to load Postgres."
    );
    return;
  }

  try {
    await seedPostgres();
  } catch (err) {
    console.error("\nPostgres seed failed.");
    console.error(err);
    console.error(
      "\nIf tables are missing, run: pnpm db:push\nThen: pnpm db:seed\n"
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
