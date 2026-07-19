import type { PersonaKey } from "@/lib/schema";

export type SeedPersona = {
  id: string;
  key: PersonaKey;
  label: string;
  tagline: string;
  heroHeading: string;
  heroBody: string;
  ctaLabel: string;
  ctaHref: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
};

export type SeedBlock = {
  id: string;
  personaKey: PersonaKey;
  type: "stat" | "project" | "text" | "link" | "timeline_item" | "section";
  title: string | null;
  body: string | null;
  iconName: string | null;
  href: string | null;
  metadata: Record<string, unknown> | null;
  sortOrder: number;
  isActive: boolean;
};

export type SeedProfile = {
  id: string;
  fullName: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  phone: string;
};

export type SeedBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export const seedProfile: SeedProfile = {
  id: "profile-moses",
  fullName: "Moses Jacob Edem",
  location: "Uyo, Akwa Ibom, Nigeria",
  email: "mosesedem81@gmail.com",
  githubUrl: "https://github.com/mosesedem",
  linkedinUrl: "https://linkedin.com/in/mosesedem",
  resumeUrl: "/cv/moses.pdf",
  phone: "+2349030465501",
};

export const seedPersonas: SeedPersona[] = [
  {
    id: "persona-employer",
    key: "employer",
    label: "Employer / Recruiter",
    tagline: "Skills, experience, availability, resume, contact",
    heroHeading: "Backend Engineer Who Ships Reliable Systems",
    heroBody:
      "2+ years building production APIs and backends in Node.js, PHP/Laravel, and modern TypeScript stacks. I care about clean architecture, uptime, and systems that stay calm under load.",
    ctaLabel: "Download CV",
    ctaHref: "/cv/moses.pdf",
    iconName: "Briefcase",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "persona-investor",
    key: "investor",
    label: "Investor / Partner",
    tagline: "Ventures, traction, thesis, deck, pitch contact",
    heroHeading: "Building Products People Actually Use",
    heroBody:
      "Technical founder energy: fintech rails, consumer apps, healthcare, and developer infrastructure. Looking for partners who care about both product and unit economics.",
    ctaLabel: "View Ventures",
    ctaHref: "#blocks",
    iconName: "TrendingUp",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "persona-romantic",
    key: "romantic",
    label: "Romantic Interest",
    tagline: "Personality, interests, and a light, playful tone",
    heroHeading: "More Than Just Lines Of Code",
    heroBody:
      "I can debug a server and still hold a conversation. Sarcasm, deep talks, good food, and someone who will not ask me to fix their printer on the first date.",
    ctaLabel: "Get to Know Me",
    ctaHref: "#blocks",
    iconName: "Heart",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "persona-academic",
    key: "academic",
    label: "Academic / Research",
    tagline: "Papers, research interests, talks, citations",
    heroHeading: "Systems, Scale, and Applied AI",
    heroBody:
      "Scholar-engineer focus: distributed systems, API design, data, and practical ML. Open to rigorous collaboration and talks.",
    ctaLabel: "View Research",
    ctaHref: "#blocks",
    iconName: "GraduationCap",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "persona-visitor",
    key: "visitor",
    label: "Casual Visitor",
    tagline: "General intro, projects, blog, and links",
    heroHeading: "Moses Jacob Edem",
    heroBody:
      "Backend engineer, founder, and perpetual learner based in Uyo. Building things, learning stuff, and staying hydrated.",
    ctaLabel: "See My Work",
    ctaHref: "#blocks",
    iconName: "Compass",
    sortOrder: 5,
    isActive: true,
  },
];

function block(
  id: string,
  personaKey: PersonaKey,
  type: SeedBlock["type"],
  fields: Partial<Omit<SeedBlock, "id" | "personaKey" | "type" | "isActive">> & {
    sortOrder: number;
  }
): SeedBlock {
  return {
    id,
    personaKey,
    type,
    title: fields.title ?? null,
    body: fields.body ?? null,
    iconName: fields.iconName ?? null,
    href: fields.href ?? null,
    metadata: fields.metadata ?? null,
    sortOrder: fields.sortOrder,
    isActive: true,
  };
}

