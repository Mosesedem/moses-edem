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

Content is stored in `.data/cms.json` (writable via admin). Seed regenerates it with `pnpm db:seed`.

## Admin

- URL: `/admin` (login at `/admin/login`)
- Password: `ADMIN_PASSWORD` env (default for local: `moses-admin-change-me`)
- Manage personas, content blocks, blog posts, and profile

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
