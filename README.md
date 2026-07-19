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

- Next.js (App Router) + TypeScript
- Tailwind CSS + CSS variables (system / light / dark via `next-themes`)
- Lucide icons (no emoji)
- MySQL + Drizzle ORM (seed fallback when `DATABASE_URL` is unset)

## Develop

```bash
pnpm install
cp .env.example .env   # set ADMIN_PASSWORD, GROQ_API_KEY
pnpm db:seed           # write .data/cms.json from seed
pnpm dev
```

Open [http://localhost:18](http://localhost:18).

### Content storage

1. **File CMS** — `.data/cms.json` (always written by seed/admin; works offline)
2. **MySQL** — when `DATABASE_URL` is set, seed + admin sync into tables:
   - `personas`, `content_blocks`, `profile`, `blog_posts`, `portfolio_projects`

Public reads prefer MySQL when configured, then fall back to the file store.

```bash
# 1) Ensure DATABASE_URL points at a reachable MySQL host
# 2) Create tables
pnpm db:push

# 3) Seed file + MySQL
pnpm db:seed

# Or both:
pnpm db:reset
```

If `db:seed` prints `MySQL seed complete` and row counts, tables are filled.
If it only prints `File CMS seed complete` / `DATABASE_URL not set`, MySQL was skipped.
If it errors with `ENOTFOUND` or connection refused, fix the host/credentials first.

Local Docker MySQL (matches `.env.example`):

```bash
pnpm db:up
# DATABASE_URL=mysql://moses:moses@127.0.0.1:3306/mosesedem
pnpm db:reset
```

## Admin

- URL: `/admin` (login at `/admin/login`)
- Password: `ADMIN_PASSWORD` env (default for local: `moses-admin-change-me`)
- Manage personas, content blocks, projects, blog posts, and profile
- Saves write to `.data/cms.json` and mirror into MySQL when connected

## AI chat

Persona pages include **AI Moses** (Groq). Set `GROQ_API_KEY` in `.env`.

## Routes

- `/` — persona picker
- `/employer` … `/visitor` — persona pages (lens switcher in header)
- `/projects` — all projects; tap opens detail sheet (bottom mobile / side desktop)
- `/blog`, `/blog/[slug]` — public blog
- `/admin` — CMS dashboard (includes Projects with per-lens copy)

## Design

Neutral palette, single accent, hairline borders, monospace labels — better-auth pattern, not the brand.
