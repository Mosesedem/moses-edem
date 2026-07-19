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
};

export const seedProfile: SeedProfile = {
  id: "profile-moses",
  fullName: "Moses Jacob Edem",
  location: "Uyo, Akwa Ibom, Nigeria",
  email: "mosesedem81@gmail.com",
  githubUrl: "https://github.com/mosesedem",
  linkedinUrl: "https://linkedin.com/in/mosesedem",
  resumeUrl: "/cv/moses.pdf",
};

export const seedPersonas: SeedPersona[] = [
  {
    id: "persona-employer",
    key: "employer",
    label: "Employer / Recruiter",
    tagline: "Skills, experience, availability, resume, contact",
    heroHeading: "Highly Competent Backend Architect",
    heroBody:
      "I turn complex business logic into elegant, scalable reality. 7+ years building APIs, microservices, and systems that stay up at 3 AM.",
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
    heroHeading: "Building The Future Of Scalable Tech",
    heroBody:
      "Technical brilliance meets aggressive growth. Products people use, ventures that scale, and a founder who speaks both code and EBITDA.",
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
    heroHeading: "Researching The Intersection Of AI And Scale",
    heroBody:
      "Work at the edge of distributed systems and applied AI. Scholar-engineer energy: rigorous, precise, and always curious.",
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
    tagline: "General intro, projects, and links",
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
    title: "7+ years",
    body: "Backend engineering experience",
    iconName: "Server",
    sortOrder: 1,
  }),
  block("emp-stat-2", "employer", "stat", {
    title: "50+ APIs",
    body: "REST, GraphQL, WebSockets shipped",
    iconName: "Code2",
    sortOrder: 2,
  }),
  block("emp-stat-3", "employer", "stat", {
    title: "30+ projects",
    body: "Production systems delivered",
    iconName: "Database",
    sortOrder: 3,
  }),
  block("emp-text-1", "employer", "text", {
    title: "The Professional Stats",
    body: "I specialize in Node.js, Go, and turning monolithic disasters into clean microservices. I do not just write code; I architect solutions that do not wake you up at 3 AM.",
    iconName: "FileText",
    sortOrder: 10,
  }),
  block("emp-skill-1", "employer", "section", {
    title: "Node.js / Express / Fastify",
    body: "Backend APIs and microservices",
    iconName: "Server",
    metadata: { metric: "7+ yrs" },
    sortOrder: 20,
  }),
  block("emp-skill-2", "employer", "section", {
    title: "Prisma / SQL",
    body: "Type-safe database access at scale",
    iconName: "Database",
    metadata: { metric: "30+ projects" },
    sortOrder: 21,
  }),
  block("emp-skill-3", "employer", "section", {
    title: "Next.js",
    body: "Fullstack React applications",
    iconName: "Code2",
    metadata: { metric: "Expert" },
    sortOrder: 22,
  }),
  block("emp-skill-4", "employer", "section", {
    title: "DevOps / CI-CD",
    body: "Docker, Vercel, GitHub Actions",
    iconName: "Zap",
    metadata: { metric: "Automated" },
    sortOrder: 23,
  }),
  block("emp-skill-5", "employer", "section", {
    title: "Go",
    body: "High-performance services",
    iconName: "Server",
    metadata: { metric: "Growing" },
    sortOrder: 24,
  }),
  block("emp-skill-6", "employer", "section", {
    title: "API Design",
    body: "REST, GraphQL, WebSockets",
    iconName: "Link2",
    metadata: { metric: "50+ APIs" },
    sortOrder: 25,
  }),
  block("emp-proj-1", "employer", "project", {
    title: "InstantOTP",
    body: "Virtual number platform serving 800k+ users across 500+ countries and 400+ services. Node.js, Redis, PostgreSQL.",
    href: "https://www.instantotp.com/",
    iconName: "Zap",
    metadata: { tech: ["Node.js", "Redis", "PostgreSQL"], metric: "800k+ users" },
    sortOrder: 40,
  }),
  block("emp-proj-2", "employer", "project", {
    title: "Etegram Platform",
    body: "Business banking and payment collection trusted by 2,200+ businesses. Corporate accounts, QR payments, developer API.",
    href: "https://www.etegram.com/",
    iconName: "TrendingUp",
    metadata: { tech: ["Hono", "PostgreSQL", "Docker"], metric: "2.2K+ businesses" },
    sortOrder: 41,
  }),
  block("emp-proj-3", "employer", "project", {
    title: "PaperDB",
    body: "Backend-as-a-Service with managed databases, real-time subscriptions, auth, and SDKs. Go + TypeScript.",
    href: "https://paperdb.vercel.app/",
    iconName: "Database",
    metadata: { tech: ["Go", "TypeScript", "PostgreSQL", "Redis"], metric: "Full BaaS" },
    sortOrder: 42,
  }),
  block("emp-proj-4", "employer", "project", {
    title: "TunnelDeck",
    body: "Consumer VPN with multi-platform clients and encrypted global network. 10M+ downloads.",
    href: "https://tunneldeck.com/",
    iconName: "Server",
    metadata: { tech: ["Express.js", "PostgreSQL", "Redis"], metric: "10M+ downloads" },
    sortOrder: 43,
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
    title: "4 ventures",
    body: "Active products and platforms",
    iconName: "TrendingUp",
    sortOrder: 1,
  }),
  block("inv-stat-2", "investor", "stat", {
    title: "1M+ users",
    body: "Across consumer products",
    iconName: "User",
    sortOrder: 2,
  }),
  block("inv-stat-3", "investor", "stat", {
    title: "Revenue",
    body: "Multiple products generating",
    iconName: "Zap",
    sortOrder: 3,
  }),
  block("inv-text-1", "investor", "text", {
    title: "The Business Case",
    body: "I build products people actually use. Background in syntax and in scaling ventures from zero. Looking for partners who care about both product and unit economics.",
    iconName: "FileText",
    sortOrder: 10,
  }),
  block("inv-sec-1", "investor", "section", {
    title: "Fintech and Payments",
    body: "Payment processing, fraud detection, transaction systems",
    iconName: "TrendingUp",
    metadata: { metric: "NGN 50M+ processed" },
    sortOrder: 20,
  }),
  block("inv-sec-2", "investor", "section", {
    title: "Healthcare Tech",
    body: "Patient management and clinic systems",
    iconName: "Heart",
    metadata: { metric: "2 platforms" },
    sortOrder: 21,
  }),
  block("inv-sec-3", "investor", "section", {
    title: "Developer Tools",
    body: "SDKs, APIs, tunneling infrastructure",
    iconName: "Code2",
    metadata: { metric: "Open source" },
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
    body: "Desktop app for renting hardware in realtime and hosting cloud applications.",
    href: "https://www.renboot.com/",
    iconName: "Server",
    metadata: { tech: ["TypeScript", "Electron", "Go"], status: "active", sector: "Cloud" },
    sortOrder: 41,
  }),
  block("inv-proj-3", "investor", "project", {
    title: "Proton Medicare",
    body: "Tele-health and healthcare management. Multi-product, revenue-generating.",
    href: "https://www.protonmedicare.com/",
    iconName: "Heart",
    metadata: { tech: ["Next.js", "PostgreSQL"], status: "launched", sector: "Healthcare" },
    sortOrder: 42,
  }),
  block("inv-proj-4", "investor", "project", {
    title: "Servixing",
    body: "Services marketplace connecting seekers with providers. Booking, payments, reviews.",
    href: "https://servixing.com/",
    iconName: "Link2",
    metadata: { tech: ["Node.js", "Next.js"], status: "active", sector: "Marketplace" },
    sortOrder: 43,
  }),
  block("inv-proj-5", "investor", "project", {
    title: "MonieCheap",
    body: "Palm oil investment platform with daily interest and bill payments. 1M+ customers.",
    href: "https://moniecheap.com/",
    iconName: "TrendingUp",
    metadata: { tech: ["Hono", "PostgreSQL"], metric: "1M+ customers" },
    sortOrder: 44,
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
    body: "Multiple companies, still grounded",
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
    body: "Work sits at the edge of machine learning optimization and human-computer interaction. Publish when there is something worth saying. Open to rigorous discourse.",
    iconName: "GraduationCap",
    sortOrder: 10,
  }),
  block("aca-sec-1", "academic", "section", {
    title: "Distributed Systems",
    body: "Consensus, CAP theorem, event-driven architectures",
    iconName: "Server",
    sortOrder: 20,
  }),
  block("aca-sec-2", "academic", "section", {
    title: "Database Engineering",
    body: "Query optimization, indexing, replication",
    iconName: "Database",
    sortOrder: 21,
  }),
  block("aca-sec-3", "academic", "section", {
    title: "API Design Patterns",
    body: "REST semantics, GraphQL schemas, gRPC",
    iconName: "Link2",
    sortOrder: 22,
  }),
  block("aca-sec-4", "academic", "section", {
    title: "Security Engineering",
    body: "OAuth, encryption, zero-trust patterns",
    iconName: "FileText",
    sortOrder: 23,
  }),
  block("aca-sec-5", "academic", "section", {
    title: "Performance Engineering",
    body: "Load testing, profiling, caching strategies",
    iconName: "Zap",
    sortOrder: 24,
  }),
  block("aca-sec-6", "academic", "section", {
    title: "Applied Machine Learning",
    body: "NLP pipelines, recommendations, preprocessing",
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
    body: "Telemetry SDK and distributed log aggregation for real-time application monitoring.",
    href: "https://www.npmjs.com/package/logship-js",
    iconName: "Code2",
    metadata: { tech: ["Go", "TypeScript", "Redis"], metric: "Telemetry SDK" },
    sortOrder: 41,
  }),
  block("aca-proj-3", "academic", "project", {
    title: "AI SEO",
    body: "NLP-driven SEO analysis applying transformer models to content optimization.",
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
    body: "Developer and founder who loves clean UIs, fast APIs, and occasionally seeing the sun. Take a look around.",
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
    body: "Virtual number service for SMS verifications. 800k+ users.",
    href: "https://www.instantotp.com/",
    iconName: "Zap",
    metadata: { tech: ["Node.js", "Redis", "PostgreSQL"], metric: "800k+ users" },
    sortOrder: 40,
  }),
  block("vis-proj-2", "visitor", "project", {
    title: "Etegram",
    body: "Business banking and payments. 2K+ businesses.",
    href: "https://www.etegram.com/",
    iconName: "TrendingUp",
    metadata: { tech: ["Hono", "PostgreSQL"], metric: "2K+ businesses" },
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
    body: "VPN for private browsing on every device. 10M+ downloads.",
    href: "https://tunneldeck.com/",
    iconName: "Server",
    metadata: { tech: ["Express.js", "PostgreSQL"], metric: "10M+ downloads" },
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
    title: "LinkedIn",
    body: "Professional profile",
    href: "https://linkedin.com/in/mosesedem",
    iconName: "Linkedin",
    sortOrder: 61,
  }),
];