export const seedBlocks: SeedBlock[] = [
  // ── employer ──────────────────────────────────────────────
  block("emp-stat-1", "employer", "stat", {
    title: "2+ years",
    body: "Professional backend experience",
    iconName: "Server",
    sortOrder: 1,
  }),
  block("emp-stat-2", "employer", "stat", {
    title: "Node + PHP",
    body: "Express, Hono, Laravel, Next.js",
    iconName: "Code2",
    sortOrder: 2,
  }),
  block("emp-stat-3", "employer", "stat", {
    title: "Production",
    body: "Fintech, OTP, VPN, healthcare shipped",
    iconName: "Database",
    sortOrder: 3,
  }),
  block("emp-text-1", "employer", "text", {
    title: "How I Work",
    body: "I specialize in Node.js and PHP backends with PostgreSQL, Redis, and Prisma. I design APIs and services that handle real traffic — payments, OTP delivery, multi-tenant platforms — and I care as much about ops and reliability as about code elegance.",
    iconName: "FileText",
    sortOrder: 10,
  }),
  block("emp-job-1", "employer", "timeline_item", {
    title: "Backend / Systems Engineer — Product companies",
    body: "Built and maintained production backends for fintech, OTP/virtual numbers, VPN, and healthcare products. Stack: Node.js (Express/Hono), Laravel, PostgreSQL, Redis, Docker, JWT auth, payment APIs.",
    iconName: "Briefcase",
    metadata: { period: "2023 — Present", role: "Backend Engineer" },
    sortOrder: 15,
  }),
  block("emp-job-2", "employer", "timeline_item", {
    title: "Founder / Builder — Independent products",
    body: "Shipped PaperDB (BaaS), Renboot (cloud/hardware rental for African users — strong early adoption), and multiple client platforms (events, hospitality, marketplaces).",
    iconName: "Sparkles",
    metadata: { period: "Ongoing", role: "Founder" },
    sortOrder: 16,
  }),
  block("emp-skill-1", "employer", "section", {
    title: "Node.js / Express / Hono",
    body: "Backend APIs and microservices",
    iconName: "Server",
    metadata: { metric: "Core stack" },
    sortOrder: 20,
  }),
  block("emp-skill-2", "employer", "section", {
    title: "PostgreSQL + Redis",
    body: "Relational data, caching, queues",
    iconName: "Database",
    metadata: { metric: "Production" },
    sortOrder: 21,
  }),
  block("emp-skill-3", "employer", "section", {
    title: "PHP / Laravel",
    body: "Web applications and APIs",
    iconName: "Code2",
    metadata: { metric: "2+ yrs" },
    sortOrder: 22,
  }),
  block("emp-skill-4", "employer", "section", {
    title: "Next.js",
    body: "Fullstack React applications",
    iconName: "Code2",
    metadata: { metric: "Ship-ready" },
    sortOrder: 23,
  }),
  block("emp-skill-5", "employer", "section", {
    title: "DevOps / CI-CD",
    body: "Docker, Vercel, GitHub Actions",
    iconName: "Zap",
    metadata: { metric: "Automated" },
    sortOrder: 24,
  }),
  block("emp-skill-6", "employer", "section", {
    title: "API Design",
    body: "REST, auth, webhooks, payments",
    iconName: "Link2",
    metadata: { metric: "Daily work" },
    sortOrder: 25,
  }),
  block("emp-proj-1", "employer", "project", {
    title: "InstantOTP",
    body: "Virtual number / OTP platform. High-throughput SMS and verification flows on Node.js, Redis, and PostgreSQL. Global country and service coverage for end-user verifications.",
    href: "https://www.instantotp.com/",
    iconName: "Zap",
    metadata: {
      tech: ["Node.js", "Express.js", "Redis", "PostgreSQL", "SMS APIs"],
      metric: "Global OTP / virtual numbers",
    },
    sortOrder: 40,
  }),
  block("emp-proj-2", "employer", "project", {
    title: "Etegram Platform",
    body: "Business banking and payment collection: corporate accounts, QR payments, checkout, payment links, and a developer API. Trusted by 2,200+ businesses with high daily transaction volume.",
    href: "https://www.etegram.com/",
    iconName: "TrendingUp",
    metadata: {
      tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT", "Docker"],
      metric: "2.2K+ businesses",
    },
    sortOrder: 41,
  }),
  block("emp-proj-3", "employer", "project", {
    title: "MonieCheap",
    body: "Palm oil investment platform with daily interest accrual, portfolio tracking, and integrated bill payments. Built for reliability and financial accessibility.",
    href: "https://moniecheap.com/",
    iconName: "TrendingUp",
    metadata: {
      tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT", "Docker"],
      metric: "Investment + bills",
    },
    sortOrder: 42,
  }),
  block("emp-proj-4", "employer", "project", {
    title: "TunnelDeck",
    body: "Consumer VPN and tunneling product: encrypted connectivity, multi-platform clients, and global server management backends.",
    href: "https://tunneldeck.com/",
    iconName: "Server",
    metadata: {
      tech: ["Express.js", "PostgreSQL", "JWT", "Docker", "Redis"],
      metric: "VPN / privacy",
    },
    sortOrder: 43,
  }),
  block("emp-proj-5", "employer", "project", {
    title: "Proton Medicare",
    body: "Healthcare management system with appointment scheduling, patient records, and secure data handling (Next.js + Express + PostgreSQL).",
    href: "https://protonmedicare.com/",
    iconName: "Heart",
    metadata: {
      tech: ["Next.js", "React", "PostgreSQL", "Express.js"],
      metric: "HealthTech",
    },
    sortOrder: 44,
  }),
  block("emp-proj-6", "employer", "project", {
    title: "Renboot",
    body: "Cloud and hardware rental product aimed at African users. Early launch saw roughly 280k users in the first week — a strong signal for demand.",
    href: "https://www.renboot.com/",
    iconName: "Server",
    metadata: {
      tech: ["TypeScript", "Electron", "React", "Node.js", "Go"],
      metric: "~280k week-one users",
    },
    sortOrder: 45,
  }),
  block("emp-proj-7", "employer", "project", {
    title: "PaperDB",
    body: "Backend-as-a-Service: managed databases, auth, real-time subscriptions, and SDKs. Firebase/Supabase-class ambition on Go + TypeScript.",
    href: "https://paperdb.vercel.app/",
    iconName: "Database",
    metadata: {
      tech: ["Go", "TypeScript", "PostgreSQL", "Redis", "WebSockets", "Hono"],
      metric: "BaaS platform",
    },
    sortOrder: 46,
  }),
  block("emp-link-1", "employer", "link", {
    title: "Resume / CV",
    body: "Full professional CV as PDF",
    href: "/cv/moses.pdf",
    iconName: "FileText",
    sortOrder: 60,
  }),

  // ── investor ──────────────────────────────────────────────
  block("inv-stat-1", "investor", "stat", {
    title: "Multi-product",
    body: "Fintech, health, infra, consumer",
    iconName: "TrendingUp",
    sortOrder: 1,
  }),
  block("inv-stat-2", "investor", "stat", {
    title: "Renboot spike",
    body: "~280k users in launch week",
    iconName: "Zap",
    sortOrder: 2,
  }),
  block("inv-stat-3", "investor", "stat", {
    title: "Revenue rails",
    body: "Payments and B2B platforms live",
    iconName: "Database",
    sortOrder: 3,
  }),
  block("inv-text-1", "investor", "text", {
    title: "The Business Case",
    body: "I build products people use: payment collection, OTP infrastructure, investment apps, VPN, healthcare, and developer platforms. Looking for partners who care about distribution in Africa and solid technical foundations.",
    iconName: "FileText",
    sortOrder: 10,
  }),
  block("inv-sec-1", "investor", "section", {
    title: "Fintech and Payments",
    body: "Corporate accounts, payment links, QR, checkout APIs",
    iconName: "TrendingUp",
    metadata: { metric: "Etegram live" },
    sortOrder: 20,
  }),
  block("inv-sec-2", "investor", "section", {
    title: "Healthcare Tech",
    body: "Clinic workflows and patient systems",
    iconName: "Heart",
    metadata: { metric: "Proton Medicare" },
    sortOrder: 21,
  }),
  block("inv-sec-3", "investor", "section", {
    title: "Developer Tools",
    body: "BaaS, SDKs, logging, tunneling",
    iconName: "Code2",
    metadata: { metric: "PaperDB / LogShip" },
    sortOrder: 22,
  }),
  block("inv-proj-1", "investor", "project", {
    title: "PaperDB",
    body: "BaaS competing with Firebase/Supabase. Managed DBs, auth, real-time, SDKs. African developers first, then global.",
    href: "https://paperdb.vercel.app/",
    iconName: "Database",
    metadata: {
      tech: ["Go", "TypeScript", "PostgreSQL"],
      status: "active",
      sector: "Developer Tools",
    },
    sortOrder: 40,
  }),
  block("inv-proj-2", "investor", "project", {
    title: "Renboot",
    body: "Hardware rental and cloud hosting for African users. Early launch: ~280k users in week one.",
    href: "https://www.renboot.com/",
    iconName: "Server",
    metadata: {
      tech: ["TypeScript", "Electron", "Go"],
      status: "active",
      sector: "Cloud",
      metric: "~280k week-one",
    },
    sortOrder: 41,
  }),
  block("inv-proj-3", "investor", "project", {
    title: "Etegram",
    body: "Business banking and payments for 2,200+ businesses. Multi-channel collection and developer API.",
    href: "https://www.etegram.com/",
    iconName: "TrendingUp",
    metadata: { tech: ["Hono", "PostgreSQL"], status: "launched", sector: "Fintech" },
    sortOrder: 42,
  }),
  block("inv-proj-4", "investor", "project", {
    title: "MonieCheap",
    body: "Commodity-backed investment (palm oil) with daily interest and bill payments.",
    href: "https://moniecheap.com/",
    iconName: "TrendingUp",
    metadata: { tech: ["Hono", "PostgreSQL"], status: "launched", sector: "Fintech" },
    sortOrder: 43,
  }),
  block("inv-proj-5", "investor", "project", {
    title: "Proton Medicare",
    body: "Tele-health and healthcare management. Multi-product health stack.",
    href: "https://www.protonmedicare.com/",
    iconName: "Heart",
    metadata: { tech: ["Next.js", "PostgreSQL"], status: "launched", sector: "Healthcare" },
    sortOrder: 44,
  }),
  block("inv-proj-6", "investor", "project", {
    title: "Servixing",
    body: "Services marketplace connecting seekers with providers — booking, payments, reviews.",
    href: "https://servixing.com/",
    iconName: "Link2",
    metadata: { tech: ["Node.js", "Next.js"], status: "active", sector: "Marketplace" },
    sortOrder: 45,
  }),

  // ── romantic ──────────────────────────────────────────────
  block("rom-stat-1", "romantic", "stat", {
    title: "Sarcasm",
    body: "Official love language",
    iconName: "MessageCircle",
    sortOrder: 1,
  }),
  block("rom-stat-2", "romantic", "stat", {
    title: "Chef mode",
    body: "Afang, Banga, and more",
    iconName: "Sparkles",
    sortOrder: 2,
  }),
  block("rom-stat-3", "romantic", "stat", {
    title: "Available",
    body: "Emotionally, yes really",
    iconName: "Heart",
    sortOrder: 3,
  }),
  block("rom-text-1", "romantic", "text", {
    title: "Beyond The Terminal",
    body: "Probably too curious for my own good. I value deep talks, dry humor, and ambition that stays grounded. Building companies while still making time for real conversations.",
    iconName: "Heart",
    sortOrder: 10,
  }),
  block("rom-sec-1", "romantic", "section", {
    title: "Deep Conversations",
    body: "Philosophy, tech, life — hours if you want them",
    iconName: "MessageCircle",
    sortOrder: 20,
  }),
  block("rom-sec-2", "romantic", "section", {
    title: "Ambitious and Driven",
    body: "Multiple products, still grounded",
    iconName: "TrendingUp",
    sortOrder: 21,
  }),
  block("rom-sec-3", "romantic", "section", {
    title: "Great Chef",
    body: "Afang, Banga, and plenty more you will love",
    iconName: "Sparkles",
    sortOrder: 22,
  }),
  block("rom-sec-4", "romantic", "section", {
    title: "Dry Humor Expert",
    body: "Sarcasm is my love language. You have been warned.",
    iconName: "MessageCircle",
    sortOrder: 23,
  }),
  block("rom-sec-5", "romantic", "section", {
    title: "Adventure Ready",
    body: "New experiences and spontaneous plans welcome",
    iconName: "Compass",
    sortOrder: 24,
  }),
  block("rom-sec-6", "romantic", "section", {
    title: "Supportive Partner",
    body: "Biggest cheerleader — unless you are wrong, then honesty",
    iconName: "Heart",
    sortOrder: 25,
  }),
  block("rom-proj-1", "romantic", "project", {
    title: "InstantOTP",
    body: "Built so anyone could get a virtual number and receive SMS without hassle. Serving people globally.",
    href: "https://www.instantotp.com/",
    iconName: "Zap",
    metadata: { tech: ["Node.js", "Redis"], metric: "Used globally" },
    sortOrder: 40,
  }),
  block("rom-proj-2", "romantic", "project", {
    title: "PaperDB",
    body: "Most ambitious project — a platform that lets developers build apps faster. Think Firebase, but mine.",
    href: "https://paperdb.vercel.app/",
    iconName: "Database",
    metadata: { tech: ["Go", "TypeScript"], metric: "Biggest project" },
    sortOrder: 41,
  }),

  // ── academic ──────────────────────────────────────────────
  block("aca-stat-1", "academic", "stat", {
    title: "Systems",
    body: "Distributed architecture focus",
    iconName: "Server",
    sortOrder: 1,
  }),
  block("aca-stat-2", "academic", "stat", {
    title: "Applied AI",
    body: "NLP and optimization work",
    iconName: "Sparkles",
    sortOrder: 2,
  }),
  block("aca-stat-3", "academic", "stat", {
    title: "Open",
    body: "To collaboration and talks",
    iconName: "BookOpen",
    sortOrder: 3,
  }),
  block("aca-text-1", "academic", "text", {
    title: "Intellectual Pursuits",
    body: "Work sits at the edge of practical distributed systems and applied AI. Interested in multi-tenant isolation, real-time event streams, and NLP tooling that ships.",
    iconName: "GraduationCap",
    sortOrder: 10,
  }),
  block("aca-sec-1", "academic", "section", {
    title: "Distributed Systems",
    body: "Event-driven architectures, multi-tenant isolation",
    iconName: "Server",
    sortOrder: 20,
  }),
  block("aca-sec-2", "academic", "section", {
    title: "Database Engineering",
    body: "Query optimization, indexing, replication patterns",
    iconName: "Database",
    sortOrder: 21,
  }),
  block("aca-sec-3", "academic", "section", {
    title: "API Design Patterns",
    body: "REST semantics, auth flows, payment rails",
    iconName: "Link2",
    sortOrder: 22,
  }),
  block("aca-sec-4", "academic", "section", {
    title: "Security Engineering",
    body: "OAuth-style flows, encryption, least privilege",
    iconName: "FileText",
    sortOrder: 23,
  }),
  block("aca-sec-5", "academic", "section", {
    title: "Performance Engineering",
    body: "Caching, Redis, load-aware design",
    iconName: "Zap",
    sortOrder: 24,
  }),
  block("aca-sec-6", "academic", "section", {
    title: "Applied Machine Learning",
    body: "NLP pipelines, content tools, preprocessing",
    iconName: "Sparkles",
    sortOrder: 25,
  }),
  block("aca-proj-1", "academic", "project", {
    title: "PaperDB",
    body: "BaaS implementing managed provisioning, real-time event streaming, and multi-tenant isolation.",
    href: "https://paperdb.vercel.app/",
    iconName: "Database",
    metadata: { tech: ["Go", "PostgreSQL", "Redis"], metric: "Novel BaaS arch." },
    sortOrder: 40,
  }),
  block("aca-proj-2", "academic", "project", {
    title: "LogShip",
    body: "Telemetry SDK and log aggregation for real-time application monitoring.",
    href: "https://www.npmjs.com/package/logship-js",
    iconName: "Code2",
    metadata: { tech: ["Go", "TypeScript", "Redis"], metric: "Telemetry SDK" },
    sortOrder: 41,
  }),
  block("aca-proj-3", "academic", "project", {
    title: "AI SEO",
    body: "NLP-driven SEO analysis for content optimization and ranking suggestions.",
    href: "https://ai-seo-seven.vercel.app/",
    iconName: "Sparkles",
    metadata: { tech: ["Next.js", "React"], metric: "Applied NLP" },
    sortOrder: 42,
  }),

  // ── visitor ───────────────────────────────────────────────
  block("vis-stat-1", "visitor", "stat", {
    title: "Uyo, NG",
    body: "Based in Akwa Ibom",
    iconName: "MapPin",
    sortOrder: 1,
  }),
  block("vis-stat-2", "visitor", "stat", {
    title: "Builder",
    body: "APIs, products, ventures",
    iconName: "Code2",
    sortOrder: 2,
  }),
  block("vis-stat-3", "visitor", "stat", {
    title: "Open",
    body: "To chat and collab",
    iconName: "Mail",
    sortOrder: 3,
  }),
  block("vis-text-1", "visitor", "text", {
    title: "The Quick Intro",
    body: "Developer and founder who loves clean UIs, fast APIs, and occasionally seeing the sun. Take a look around — projects, blog, or chat with AI Moses.",
    iconName: "User",
    sortOrder: 10,
  }),
  block("vis-sec-1", "visitor", "section", {
    title: "Backend Development",
    body: "Building APIs and servers that actually work",
    iconName: "Server",
    sortOrder: 20,
  }),
  block("vis-sec-2", "visitor", "section", {
    title: "Fullstack Projects",
    body: "From database to UI",
    iconName: "Code2",
    sortOrder: 21,
  }),
  block("vis-sec-3", "visitor", "section", {
    title: "Building Products",
    body: "Not just code — products people use",
    iconName: "Sparkles",
    sortOrder: 22,
  }),
  block("vis-sec-4", "visitor", "section", {
    title: "Learning New Tech",
    body: "Currently deep on Go and systems work",
    iconName: "BookOpen",
    sortOrder: 23,
  }),
  block("vis-proj-1", "visitor", "project", {
    title: "InstantOTP",
    body: "Virtual number service for SMS verifications. Global reach.",
    href: "https://www.instantotp.com/",
    iconName: "Zap",
    metadata: { tech: ["Node.js", "Redis", "PostgreSQL"], metric: "OTP / virtual numbers" },
    sortOrder: 40,
  }),
  block("vis-proj-2", "visitor", "project", {
    title: "Etegram",
    body: "Business banking and payments. 2.2K+ businesses.",
    href: "https://www.etegram.com/",
    iconName: "TrendingUp",
    metadata: { tech: ["Hono", "PostgreSQL"], metric: "2.2K+ businesses" },
    sortOrder: 41,
  }),
  block("vis-proj-3", "visitor", "project", {
    title: "PaperDB",
    body: "Backend-as-a-Service. Like Firebase, but mine.",
    href: "https://paperdb.vercel.app/",
    iconName: "Database",
    metadata: { tech: ["Go", "TypeScript"], metric: "BaaS platform" },
    sortOrder: 42,
  }),
  block("vis-proj-4", "visitor", "project", {
    title: "TunnelDeck",
    body: "VPN for private browsing on every device.",
    href: "https://tunneldeck.com/",
    iconName: "Server",
    metadata: { tech: ["Express.js", "PostgreSQL"], metric: "VPN / privacy" },
    sortOrder: 43,
  }),
  block("vis-link-1", "visitor", "link", {
    title: "GitHub",
    body: "Open source and public work",
    href: "https://github.com/mosesedem",
    iconName: "Github",
    sortOrder: 60,
  }),
  block("vis-link-2", "visitor", "link", {
    title: "Blog",
    body: "Notes on building and shipping",
    href: "/blog",
    iconName: "BookOpen",
    sortOrder: 61,
  }),
];

