---
name: mosesedem-portfolio
description: >
  Build and maintain mosesedem.me — a persona-adaptive portfolio for Moses Edem
  (Backend Engineer, Founder, Uyo, Akwa Ibom, Nigeria) where visitors pick an
  audience lens (Employer/Recruiter, Investor/Partner, Romantic Interest,
  Academic/Research, Casual Visitor) and the site reshapes its content around
  that lens. Use this skill whenever working on this repo — new pages, persona
  content, theming, icons, or the PostgreSQL content layer. Triggers: /mosesedem-portfolio,
  persona page, persona picker, content blocks, better-auth design, drizzle schema,
  theme toggle, lucide icons.
---

# mosesedem.me — Persona-Adaptive Portfolio

## 1. Concept

One person, five audiences. Instead of a single static "About Me," the site asks
the visitor who they are and re-renders the same underlying profile through that
lens. The five personas:

| Persona key | Label                  | Intent                                            |
|-------------|-------------------------|----------------------------------------------------|
| `employer`  | Employer / Recruiter    | Skills, experience, availability, resume, contact  |
| `investor`  | Investor / Partner      | Ventures, traction, thesis, deck, pitch contact    |
| `romantic`  | Romantic Interest       | Personality, interests, photos, light/playful tone |
| `academic`  | Academic / Research     | Papers, research interests, talks, citations       |
| `visitor`   | Casual Visitor          | General intro, blog, projects, links               |

The persona picker is the front door. Everything after it — nav labels, hero
copy, which content blocks render, CTA — is driven by the selected persona.

**Hard rule: no emoji anywhere, ever — not in the picker, not in section
headers, not in seed data.** Every glyph is an SVG icon (icon pack below).

## 2. Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS + CSS variables for theming (see §3.1)
- **Icons:** `lucide-react` (primary). Fall back to hand-authored inline SVG
  only for anything Lucide doesn't cover (e.g. a custom logomark). Never use
  a font-icon set that renders as colored emoji glyphs.
- **Database:** PostgreSQL (see §5 for schema)
- **ORM:** Drizzle ORM (`drizzle-orm` + `pg`) — lightweight, SQL-shaped,
  plays well with serverless Next.js deploys. File/seed CMS is the fallback
  when `DATABASE_URL` is unset.
- **Theme:** `next-themes` with `attribute="class"` and
  `defaultTheme="system"` — see §3.3
- **Fonts:** a geometric sans for UI text + a monospace face for labels,
  badges, code-like accents (mirrors the better-auth reference — see §3)

## 3. Design system — better-auth pattern

Reference: https://better-auth.com. Reproduce the *pattern*, not the literal
branding. Distinctive traits to carry over:

