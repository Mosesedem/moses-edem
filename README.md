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
pnpm dev
```

Open [http://localhost:18](http://localhost:18).

Without MySQL, the app serves seed data from `lib/seed-data.ts` so first paint still works.

## Database (optional but recommended)

```bash
cp .env.example .env
pnpm db:up          # MySQL via Docker
pnpm db:push        # apply schema
pnpm db:seed        # load personas, blocks, profile
```

`DATABASE_URL` must stay server-only (never `NEXT_PUBLIC_`).

## Routes

- `/` — persona picker
- `/employer`, `/investor`, `/romantic`, `/academic`, `/visitor` — persona pages

## Design

Neutral palette, single accent, hairline borders, monospace labels — better-auth pattern, not the brand.