const now = "2026-07-01T00:00:00.000Z";

export const seedBlogPosts: SeedBlogPost[] = [
  {
    id: "blog-1",
    slug: "shipping-backends-that-stay-up",
    title: "Shipping backends that stay up",
    excerpt:
      "Notes on designing APIs and data stores so 3 AM pages stay rare — caching, idempotency, and honest monitoring.",
    body: `Most outages are not exotic. They are missing timeouts, unbounded queues, or a database that became the chat room for every feature.

When I ship backends — payments, OTP, multi-tenant apps — I start with boring reliability:

1. **Idempotent writes** for payments and webhooks.
2. **Redis** for hot paths and rate limits, not as a second source of truth.
3. **Clear ownership** of failures: structured logs, not silent retries forever.
4. **Schema discipline** so multi-tenant data cannot leak across customers.

Fancy architecture is optional. Clear failure modes are not.

If you are hiring for backend work, ask candidates how they design for the day traffic is 10x — not how they name folders.`,
    coverImage: null,
    tags: ["backend", "reliability", "engineering"],
    published: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "blog-2",
    slug: "building-from-uyo",
    title: "Building products from Uyo",
    excerpt:
      "Why shipping from Akwa Ibom is not a disadvantage — constraints, internet reality, and global users.",
    body: `I build from Uyo, Akwa Ibom. That means designing for real latency, mobile-first users, and payment rails that have to work when the network is imperfect.

Products like InstantOTP, Etegram, and Renboot taught me the same lesson: users do not care where your laptop is. They care whether SMS arrives, whether settlement is correct, and whether the app feels fast.

African distribution is not a niche — it is a test of product quality under constraint. Pass that test and the rest of the world is easier.`,
    coverImage: null,
    tags: ["founders", "africa", "product"],
    published: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  },
];