- **Structure over decoration.** README-style page (a big monospace "section
  label" like `# README`, `PRODUCTS`, `RESOURCES`), thin 1px hairline borders
  instead of drop shadows, generous negative space.
- **Neutral base palette.** Near-black / near-white backgrounds, grayscale
  everything by default, a single accent color reserved for interactive
  elements (links, active state, primary buttons, focus rings) — do not let
  the accent bleed into body copy.
- **Monospace accents.** Small caps or monospace type for labels, tags, stat
  numbers, nav breadcrumbs (`01`, `02`... prefixes on feature cards). Body
  copy stays in a clean sans.
- **Card grid for features/sections.** Bordered cards with a numbered or
  icon-led header, one line of description, no more than 2 lines of body text
  per card. This is exactly the shape the 5 personas + project cards should
  take.
- **A visible theme toggle, top-right of the header, every page.**
- **Terminal/code snippet motif.** A styled `<pre>`/code block is a first
  class visual element (better-auth uses `auth.ts`) — this site can reuse
  that motif for a project's stack, or a snippet of Moses's own code, styled
  like a real editor pane (window dots optional, keep them as plain circles
  drawn in CSS, not emoji).

### 3.1 Color tokens (CSS variables, theme-aware)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --border: 0 0% 90%;
  --card: 0 0% 100%;
  --accent: 217 91% 60%;       /* single accent — swap per taste */
  --accent-foreground: 0 0% 100%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 7%;
  --foreground: 0 0% 96%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 60%;
  --border: 0 0% 18%;
  --card: 0 0% 10%;
  --accent: 217 91% 65%;
  --accent-foreground: 0 0% 7%;
}
```

Wire these into `tailwind.config.ts` under `theme.extend.colors` using
`hsl(var(--token))` so every utility (`bg-background`, `text-foreground`,
`border-border`, etc.) is theme-reactive with zero per-component branching.

### 3.2 Typography

- UI / body: `Inter` or `Geist Sans`
- Monospace accents: `Geist Mono` or `JetBrains Mono`
- Load via `next/font` (local or Google) — never render Google Fonts scripts
  by hand.

### 3.3 Auto system theme (implementation)

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// components/theme-provider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

```tsx
// components/theme-toggle.tsx
"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-24" />; // avoid hydration flash

  return (
    <div className="flex items-center gap-1 rounded-md border border-border p-1">
      {OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className={`rounded p-1.5 transition-colors ${
            theme === value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Icon size={16} strokeWidth={1.75} />
        </button>
      ))}
    </div>
  );
}
```

Default is `"system"` — the site should silently follow the OS preference on
first load, no flash of the wrong theme (hence `suppressHydrationWarning` +
the mounted-guard pattern above).

## 4. Icon pack — persona and section icons

Use `lucide-react` exclusively for persona and nav icons. Suggested mapping
(swap freely, but keep the *category*: outline, 1.5–1.75 stroke, no fills):

| Persona    | Icon              |
|------------|-------------------|
| Employer   | `Briefcase`       |
| Investor   | `TrendingUp`      |
| Romantic   | `Heart`           |
| Academic   | `GraduationCap`   |
| Visitor    | `User` / `Compass`|

Other recurring icons: `Sun`/`Moon`/`Monitor` (theme), `ArrowRight` (CTA),
`Github`, `Linkedin`, `Mail`, `MapPin`, `FileText` (resume/CV), `Link2`.

Render icons at 16–24px, `strokeWidth={1.5}` or `1.75`, colored via
`currentColor` so they inherit `text-foreground` / `text-muted-foreground`
automatically in both themes. Never hardcode a hex fill on an icon.

## 5. Data layer — PostgreSQL

All persona-specific copy, projects, and profile facts live in the database,
not hardcoded in components. Pages fetch by persona key via server
components / server actions — no client-side waterfall fetching for
first-paint content. When `DATABASE_URL` is unset, public pages fall back to
the file/seed CMS (`.data/cms.json` / built-in seed).

### 5.1 Schema (Drizzle, `schema.ts`)

```ts
import { pgTable, varchar, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const personas = pgTable("personas", {
  id: varchar("id", { length: 36 }).primaryKey(),
  key: varchar("key", { length: 32 }).notNull().unique(),
  label: varchar("label", { length: 64 }).notNull(),
  // ... hero fields, iconName, sortOrder, isActive
});
```

Use `jsonb` for free-form fields (`metadata`, `tags`, `tech`, `lens`).
Upserts use `.onConflictDoUpdate({ target: table.id, set: { ... } })`.

### 5.2 Fetch pattern (server component)

```ts
// lib/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
export const db = drizzle(pool, { schema });
```

Never expose `DATABASE_URL` or raw query errors to the client. All DB access
happens in server components, route handlers, or server actions.

## 6. Routing / file structure

```
app/
  layout.tsx                 # ThemeProvider, fonts, header w/ ThemeToggle
  page.tsx                   # persona picker (landing)
  [persona]/
    page.tsx                 # persona-specific rendered page, fetches via getPersona(key)
    loading.tsx
    not-found.tsx             # invalid persona key -> back to picker
components/
  theme-provider.tsx
  theme-toggle.tsx
  persona-card.tsx            # picker grid card (icon + label + tagline)
  section-card.tsx            # numbered/bordered content card (better-auth style)
  code-pane.tsx                # styled snippet block for project/stack showcases
lib/
  db.ts
  schema.ts
  queries.ts
  icons.ts                     # string -> Lucide component map, used to render iconName from DB
```

### 6.1 Icon-from-string helper

Since icon choice is stored in MySQL as a string (`iconName`), map it safely:

```ts
// lib/icons.ts
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function resolveIcon(name?: string | null): LucideIcon {
  if (name && name in Icons) return Icons[name as keyof typeof Icons] as LucideIcon;
  return Icons.Circle; // safe fallback, never emoji
}
```

## 7. Persona picker page (landing)

- Full-viewport, centered, five `persona-card`s in a responsive grid
  (1 col mobile, up to 3 wide on desktop).
- Each card: icon (from §4 mapping) top-left in a bordered square, persona
  label, one-line tagline pulled from `personas.tagline`, subtle hover lift
  (`border-accent` on hover, not a shadow bloom).
- Theme toggle lives in a slim header above the grid, present on every route.
- Selecting a card routes to `/[persona-key]` (e.g. `/employer`) — no client
  state needed, the URL is the state, which also makes each lens shareable
  and bookmarkable.

## 8. Non-negotiables checklist

When implementing or reviewing work on this site, enforce every item:

- [ ] Zero emoji anywhere — copy, seed data, code comments in user-facing
      strings, commit messages for content, all excluded.
- [ ] Every icon is a real SVG (Lucide or hand-authored), not a Unicode glyph.
- [ ] Theme defaults to `system`, has manual Light/Dark/System toggle, no
      flash-of-wrong-theme on load.
- [ ] All persona copy and content blocks are DB-driven (PostgreSQL via
      Drizzle, or seed fallback), not hardcoded per-page JSX.
- [ ] Server-side data fetching for first paint; no loading spinners for
      content that could have been fetched server-side.
- [ ] Visual language matches better-auth's pattern: neutral palette + one
      accent, hairline borders, monospace label accents, numbered/bordered
      card grid — not a generic gradient-and-shadow SaaS template.
- [ ] `DATABASE_URL` and any credentials stay server-only (`.env`, never
      `NEXT_PUBLIC_`).

## 9. Agent workflow

When this skill is active, prefer this order of work:

1. **Read existing code** under `app/`, `components/`, `lib/` before inventing new patterns.
2. **Respect the data layer** — persona copy and blocks go through Drizzle queries, not hardcoded JSX.
3. **Match the design system** — hairline borders, monospace labels, single accent, Lucide icons only.
4. **Keep the URL as persona state** — `/employer`, `/investor`, etc.; no client-only persona store for first paint.
5. **Never introduce emoji** in UI, seed data, or user-facing strings.
6. **Theme** — always preserve `ThemeProvider` + `ThemeToggle` on every route.
