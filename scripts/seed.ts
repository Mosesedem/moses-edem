import "dotenv/config";
import { writeCmsStore } from "../lib/cms-store";
import {
  seedBlocks,
  seedBlogPosts,
  seedPersonas,
  seedProfile,
} from "../lib/seed-data";
import { seedProjects } from "../lib/seed-projects";

async function main() {
  console.log("Writing .data/cms.json from seed data...");
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
  console.log("Seed complete (file CMS).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
