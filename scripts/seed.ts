import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { contentBlocks, personas, profile } from "../lib/schema";
import { seedBlocks, seedPersonas, seedProfile } from "../lib/seed-data";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is required to seed the database.");
    process.exit(1);
  }

  const pool = mysql.createPool({ uri: url });
  const db = drizzle(pool);

  console.log("Seeding profile...");
  await db.insert(profile).values(seedProfile).onDuplicateKeyUpdate({
    set: {
      fullName: seedProfile.fullName,
      location: seedProfile.location,
      email: seedProfile.email,
      githubUrl: seedProfile.githubUrl,
      linkedinUrl: seedProfile.linkedinUrl,
      resumeUrl: seedProfile.resumeUrl,
    },
  });

  console.log("Seeding personas...");
  for (const row of seedPersonas) {
    await db.insert(personas).values(row).onDuplicateKeyUpdate({
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

  console.log("Seeding content blocks...");
  for (const row of seedBlocks) {
    await db.insert(contentBlocks).values(row).onDuplicateKeyUpdate({
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

  await pool.end();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
