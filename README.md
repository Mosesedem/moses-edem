# mosesedem.me

Persona-adaptive portfolio for **Moses Edem** (Backend Engineer, Founder, Uyo, Akwa Ibom, Nigeria).

Visitors pick an audience lens; the site reshapes content around that lens.

| Key        | Label               |
|------------|---------------------|
| `employer` | Employer / Recruiter |
| `investor` | Investor / Partner   |
| `romantic` | Romantic Interest    |
| `academic` | Academic / Research  |
| `visitor`  | Casual Visitor       |

## Stack

- **App:** Next.js (App Router) + TypeScript on **Vercel**
- **Database:** **Neon** Postgres via Drizzle ORM
- **Styling:** Tailwind CSS + CSS variables (`next-themes`)
- **Icons:** Lucide (no emoji)
- **Fallback:** built-in seed / `.data/cms.json` when `DATABASE_URL` is unset

## Develop

```bash
pnpm install
cp .env.example .env
# Set DATABASE_URL to your Neon pooled connection string
# Set ADMIN_PASSWORD and GROQ_API_KEY
pnpm db:reset   # create tables + seed Neon + file CMS
pnpm dev
```

Open [http://localhost:18](http://localhost:18).

### Neon + Vercel

1. Create a Neon project and copy the **pooled** `DATABASE_URL` (`…-pooler…?sslmode=require`).
2. Locally and on Vercel, set:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `GROQ_API_KEY` (optional, AI chat)
3. Schema + seed against Neon:

```bash
pnpm db:reset
# or step by step:
pnpm db:push:ci   # non-interactive table ensure
pnpm db:seed
```

4. Deploy the Next.js app to Vercel with the same env vars. No container runtime is required.

### Content storage

1. **PostgreSQL (Neon)** — primary when `DATABASE_URL` is set  
   Tables: `personas`, `content_blocks`, `profile`, `blog_posts`, `portfolio_projects`
2. **File CMS** — `.data/cms.json` (local/admin convenience; Vercel is read-only so production relies on Neon + in-memory/seed fallback)

Public reads prefer Neon, then fall back to seed/file if the DB is unreachable.

## Admin

- URL: `/admin` (login at `/admin/login`)
- Password: `ADMIN_PASSWORD`
- Manage personas, content blocks, projects, blog posts, and profile
- Saves sync to Neon when `DATABASE_URL` is set

## AI chat

Persona pages include **AI Moses** (Groq). Set `GROQ_API_KEY`.

## Routes

- `/` — persona picker
- `/employer` … `/visitor` — persona pages
- `/projects` — portfolio browser
- `/blog`, `/blog/[slug]` — public blog
- `/admin` — CMS dashboard

## Design

Neutral palette, single accent, hairline borders, monospace labels — better-auth pattern, not the brand.
