import type { PersonaKey } from "@/lib/schema";

export type ProjectLensCopy = {
  summary: string;
  body: string;
  metric?: string;
};

export type SeedProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  iconName: string;
  href: string | null;
  tech: string[];
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  lens: Record<PersonaKey, ProjectLensCopy>;
};

function lens(
  employer: ProjectLensCopy,
  investor: ProjectLensCopy,
  romantic: ProjectLensCopy,
  academic: ProjectLensCopy,
  visitor: ProjectLensCopy
): Record<PersonaKey, ProjectLensCopy> {
  return { employer, investor, romantic, academic, visitor };
}

export const seedProjects: SeedProject[] = [
  {
    id: "proj-instantotp",
    slug: "instantotp",
    title: "InstantOTP",
    category: "Virtual Numbers",
    iconName: "Zap",
    href: "https://www.instantotp.com/",
    tech: ["Node.js", "Express.js", "Redis", "PostgreSQL", "SMS APIs"],
    featured: true,
    sortOrder: 1,
    isActive: true,
    lens: lens(
      {
        summary: "Virtual number platform at global scale",
        body: "Virtual number / OTP platform with high-throughput SMS and verification flows. Built on Node.js, Redis, and PostgreSQL for reliable delivery across countries and services. Focus: concurrency, caching, and provider failover.",
        metric: "Global OTP / virtual numbers",
      },
      {
        summary: "Consumer marketplace for SMS verification",
        body: "Virtual number marketplace enabling SMS verifications from 400+ services across 500+ countries. Large global user footprint with a self-serve consumption model.",
        metric: "Global consumer reach",
      },
      {
        summary: "My baby for hassle-free SMS numbers",
        body: "Built so anyone could get a virtual phone number and receive SMS without the usual friction. Still one of the products I am most attached to — real people use it every day, worldwide.",
        metric: "Used globally",
      },
      {
        summary: "High-concurrency number provisioning",
        body: "Virtual number provisioning with scalable SMS routing across many country-service combinations. Interesting problems in allocation, rate limits, and multi-provider delivery.",
        metric: "400+ services",
      },
      {
        summary: "Buy virtual numbers, receive SMS",
        body: "A virtual number service for SMS verifications (WhatsApp, Telegram, and more). Users get a number, receive codes, move on with their day.",
        metric: "OTP / virtual numbers",
      }
    ),
  },
  {
    id: "proj-etegram",
    slug: "etegram",
    title: "Etegram Platform",
    category: "Fintech / Payments",
    iconName: "TrendingUp",
    href: "https://www.etegram.com/",
    tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
    featured: true,
    sortOrder: 2,
    isActive: true,
    lens: lens(
      {
        summary: "Business banking and payment collection APIs",
        body: "Corporate accounts, QR payments, online checkout, payment links, and a developer API. Multi-tenant fintech backend with auth, settlement paths, and operational reliability for 2,200+ businesses.",
        metric: "2.2K+ businesses",
      },
      {
        summary: "B2B payments ecosystem, revenue live",
        body: "Business banking and payments serving 2.2K+ businesses. Multi-channel collection (QR, links, checkout) plus developer API. Revenue-generating and scaling.",
        metric: "2.2K+ businesses",
      },
      {
        summary: "Banking rails for ambitious businesses",
        body: "A business banking platform for entrepreneurs who need to collect payments and manage money without the usual bank theater. Over two thousand businesses on it.",
        metric: "2K+ businesses",
      },
      {
        summary: "Multi-tenant payment infrastructure",
        body: "Multi-tenant business payment infrastructure with corporate account provisioning, multi-channel collection APIs, and real-time transaction analytics patterns.",
        metric: "Multi-tenant arch.",
      },
      {
        summary: "Business banking and payments",
        body: "Companies open corporate accounts, collect via QR or links, and get business insights. Built for real operators, not slide decks.",
        metric: "2.2K+ businesses",
      }
    ),
  },
  {
    id: "proj-moniecheap",
    slug: "moniecheap",
    title: "MonieCheap",
    category: "Investment",
    iconName: "TrendingUp",
    href: "https://moniecheap.com/",
    tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
    featured: true,
    sortOrder: 3,
    isActive: true,
    lens: lens(
      {
        summary: "Investment + bills on reliable rails",
        body: "Palm oil investment platform with daily interest accrual, portfolio tracking, and integrated bill payments. Emphasis on financial correctness and uptime.",
        metric: "Daily interest engine",
      },
      {
        summary: "Commodity-backed investment product",
        body: "Palm oil investment with daily returns, flexible plans, and bill payment features. Consumer fintech with sticky daily engagement loops.",
        metric: "Investment product",
      },
      {
        summary: "Helping people grow wealth day by day",
        body: "Built to help everyday Nigerians invest in palm oil and grow wealth one day at a time — plus pay bills without juggling five apps.",
        metric: "Growing wealth",
      },
      {
        summary: "Daily accrual and portfolio analytics",
        body: "Commodity investment platform with daily interest accrual engines, real-time portfolio analytics, and integrated utility payment rails.",
        metric: "Daily interest engine",
      },
      {
        summary: "Palm oil investing and bill payments",
        body: "Put money in, earn daily interest, pay bills on the side. Simple on the surface; careful about money underneath.",
        metric: "Investment + bills",
      }
    ),
  },
  {
    id: "proj-tunneldeck",
    slug: "tunneldeck",
    title: "TunnelDeck",
    category: "VPN / Privacy",
    iconName: "Server",
    href: "https://tunneldeck.com/",
    tech: ["Express.js", "PostgreSQL", "JWT Auth", "Docker", "Redis"],
    featured: true,
    sortOrder: 4,
    isActive: true,
    lens: lens(
      {
        summary: "Consumer VPN backend and multi-platform clients",
        body: "VPN and tunneling product with encrypted connectivity, global server management backends, and multi-platform client support. Auth, subscriptions, and infra orchestration.",
        metric: "VPN / privacy",
      },
      {
        summary: "Cross-platform privacy product",
        body: "Consumer VPN with multi-platform clients and self-serve subscription model. Infrastructure-heavy product with clear consumer value prop.",
        metric: "Privacy SaaS",
      },
      {
        summary: "Browse safely, go anywhere",
        body: "A privacy app so people can browse safely and access content from more places. Quiet infrastructure, loud user problem.",
        metric: "Privacy for everyone",
      },
      {
        summary: "Encrypted connectivity and geo access",
        body: "Consumer VPN implementing encryption-backed connectivity with multi-platform clients and geo-restriction bypass capabilities.",
        metric: "Network systems",
      },
      {
        summary: "VPN for private browsing",
        body: "Keeps browsing private, works across devices, and is backed by a serious server network. Privacy without the lecture.",
        metric: "VPN / privacy",
      }
    ),
  },
  {
    id: "proj-proton",
    slug: "proton-medicare",
    title: "Proton Medicare",
    category: "Healthcare",
    iconName: "Heart",
    href: "https://protonmedicare.com/",
    tech: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "Express.js"],
    featured: true,
    sortOrder: 5,
    isActive: true,
    lens: lens(
      {
        summary: "Clinic workflows and patient records",
        body: "Healthcare management with appointment scheduling, patient records, and secure data handling. Next.js frontends over Express and PostgreSQL.",
        metric: "HealthTech",
      },
      {
        summary: "HealthTech with multi-clinic path",
        body: "Patient records, appointments, and compliance-minded infrastructure. Expanding toward multi-clinic operations.",
        metric: "Health venture",
      },
      {
        summary: "Healthcare that should just work",
        body: "Built because healthcare should be accessible. Helps doctors and patients stay connected without paper chaos.",
        metric: "Real clinics",
      },
      {
        summary: "Healthcare information system patterns",
        body: "Healthcare information system with careful data handling and interoperability-minded design for clinical workflows.",
        metric: "HIS patterns",
      },
      {
        summary: "Doctors, patients, appointments",
        body: "Healthcare platform for managing patients, appointments, and records. Important work, careful data.",
        metric: "HealthTech",
      }
    ),
  },
  {
    id: "proj-renboot",
    slug: "renboot",
    title: "Renboot",
    category: "Cloud / Infrastructure",
    iconName: "Server",
    href: "https://www.renboot.com/",
    tech: ["TypeScript", "Electron", "React", "Node.js", "Go"],
    featured: true,
    sortOrder: 6,
    isActive: true,
    lens: lens(
      {
        summary: "Desktop + cloud rental orchestration",
        body: "Desktop application and orchestration for renting hardware in realtime and hosting cloud applications. TypeScript/Electron clients with backend services.",
        metric: "~280k week-one users",
      },
      {
        summary: "African cloud/hardware rental signal",
        body: "Hardware rental and cloud hosting aimed at African users. Early launch saw roughly 280k users in the first week — strong demand signal under real constraints.",
        metric: "~280k week-one",
      },
      {
        summary: "Rent hardware, host apps, ship faster",
        body: "A desktop product so people can rent hardware and host apps without needing a US credit card and a prayer. Early days were wild in the best way.",
        metric: "Launch spike",
      },
      {
        summary: "Realtime rental and hosting orchestration",
        body: "Desktop agent and orchestration framework for hardware rental and cloud application hosting with multi-user concurrency concerns.",
        metric: "Orchestration",
      },
      {
        summary: "Rent machines and host apps",
        body: "Desktop app for renting hardware and hosting cloud applications — especially useful where classic cloud onboarding is painful.",
        metric: "Cloud for builders",
      }
    ),
  },
  {
    id: "proj-paperdb",
    slug: "paperdb",
    title: "PaperDB",
    category: "Infrastructure",
    iconName: "Database",
    href: "https://paperdb.vercel.app/",
    tech: ["Go", "TypeScript", "PostgreSQL", "Redis", "WebSockets", "Docker", "Hono"],
    featured: true,
    sortOrder: 7,
    isActive: true,
    lens: lens(
      {
        summary: "Full BaaS: DB, auth, realtime, SDKs",
        body: "Backend-as-a-Service with managed databases, authentication, real-time subscriptions, and SDK ecosystem. Go + TypeScript, multi-tenant isolation.",
        metric: "Full BaaS",
      },
      {
        summary: "Firebase/Supabase-class BaaS bet",
        body: "BaaS competing with Firebase/Supabase. Managed DBs, auth, realtime, developer SDKs. African developers first, then global.",
        metric: "Firebase competitor",
      },
      {
        summary: "My most ambitious build",
        body: "The project that keeps me up in a good way — a platform so developers can ship apps faster. Think Firebase energy, my architecture.",
        metric: "Biggest project",
      },
      {
        summary: "Managed multi-tenant BaaS architecture",
        body: "BaaS implementing managed database provisioning, real-time event streaming, and multi-tenant isolation with SDK surfaces.",
        metric: "Novel BaaS arch.",
      },
      {
        summary: "Like Firebase, but mine",
        body: "Backend-as-a-Service: databases, auth, realtime — the works. Built to remove boilerplate for people shipping apps.",
        metric: "BaaS platform",
      }
    ),
  },
  {
    id: "proj-servixing",
    slug: "servixing",
    title: "Servixing",
    category: "Marketplace",
    iconName: "Link2",
    href: "https://www.servixing.com/",
    tech: ["Node.js", "Next.js", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
    featured: false,
    sortOrder: 8,
    isActive: true,
    lens: lens(
      {
        summary: "Two-sided services marketplace backend",
        body: "Repairs and services marketplace with booking, payment processing, and provider management. Matching, scheduling, and money movement.",
        metric: "Marketplace",
      },
      {
        summary: "Services marketplace with payments",
        body: "Connects repair professionals with customers. Booking, payments, and reviews built in — two-sided network dynamics.",
        metric: "Marketplace",
      },
      {
        summary: "When something breaks, find a pro",
        body: "A marketplace connecting people who need repairs with people who can fix things. Practical, a little unglamorous, very useful.",
        metric: "Real-world help",
      },
      {
        summary: "Two-sided matching and booking",
        body: "Two-sided marketplace with service provider matching and booking conflict resolution under concurrent demand.",
        metric: "Matching systems",
      },
      {
        summary: "Find a pro, book, pay",
        body: "Need something fixed? Find a professional, book them, pay them. Marketplace basics done carefully.",
        metric: "Services",
      }
    ),
  },
  {
    id: "proj-akwa",
    slug: "akwa-ibom-tech-week",
    title: "Akwa Ibom Tech Week",
    category: "Events",
    iconName: "Sparkles",
    href: "https://akwaibomtechweek.moniecheap.com/",
    tech: ["Express.js", "Next.js", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
    featured: false,
    sortOrder: 9,
    isActive: true,
    lens: lens(
      {
        summary: "Event bookings and payments infrastructure",
        body: "Event platform with booking, payment processing, and guest management for a major tech conference.",
        metric: "Events infra",
      },
      {
        summary: "Full-stack conference platform",
        body: "Event management for one of Nigeria's premier tech conferences. Booking and payment solution end to end.",
        metric: "Conference tech",
      },
      {
        summary: "Tech week for my state, online",
        body: "Built the tech behind a major conference in my state — events, bookings, payments, the full package.",
        metric: "Home turf",
      },
      {
        summary: "Concurrent booking and capacity",
        body: "Event management with concurrent booking resolution, payment gateway integration, and real-time capacity management.",
        metric: "Concurrency",
      },
      {
        summary: "Bookings for Tech Week",
        body: "Website and backend for Akwa Ibom Tech Week. Handles bookings, payments, and event logistics.",
        metric: "Events",
      }
    ),
  },
  {
    id: "proj-hotel",
    slug: "hotel-secured",
    title: "Hotel Secured",
    category: "Hospitality",
    iconName: "MapPin",
    href: "https://hotels.etegramgroup.com/",
    tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
    featured: false,
    sortOrder: 10,
    isActive: true,
    lens: lens(
      {
        summary: "Hospitality booking and guest ops",
        body: "Hotel management with booking systems, payments, and guest management. Multi-property friendly architecture.",
        metric: "Hospitality",
      },
      {
        summary: "Hospitality SaaS path",
        body: "Hotels manage bookings, payments, and guests digitally. Scalable multi-property architecture.",
        metric: "SaaS hospitality",
      },
      {
        summary: "Even hotels need good software",
        body: "A hotel management platform — because hospitality still runs on spreadsheets more than it should.",
        metric: "Hospitality",
      },
      {
        summary: "Temporal booking conflicts",
        body: "Hospitality management with temporal booking conflict resolution and multi-property data isolation.",
        metric: "Temporal models",
      },
      {
        summary: "Rooms, payments, guests",
        body: "Hotel platform for bookings, payments, and guests. Clean and practical.",
        metric: "Hospitality",
      }
    ),
  },
  {
    id: "proj-utq",
    slug: "union-of-tippers",
    title: "Union Of Tippers",
    category: "Government",
    iconName: "FileText",
    href: "https://utqenaks.ng/",
    tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
    featured: false,
    sortOrder: 11,
    isActive: true,
    lens: lens(
      {
        summary: "Government-sector reporting platform",
        body: "User management, reporting infrastructure, and secure data handling for a state-level union.",
        metric: "Gov-sector",
      },
      {
        summary: "Compliance-ready union digital platform",
        body: "State-level union platform with reporting and user management suited to public-sector constraints.",
        metric: "Gov digital",
      },
      {
        summary: "Not glamorous — still useful",
        body: "A platform for a government union. Not the flashiest work, but it helps real people get organized.",
        metric: "Public sector",
      },
      {
        summary: "RBAC and audit-minded systems",
        body: "Government-sector information system with role-based access control and compliant audit logging patterns.",
        metric: "RBAC / audit",
      },
      {
        summary: "Union users and reports",
        body: "Platform for a government union: users, reporting, and the serious bits public systems need.",
        metric: "Government",
      }
    ),
  },
  {
    id: "proj-aiseo",
    slug: "ai-seo",
    title: "AI SEO",
    category: "AI",
    iconName: "Sparkles",
    href: "https://ai-seo-seven.vercel.app/",
    tech: ["Next.js", "React"],
    featured: false,
    sortOrder: 12,
    isActive: true,
    lens: lens(
      {
        summary: "AI-assisted SEO recommendations",
        body: "AI-powered SEO analysis tool with automated recommendations and content optimization workflows.",
        metric: "AI tooling",
      },
      {
        summary: "SEO SaaS experiment",
        body: "AI SEO tool for creators — automated analysis and optimization suggestions.",
        metric: "SaaS experiment",
      },
      {
        summary: "Help people rank without the jargon soup",
        body: "An AI tool that helps people rank better on Google. Smart suggestions, less SEO mysticism.",
        metric: "Smarter SEO",
      },
      {
        summary: "NLP for content optimization",
        body: "NLP-driven SEO analysis applying modern models to content optimization and ranking-oriented suggestions.",
        metric: "Applied NLP",
      },
      {
        summary: "AI tips for better rankings",
        body: "AI SEO tool that reads your content and suggests improvements. Useful, a bit magical, mostly engineering.",
        metric: "AI",
      }
    ),
  },
  {
    id: "proj-menurave",
    slug: "menu-rave",
    title: "Menu Rave",
    category: "Hospitality",
    iconName: "Code2",
    href: "https://menurave.com/",
    tech: ["Express.js", "PostgreSQL", "JWT Auth", "Docker", "WebSockets"],
    featured: false,
    sortOrder: 13,
    isActive: true,
    lens: lens(
      {
        summary: "Realtime digital menus and orders",
        body: "Digital menu and ordering platform with realtime updates and restaurant management capabilities.",
        metric: "Realtime orders",
      },
      {
        summary: "Restaurant ordering platform",
        body: "Digital menus, order management, and analytics for restaurants. Realtime state is the product.",
        metric: "Hospitality SaaS",
      },
      {
        summary: "Order from your phone, skip the wait",
        body: "Digital menus for restaurants — scan, see, order. Because waiting for a paper menu in 2026 is a choice.",
        metric: "Food UX",
      },
      {
        summary: "WebSocket order queue systems",
        body: "Realtime digital ordering with WebSocket-driven state synchronization and order queue management.",
        metric: "Realtime systems",
      },
      {
        summary: "QR menus and mobile orders",
        body: "Scan a QR code, see the menu, order. Modern restaurant tooling without the fluff.",
        metric: "Hospitality",
      }
    ),
  },
  {
    id: "proj-logship",
    slug: "logship",
    title: "LogShip",
    category: "Infrastructure",
    iconName: "Code2",
    href: "https://www.npmjs.com/package/logship-js",
    tech: ["Go", "TypeScript", "Express.js", "Firebase", "Redis", "PostgreSQL"],
    featured: false,
    sortOrder: 14,
    isActive: true,
    lens: lens(
      {
        summary: "Tracking SDK and log aggregation API",
        body: "JavaScript tracking SDK and API for structured log tracking and analytics with a scalable backend.",
        metric: "Telemetry SDK",
      },
      {
        summary: "Developer infra for logs",
        body: "SDK and API for structured log aggregation — the kind of plumbing teams pay for when chaos hits production.",
        metric: "Dev tools",
      },
      {
        summary: "See what your app is actually doing",
        body: "A tool that helps developers keep track of application health and bugs without drowning in noise.",
        metric: "Observability",
      },
      {
        summary: "Distributed log aggregation",
        body: "Telemetry SDK and distributed log aggregation service for realtime application monitoring.",
        metric: "Telemetry",
      },
      {
        summary: "Logs and analytics for apps",
        body: "Tracking package for developers who want logs and analytics without building the whole pipe themselves.",
        metric: "npm package",
      }
    ),
  },
];

/** Map display titles used in persona blocks to project slugs. */
export const projectTitleToSlug: Record<string, string> = Object.fromEntries(
  seedProjects.map((p) => [p.title, p.slug])
);
