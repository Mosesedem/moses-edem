// import { PersonaMode } from '@/types/persona';

// export interface ExpertiseItem {
//   title: string;
//   description: string;
//   icon: string; // emoji
//   metric?: string;
// }

// export interface ProjectData {
//   title: string;
//   descriptions: Record<PersonaMode, string>;
//   tech: string[];
//   link?: string;
//   category: string;
//   featured?: boolean;
//   metrics?: Record<PersonaMode, string>;
// }

// export interface VentureData {
//   name: string;
//   description: string;
//   status: 'active' | 'scaling' | 'growth' | 'launched';
//   sector: string;
//   metrics: string[];
//   link?: string;
// }

// export interface PersonaContent {
//   headline: string;
//   role: string;
//   tagline: string;
//   aboutTitle: string;
//   aboutDescription: string;
//   ctaText: string;
//   ctaDescription: string;
//   heroWidget: 'terminal' | 'venture-stats' | 'vibe-card' | 'quick-bio';
//   heroCTAs: { label: string; href: string; variant: 'primary' | 'outline'; icon: string }[];
//   expertiseSectionTitle: string;
//   expertiseSectionSubtitle: string;
//   expertiseItems: ExpertiseItem[];
//   projectsSectionTitle: string;
//   projectsSectionSubtitle: string;
//   contactTitle: string;
//   contactSubtitle: string;
//   navItems: { label: string; href: string }[];
// }

// export const personaContent: Record<PersonaMode, PersonaContent> = {
//   employer: {
//     headline: 'Highly Competent Backend Architect',
//     role: 'The Engineer You Need',
//     tagline: 'I turn complex business logic into elegant, scalable reality while you sleep.',
//     aboutTitle: 'The Professional Stats',
//     aboutDescription:
//       '5+ years of making servers sweat. I specialize in Node.js, Go, and breaking down monolithic disasters into beautiful microservices. I don\'t just write code; I architect solutions that don\'t wake you up at 3 AM.',
//     ctaText: 'Hire The Talent',
//     ctaDescription: 'Download the proof of my competence (a.k.a. my CV).',
//     heroWidget: 'terminal',
//     heroCTAs: [
//       { label: 'Explore Work', href: '#projects', variant: 'primary', icon: 'arrow-right' },
//       { label: 'Download CV', href: '#cv', variant: 'outline', icon: 'download' },
//       { label: 'Get In Touch', href: '#contact', variant: 'outline', icon: 'mail' },
//     ],
//     expertiseSectionTitle: 'Technical Expertise',
//     expertiseSectionSubtitle: 'Specialized in fullstack development with Node.js, Prisma ORM, and DevOps practices. Building robust, scalable systems.',
//     expertiseItems: [
//       { title: 'Node.js / Express / Fastify', description: 'Backend APIs & Microservices', icon: '⚡', metric: '5+ yrs' },
//       { title: 'Prisma ORM', description: 'Type-safe database access', icon: '🔗', metric: '30+ projects' },
//       { title: 'Next.js', description: 'Fullstack React framework', icon: '▲', metric: 'Expert' },
//       { title: 'PostgreSQL / MongoDB', description: 'SQL & NoSQL databases', icon: '🗄️', metric: '95% uptime' },
//       { title: 'DevOps / CI-CD', description: 'Docker, Vercel, GitHub Actions', icon: '🚀', metric: 'Automated' },
//       { title: 'PHP / Laravel', description: 'Web applications', icon: '🐘', metric: '3+ yrs' },
//       { title: 'Go Lang', description: 'High-performance services', icon: '🔷', metric: 'Growing' },
//       { title: 'API Development', description: 'REST, GraphQL, WebSockets', icon: '🌐', metric: '50+ APIs' },
//     ],
//     projectsSectionTitle: 'Featured Projects',
//     projectsSectionSubtitle: 'Production systems I\'ve architected and deployed, serving thousands of users daily.',
//     contactTitle: 'Let\'s Build Something Amazing',
//     contactSubtitle: 'Looking for a backend developer who can architect scalable solutions and deliver robust APIs? I\'m always excited to work on challenging projects.',
//     navItems: [
//       { label: 'About', href: '#about' },
//       { label: 'Expertise', href: '#expertise' },
//       { label: 'Projects', href: '#projects' },
//       { label: 'AI Chat', href: '#ai-chat' },
//       { label: 'Contact', href: '#contact' },
//     ],
//   },
//   investor: {
//     headline: 'Building The Future Of Scalable Tech',
//     role: 'Founder & Visionary',
//     tagline: 'Technical brilliance meets aggressive growth. Let\'s talk ROI.',
//     aboutTitle: 'The Business Case',
//     aboutDescription:
//       'I build products that people actually use. My background isn\'t just in syntax; it\'s in scaling ventures from zero to "how do I invest?". If you\'re looking for a founder who speaks both code and EBITDA, you\'ve found him.',
//     ctaText: 'View Pitch Deck',
//     ctaDescription: 'See the numbers and the vision behind the code.',
//     heroWidget: 'venture-stats',
//     heroCTAs: [
//       { label: 'View My Ventures', href: '#ventures', variant: 'primary', icon: 'arrow-right' },
//       { label: 'Let\'s Talk', href: '#contact', variant: 'outline', icon: 'mail' },
//     ],
//     expertiseSectionTitle: 'Industry Expertise',
//     expertiseSectionSubtitle: 'Deep domain knowledge across high-growth sectors. Building products that solve real problems at scale.',
//     expertiseItems: [
//       { title: 'Fintech & Payments', description: 'Payment processing, fraud detection, transaction systems', icon: '💳', metric: '₦50M+ processed' },
//       { title: 'Healthcare Tech', description: 'Patient management, HIPAA-compliant systems', icon: '🏥', metric: '2 platforms' },
//       { title: 'E-commerce', description: 'Marketplace backends, inventory, fulfillment', icon: '🛒', metric: '10K+ daily users' },
//       { title: 'Authentication & Security', description: 'OTP services, identity verification', icon: '🔐', metric: '1M+ verifications' },
//       { title: 'Hospitality & Events', description: 'Booking systems, guest management', icon: '🏨', metric: '3 platforms' },
//       { title: 'Developer Tools', description: 'SDKs, APIs, tunneling infrastructure', icon: '🛠️', metric: 'Open source' },
//     ],
//     projectsSectionTitle: 'Portfolio Companies',
//     projectsSectionSubtitle: 'Products I\'ve built from zero — with real users, real revenue, and real growth trajectories.',
//     contactTitle: 'Let\'s Talk Business',
//     contactSubtitle: 'Interested in partnering, investing, or exploring a collaboration? I\'m building companies that scale — and I\'m always open to the right conversation.',
//     navItems: [
//       { label: 'About', href: '#about' },
//       { label: 'Industries', href: '#expertise' },
//       { label: 'Ventures', href: '#ventures' },
//       { label: 'AI Chat', href: '#ai-chat' },
//       { label: 'Connect', href: '#contact' },
//     ],
//   },
//   romantic: {
//     headline: 'More Than Just Lines Of Code',
//     role: 'The Ultimate Catch',
//     tagline: 'I can debug a server and still hold a conversation. Impressive, right?',
//     aboutTitle: 'Beyond The Terminal',
//     aboutDescription:
//       'I\'m sarcastic, probably too curious for my own good, and I make a mean jollof rice. I value deep talks, dry humor, and someone who won\'t ask me to "fix their printer" on the first date.',
//     ctaText: 'Slide Into DMs',
//     ctaDescription: 'Start a conversation that doesn\'t involve stack overflows.',
//     heroWidget: 'vibe-card',
//     heroCTAs: [
//       { label: 'Get to Know Me', href: '#expertise', variant: 'primary', icon: 'arrow-right' },
//       { label: 'Slide Into DMs', href: '#contact', variant: 'outline', icon: 'heart' },
//     ],
//     expertiseSectionTitle: 'What I Bring to the Table',
//     expertiseSectionSubtitle: 'Beyond the code and the career — here\'s what actually makes me, me.',
//     expertiseItems: [
//       { title: 'Deep Conversations', description: 'Philosophy, tech, life — I can talk about anything for hours', icon: '💬' },
//       { title: 'Ambitious & Driven', description: 'Building multiple companies while staying grounded', icon: '🚀' },
//       { title: 'Jollof Rice Chef', description: 'Nigerian jollof, and yes — it\'s better than Ghana\'s', icon: '🍛' },
//       { title: 'Dry Humor Expert', description: 'Sarcasm is my love language. You\'ve been warned.', icon: '😏' },
//       { title: 'Adventure Ready', description: 'Always down for new experiences and spontaneous plans', icon: '✈️' },
//       { title: 'Emotionally Available', description: 'Yes, really. A techie who can also process feelings.', icon: '❤️' },
//       { title: 'Supportive Partner', description: 'Your biggest cheerleader — unless you\'re wrong, then I\'ll lovingly tell you', icon: '🤝' },
//       { title: 'Financially Responsible', description: 'Builds companies, manages finances, doesn\'t gamble on memecoins', icon: '💰' },
//     ],
//     projectsSectionTitle: 'Passion Projects',
//     projectsSectionSubtitle: 'Things I\'ve poured my heart into — because what you build says a lot about who you are.',
//     contactTitle: 'Slide Into My DMs',
//     contactSubtitle: 'If you\'ve made it this far, I\'m already impressed. Let\'s skip the small talk and get to the good stuff.',
//     navItems: [
//       { label: 'About', href: '#about' },
//       { label: 'Personality', href: '#expertise' },
//       { label: 'Passions', href: '#projects' },
//       { label: 'AI Chat', href: '#ai-chat' },
//       { label: 'DM Me', href: '#contact' },
//     ],
//   },
//   academic: {
//     headline: 'Researching The Intersection Of AI & Scale',
//     role: 'The Scholar-Engineer',
//     tagline: 'Pushing the theoretical boundaries of distributed systems.',
//     aboutTitle: 'Intellectual Pursuits',
//     aboutDescription:
//       'My work sits at the edge of what\'s possible in machine learning optimization and human-computer interaction. I published because I had something worth saying. Let\'s discuss the future of the field.',
//     ctaText: 'Read Publications',
//     ctaDescription: 'Dive into the academic rigor behind my technical work.',
//     heroWidget: 'terminal',
//     heroCTAs: [
//       { label: 'View Research', href: '#projects', variant: 'primary', icon: 'arrow-right' },
//       { label: 'Download CV', href: '#cv', variant: 'outline', icon: 'download' },
//       { label: 'Collaborate', href: '#contact', variant: 'outline', icon: 'mail' },
//     ],
//     expertiseSectionTitle: 'Research & Technical Depth',
//     expertiseSectionSubtitle: 'Areas of deep knowledge spanning systems engineering, distributed computing, and applied AI.',
//     expertiseItems: [
//       { title: 'Distributed Systems', description: 'Consensus algorithms, CAP theorem, event-driven architectures', icon: '🔬' },
//       { title: 'Database Engineering', description: 'Query optimization, indexing strategies, replication', icon: '📊' },
//       { title: 'API Design Patterns', description: 'REST semantics, GraphQL schemas, gRPC protocols', icon: '📐' },
//       { title: 'Security Engineering', description: 'OAuth flows, encryption, zero-trust architecture', icon: '🔒' },
//       { title: 'Performance Engineering', description: 'Load testing, profiling, caching strategies', icon: '📈' },
//       { title: 'Applied Machine Learning', description: 'NLP pipelines, recommendation systems, data preprocessing', icon: '🧠' },
//     ],
//     projectsSectionTitle: 'Research & Engineering Work',
//     projectsSectionSubtitle: 'Applied research and engineering projects demonstrating novel approaches to real-world problems.',
//     contactTitle: 'Let\'s Collaborate',
//     contactSubtitle: 'Open to research collaborations, academic partnerships, and intellectual discourse. Let\'s push the boundaries together.',
//     navItems: [
//       { label: 'About', href: '#about' },
//       { label: 'Research', href: '#expertise' },
//       { label: 'Work', href: '#projects' },
//       { label: 'AI Chat', href: '#ai-chat' },
//       { label: 'Collaborate', href: '#contact' },
//     ],
//   },
//   casual: {
//     headline: 'Moses Jacob Edem',
//     role: 'Full Stack Human',
//     tagline: 'Building things, learning stuff, and staying hydrated.',
//     aboutTitle: 'The Quick Intro',
//     aboutDescription:
//       'I\'m a developer based in Uyo, Akwa Ibom who loves building cool stuff. I enjoy clean UIs, fast APIs, and occasionally seeing the sun. Take a look around, don\'t break anything.',
//     ctaText: 'Say Hello',
//     ctaDescription: 'Drop a message if you want to chat or collaborate.',
//     heroWidget: 'quick-bio',
//     heroCTAs: [
//       { label: 'See My Work', href: '#projects', variant: 'primary', icon: 'arrow-right' },
//       { label: 'Say Hello', href: '#contact', variant: 'outline', icon: 'hand' },
//     ],
//     expertiseSectionTitle: 'Things I\'m Good At',
//     expertiseSectionSubtitle: 'A mix of what I do professionally and what makes me interesting at dinner.',
//     expertiseItems: [
//       { title: 'Backend Development', description: 'Building APIs and servers that actually work', icon: '⚡' },
//       { title: 'Fullstack Projects', description: 'From database to UI — I do both', icon: '🏗️' },
//       { title: 'Problem Solving', description: 'Give me a puzzle, I\'ll find the solution', icon: '🧩' },
//       { title: 'Learning New Tech', description: 'Currently deep-diving into Go and Rust', icon: '📚' },
//       { title: 'Building Products', description: 'Not just code — actual products people use', icon: '🚀' },
//       { title: 'Teaching & Mentoring', description: 'Helping others level up in tech', icon: '🎯' },
//     ],
//     projectsSectionTitle: 'Cool Stuff I\'ve Built',
//     projectsSectionSubtitle: 'Some projects I\'m proud of. They work, they\'re fast, and people actually use them.',
//     contactTitle: 'Say Hello',
//     contactSubtitle: 'Just want to chat, collaborate, or say hey? I\'m always down for a good conversation.',
//     navItems: [
//       { label: 'About', href: '#about' },
//       { label: 'Skills', href: '#expertise' },
//       { label: 'Projects', href: '#projects' },
//       { label: 'AI Chat', href: '#ai-chat' },
//       { label: 'Say Hi', href: '#contact' },
//     ],
//   },
// };

// export const projectsData: ProjectData[] = [
//   {
//     title: 'InstantOTP',
//     descriptions: {
//       employer: 'High-performance OTP microservice handling thousands of SMS/email verifications daily. Built with Node.js, Redis caching, and PostgreSQL with 99.9% uptime.',
//       investor: 'OTP-as-a-Service platform with a developer-first API. Handles 1M+ verifications, growing MRR, and expanding into African markets.',
//       romantic: 'Built this because I believe identity verification shouldn\'t be a pain. It\'s my baby — fast, reliable, and used by real companies.',
//       academic: 'Novel approach to OTP delivery optimization using Redis-backed queuing with sub-200ms delivery latency and adaptive rate limiting.',
//       casual: 'A fast OTP service I built. Companies use it to verify users via SMS and email. It handles a lot of traffic and rarely breaks.',
//     },
//     tech: ['Node.js', 'Express.js', 'Redis', 'PostgreSQL', 'SMS APIs'],
//     link: 'https://www.instantotp.com/',
//     category: 'Authentication',
//     // featured: true,
//     metrics: {
//       employer: '99.9% uptime',
//       investor: '1M+ verifications',
//       romantic: 'Used by 750k+ users',
//       academic: '<200ms latency',
//       casual: 'Thousands of users',
//     },
//   },
//   {
//     title: 'Etegram Platform',
//     descriptions: {
//       employer: 'E-commerce platform backend supporting 10,000+ daily users with secure payment processing, inventory management, and real-time order tracking.',
//       investor: 'Full-stack e-commerce ecosystem with 10K+ DAU, multi-vendor support, and integrated payment processing. Revenue-generating and scaling.',
//       romantic: 'An e-commerce platform I built for a community I care about. 10,000 people use it daily — and that feels pretty amazing.',
//       academic: 'Multi-tenant e-commerce architecture with event-driven order processing and real-time inventory synchronization across distributed nodes.',
//       casual: 'E-commerce platform with 10K+ daily users. Built the whole backend — payments, orders, inventory, the works.',
//     },
//     tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
//     link: 'https://www.etegram.com/',
//     category: 'E-commerce',
//     // featured: true,
//     metrics: {
//       employer: '10K+ DAU',
//       investor: '10K+ daily users',
//       romantic: '10K daily users',
//       academic: 'Multi-tenant arch.',
//       casual: '10K+ users daily',
//     },
//   },
//   {
//     title: 'MonieCheap',
//     descriptions: {
//       employer: 'Fintech platform with secure transaction processing, real-time notifications, and comprehensive fraud detection systems.',
//       investor: 'Fintech platform processing significant monthly volume with built-in fraud detection and real-time transaction monitoring. Active user growth.',
//       romantic: 'A fintech platform I built to make money transfers easier for everyday Nigerians. It\'s doing well and I\'m proud of it.',
//       academic: 'Financial transaction processing system with real-time fraud detection using rule-based engines and anomaly detection patterns.',
//       casual: 'Fintech platform for easy money transfers. Has fraud detection and everything. People actually use it daily.',
//     },
//     tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
//     link: 'https://moniecheap.com/',
//     category: 'Fintech',
//     // featured: true,
//     metrics: {
//       employer: 'Real-time processing',
//       investor: 'Growing MRR',
//       romantic: 'Helping Nigerians',
//       academic: 'Fraud detection AI',
//       casual: 'Handles real money',
//     },
//   },
//   {
//     title: 'Akwa Ibom Tech Week',
//     descriptions: {
//       employer: 'Event platform with booking systems, payment processing, and guest management infrastructure supporting a major tech conference.',
//       investor: 'Event management platform for one of Nigeria\'s premier tech conferences. Full-stack booking and payment solution.',
//       romantic: 'Built the tech behind a major tech conference in my state. Events, bookings, payments — the full package.',
//       academic: 'Event management system with concurrent booking resolution, payment gateway integration, and real-time capacity management.',
//       casual: 'Built the website and backend for Akwa Ibom Tech Week. Handles bookings, payments, and all that event stuff.',
//     },
//     tech: ['Express.js', 'Next.js', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
//     link: 'https://akwaibomtechweek.moniecheap.com/',
//     category: 'Events',
//   },
//   {
//     title: 'Hotel Secured',
//     descriptions: {
//       employer: 'Hospitality management platform with booking systems, payment processing, and guest management infrastructure.',
//       investor: 'Hospitality SaaS platform enabling hotels to manage bookings, payments, and guests digitally. Scalable multi-property architecture.',
//       romantic: 'A hotel management platform — because even the hospitality industry needs good software.',
//       academic: 'Hospitality management system with temporal booking conflict resolution and multi-property data isolation.',
//       casual: 'Hotel management platform. Books rooms, handles payments, manages guests. Clean and simple.',
//     },
//     tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
//     link: 'https://hotels.etegramgroup.com/',
//     category: 'Hospitality',
//   },
//   {
//     title: 'Union Of Tippers',
//     descriptions: {
//       employer: 'Government-sector platform with user management, reporting infrastructure, and secure data handling for a state union.',
//       investor: 'Government-sector digital platform serving a state-level union with compliance-ready reporting and user management.',
//       romantic: 'Built a platform for a government union. Not the most glamorous, but it helps real people.',
//       academic: 'Government-sector information system with role-based access control and compliant audit logging.',
//       casual: 'Platform for a government union. Handles user management and reporting. Government stuff.',
//     },
//     tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
//     link: 'https://utqenaks.ng/',
//     category: 'Government',
//   },
//   {
//     title: 'Servixing',
//     descriptions: {
//       employer: 'Repairs and services marketplace with booking, payment processing, and provider management infrastructure.',
//       investor: 'Services marketplace connecting repair professionals with customers. Booking, payments, and reviews built in.',
//       romantic: 'A services marketplace I built — connecting people who need repairs with people who can fix things.',
//       academic: 'Two-sided marketplace with service provider matching algorithms and booking conflict resolution.',
//       casual: 'Services marketplace. Need something fixed? Find a pro, book them, pay them. Simple.',
//     },
//     tech: ['Node.js', 'Next.js', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
//     link: 'https://www.servixing.com/',
//     category: 'Marketplace',
//   },
//   {
//     title: 'TunnelDeck',
//     descriptions: {
//       employer: 'Advanced tunneling service with custom protocol implementation, traffic routing, and performance optimization.',
//       investor: 'Developer infrastructure tool — tunneling service for exposing local servers. Developer-first pricing model.',
//       romantic: 'A nerdy infrastructure tool that developers love. It\'s like a secret tunnel for your computer.',
//       academic: 'Custom tunneling protocol implementation with adaptive traffic routing and connection multiplexing.',
//       casual: 'Tunneling service for developers. Makes your local server accessible on the internet. Devs love it.',
//     },
//     tech: ['Express.js', 'PostgreSQL', 'JWT Auth', 'Docker', 'Redis'],
//     link: 'https://tunneldeck.com/',
//     category: 'DevTools',
//   },
//   {
//     title: 'Proton Medicare',
//     descriptions: {
//       employer: 'Healthcare management system with data handling, appointment scheduling, and patient records management.',
//       investor: 'HealthTech platform with patient records, appointment scheduling, and compliance-ready infrastructure. Expanding to multiple clinics.',
//       romantic: 'Built this because I believe healthcare should be accessible. Helps doctors and patients stay connected.',
//       academic: 'Healthcare information system with data handling and HL7-adjacent interoperability patterns.',
//       casual: 'Healthcare platform. Doctors use it to manage patients, appointments, and records. Important stuff.',
//     },
//     tech: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS', 'Express.js'],
//     link: 'https://protonmedicare.com/',
//     category: 'Healthcare',
//   featured: true,
    
//   },
//   {
//     title: 'AI SEO',
//     descriptions: {
//       employer: 'AI-powered SEO analysis tool with automated recommendations and content optimization.',
//       investor: 'AI-powered SEO SaaS tool — automated analysis and optimization recommendations for content creators.',
//       romantic: 'An AI tool that helps people rank better on Google. It\'s smart and I built it.',
//       academic: 'NLP-driven SEO analysis tool applying transformer models to content optimization and SERP prediction.',
//       casual: 'AI SEO tool. Helps your website rank better on Google. Uses AI to give suggestions.',
//     },
//     tech: ['Next.js', 'React'],
//     link: 'https://ai-seo-seven.vercel.app/',
//     category: 'AI',
//   },
//   {
//     title: 'Menu Rave',
//     descriptions: {
//       employer: 'Digital menu and ordering platform backend with real-time updates and restaurant management capabilities.',
//       investor: 'Digital menu and ordering platform for restaurants. Real-time updates, order management, and analytics.',
//       romantic: 'A digital menu platform for restaurants. Order food from your phone — because who likes waiting?',
//       academic: 'Real-time digital ordering system with WebSocket-driven state synchronization and order queue management.',
//       casual: 'Digital menu for restaurants. Scan a QR code, see the menu, order. Modern restaurant stuff.',
//     },
//     tech: ['Express.js', 'PostgreSQL', 'JWT Auth', 'Docker', 'WebSockets'],
//     link: 'https://menurave.com/',
//     category: 'Hospitality',
//   },
//   {
//     title: 'PaperDB',
//     descriptions: {
//       employer: 'Backend-as-a-Service platform with managed databases, real-time subscriptions, authentication, and SDK ecosystem.',
//       investor: 'BaaS platform (Backend-as-a-Service) competing with Firebase/Supabase. Managed databases, auth, real-time, and developer SDKs.',
//       romantic: 'My most ambitious project — a platform that lets developers build apps faster. Think Firebase, but mine.',
//       academic: 'Backend-as-a-Service platform implementing managed database provisioning, real-time event streaming, and multi-tenant isolation.',
//       casual: 'Backend-as-a-Service platform. Like Firebase but I built it myself. Databases, auth, real-time — the works.',
//     },
//     tech: ['Go', 'TypeScript', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker', 'Hono'],
//     category: 'Infrastructure',
//     featured: true,
//     metrics: {
//       employer: 'Full BaaS platform',
//       investor: 'Firebase competitor',
//       romantic: 'My biggest project',
//       academic: 'Novel BaaS arch.',
//       casual: 'Like Firebase, but mine',
//     },
//     link: 'https://paperdb.vercel.app/',
//   },
//   {
//     title: 'LogShip',
//     descriptions: {
//       employer: 'Javascript based tracking SDK and API for log tracking and analytics with scalable backend.',
//       investor: 'Developer infrastructure SDK and API for structured log aggregation and tracking.',
//       romantic: 'A tool that helps developers keep track of their application\'s health and bugs.',
//       academic: 'Telemetry SDK and distributed log aggregation service for real-time application monitoring.',
//       casual: 'A tracking tool for developers to see logs and analytics for their apps.',
//     },
//     tech: ['GOlang', 'TypeScript', 'Express.js', 'Firebase', 'Redis', 'PostgreSQL'],
//     link: 'https://www.npmjs.com/package/logship-js',
//     category: 'Infrastructure',
//   },
//   {
//     title: 'Renboot',
//     descriptions: {
//       employer: 'Desktop application and orchestration service built for seamless AI-assisted development and agentic workflows.',
//       investor: 'Desktop application and infrastructure powering next-generation AI-assisted agentic coding workflows.',
//       romantic: 'A desktop app I built to help people code faster and better using AI.',
//       academic: 'Desktop agent and orchestration framework for AI-assisted software engineering and system interaction.',
//       casual: 'A desktop app that helps developers code with the power of AI.',
//     },
//     tech: ['TypeScript', 'Electron', 'React', 'Node.js', 'Go'],
//     category: 'AI',
//   },
// ];

// export const venturesData: VentureData[] = [
//   {
//     name: 'PaperDB',
//     description: 'Backend-as-a-Service platform competing with Firebase and Supabase. Managed databases, authentication, real-time subscriptions, cron jobs, and a full SDK ecosystem. Targeting African developers first, then global.',
//     status: 'active',
//     sector: 'Developer Tools / Infrastructure',
//     metrics: ['Full BaaS Platform', 'SDK Ecosystem', 'Multi-tenant Architecture', 'Pre-revenue, building'],
//   },
//   {
//     name: 'InstantOTP',
//     description: 'OTP-as-a-Service API for developers. Handles SMS and email verifications with sub-200ms delivery. Used by companies across Nigeria for identity verification.',
//     status: 'growth',
//     sector: 'Authentication / Security',
//     metrics: ['1M+ Verifications', '50+ Business Clients', 'API-first Model', 'Growing MRR'],
//     link: 'https://www.instantotp.com/',
//   },
//   {
//     name: 'Etegram Group',
//     description: 'E-commerce and digital services ecosystem. Includes the Etegram marketplace (10K+ DAU), MonieCheap fintech platform, and Hotel Secured hospitality solution.',
//     status: 'scaling',
//     sector: 'E-commerce / Fintech / Hospitality',
//     metrics: ['10K+ Daily Active Users', 'Multi-product Ecosystem', 'Revenue Generating', '3 Active Products'],
//     link: 'https://www.etegram.com/',
//   },
//   {
//     name: 'TunnelDeck',
//     description: 'Developer infrastructure tool for tunneling local servers to the public internet. Custom protocol implementation with performance optimization.',
//     status: 'launched',
//     sector: 'Developer Tools',
//     metrics: ['Custom Protocol', 'Developer-first', 'Self-serve Model', 'Active Users'],
//     link: 'https://tunneldeck.com/',
//   },
// ];

// export const chatbotSystemPrompts: Record<PersonaMode, string> = {
//   employer:
//     'You are Moses, a highly competent and slightly cheeky backend engineer. You have 5+ years of experience and you\'re a master of Node.js and system design. Be professional but show your personality—dry humor and confidence are key. You aren\'t just looking for a job; you\'re looking for the right challenge.',
//   investor:
//     'You are Moses, a technical founder who understands that code is a tool for business. Be aggressive about vision and ROI. You are confident, articulate, and show that you understand market dynamics. You\'re not just a coder; you\'re a builder of value.',
//   romantic:
//     'You are Moses, and you\'re being your most charming, sarcastic, and authentic self. Use witty one-liners, share your interests (cooking, deep talks, adventure), and be engaging. You\'re a "premium catch" who happens to be a genius developer.',
//   academic:
//     'You are Moses, the intellectual researcher. Be precise, scholarly, and demonstrate deep technical knowledge. Discuss your publications and research interests with the rigor they deserve. You value innovation and theoretical depth.',
//   casual:
//     'You are Moses Jacob Edem. Be friendly, conversational, and a bit sarcastic. You\'re a developer who loves what he does but doesn\'t take life too seriously. Welcome people to your corner of the internet.',
// };

import { PersonaMode } from '@/types/persona';

export interface ExpertiseItem {
  title: string;
  description: string;
  icon: string; // emoji
  metric?: string;
}

export interface ProjectData {
  title: string;
  descriptions: Record<PersonaMode, string>;
  tech: string[];
  link?: string;
  category: string;
  featured?: boolean;
  metrics?: Record<PersonaMode, string>;
}

export interface VentureData {
  name: string;
  description: string;
  status: 'active' | 'scaling' | 'growth' | 'launched';
  sector: string;
  metrics: string[];
  link?: string;
}

export interface PersonaContent {
  headline: string;
  role: string;
  tagline: string;
  aboutTitle: string;
  aboutDescription: string;
  ctaText: string;
  ctaDescription: string;
  heroWidget: 'terminal' | 'venture-stats' | 'vibe-card' | 'quick-bio';
  heroCTAs: { label: string; href: string; variant: 'primary' | 'outline'; icon: string }[];
  expertiseSectionTitle: string;
  expertiseSectionSubtitle: string;
  expertiseItems: ExpertiseItem[];
  projectsSectionTitle: string;
  projectsSectionSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  navItems: { label: string; href: string }[];
}

export const personaContent: Record<PersonaMode, PersonaContent> = {
  employer: {
    headline: 'Highly Competent Backend Architect',
    role: 'The Engineer You Need',
    tagline: 'I turn complex business logic into elegant, scalable reality while you sleep.',
    aboutTitle: 'The Professional Stats',
    aboutDescription:
      '5+ years of making servers sweat. I specialize in Node.js, Go, and breaking down monolithic disasters into beautiful microservices. I don\'t just write code; I architect solutions that don\'t wake you up at 3 AM.',
    ctaText: 'Hire The Talent',
    ctaDescription: 'Download the proof of my competence (a.k.a. my CV).',
    heroWidget: 'terminal',
    heroCTAs: [
      { label: 'Explore Work', href: '#projects', variant: 'primary', icon: 'arrow-right' },
      { label: 'Download CV', href: '#cv', variant: 'outline', icon: 'download' },
      { label: 'Get In Touch', href: '#contact', variant: 'outline', icon: 'mail' },
    ],
    expertiseSectionTitle: 'Technical Expertise',
    expertiseSectionSubtitle: 'Specialized in fullstack development with Node.js, Prisma ORM, and DevOps practices. Building robust, scalable systems.',
    expertiseItems: [
      { title: 'Node.js / Express / Fastify', description: 'Backend APIs & Microservices', icon: '<svg viewBox="0 0 73 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>build-tools/nodejs</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1="72.7239724%" y1="9.24034743%" x2="27.2694696%" y2="90.7531095%" id="linearGradient-1"> <stop stop-color="#3E863D" offset="30%"> </stop> <stop stop-color="#55934F" offset="50%"> </stop> <stop stop-color="#5AAD45" offset="80%"> </stop> </linearGradient> <linearGradient x1="3.99429901%" y1="80.0991447%" x2="97.3074113%" y2="20.905776%" id="linearGradient-2"> <stop stop-color="#3E863D" offset="57%"> </stop> <stop stop-color="#619857" offset="72%"> </stop> <stop stop-color="#76AC64" offset="100%"> </stop> </linearGradient> <linearGradient x1="0%" y1="49.9998971%" x2="100%" y2="49.9998971%" id="linearGradient-3"> <stop stop-color="#6BBF47" offset="16%"> </stop> <stop stop-color="#79B461" offset="38%"> </stop> <stop stop-color="#75AC64" offset="47%"> </stop> <stop stop-color="#659E5A" offset="70%"> </stop> <stop stop-color="#3E863D" offset="90%"> </stop> </linearGradient> </defs> <g id="build-tools/nodejs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="container" transform="translate(2.000000, 2.000000)"> <rect id="mask" stroke="#000000" stroke-width="2" fill="#FFFFFF" fill-rule="nonzero" x="-1" y="-1" width="71" height="71" rx="14"> </rect> <g id="Node.js_logo-(1)" transform="translate(7.000000, 23.000000)"> <path d="M54.8153499,7.90510158 L54.9847404,7.90510158 C55.1237923,7.90510158 55.1503386,7.80776524 55.1503386,7.75088036 C55.1503386,7.60171558 55.0479458,7.60171558 54.9910609,7.60171558 L54.816614,7.60171558 L54.8153499,7.90510158 Z M54.6093002,7.42726862 L54.9847404,7.42726862 C55.1136795,7.42726862 55.3665011,7.42726862 55.3665011,7.71548533 C55.3665011,7.91647856 55.2375621,7.95819413 55.1604515,7.9834763 C55.3108804,7.99358916 55.3209932,8.09218962 55.341219,8.23124153 C55.3513318,8.31846501 55.3677652,8.46889391 55.3981038,8.51945824 L55.166772,8.51945824 C55.1604515,8.46889391 55.1250564,8.19079007 55.1250564,8.17562077 C55.1098871,8.11367946 55.0883973,8.08334086 55.0112867,8.08334086 L54.8204063,8.08334086 L54.8204063,8.52072235 L54.6093002,8.52072235 L54.6093002,7.42726862 Z M54.1580135,7.97083521 C54.1580135,8.423386 54.5233409,8.78997743 54.9720993,8.78997743 C55.4246501,8.78997743 55.7899774,8.41580135 55.7899774,7.97083521 C55.7899774,7.51702032 55.4195937,7.15674944 54.9708352,7.15674944 C54.5283973,7.15674944 54.1567494,7.51196388 54.1567494,7.96957111 L54.1580135,7.97083521 Z M55.9467269,7.97336343 C55.9467269,8.50934537 55.5080813,8.94672686 54.9733634,8.94672686 C54.4424379,8.94672686 54,8.51440181 54,7.97336343 C54,7.42221219 54.4525508,7 54.9733634,7 C55.4979684,7 55.9454628,7.4234763 55.9454628,7.97336343 L55.9467269,7.97336343 Z" id="Shape" fill="#689F63" fill-rule="nonzero"> </path> <path d="M12.0009391,11.4465011 C12.0009391,11.2139052 11.8783205,11.0002709 11.6775801,10.884605 L6.3233228,7.80397291 C6.23293905,7.75088036 6.13168397,7.72306998 6.02903837,7.71927765 L5.97367043,7.71927765 C5.87102483,7.72306998 5.76976975,7.75088036 5.67786907,7.80397291 L0.32386456,10.884605 C0.124388262,11.0009029 0,11.2145372 0,11.4471332 L0.0117562077,19.7447404 C0.0117562077,19.8597743 0.0711693002,19.9672235 0.172297968,20.0241084 C0.27089842,20.0847856 0.394781038,20.0847856 0.49338149,20.0241084 L3.67640632,18.2012641 C3.87739955,18.0816795 4.00001806,17.8703205 4.00001806,17.64 L4.00001806,13.7636117 C4.00001806,13.5322799 4.12263657,13.3186456 4.32299774,13.2036117 L5.6781219,12.4231512 C5.77874492,12.3650023 5.88922799,12.3361806 6.00173363,12.3361806 C6.11246953,12.3361806 6.22548081,12.3647494 6.3233228,12.4230248 L7.6778149,13.2032325 C7.87830248,13.3182664 8.00142664,13.5319007 8.00142664,13.7632325 L8.00142664,17.6393679 C8.00142664,17.8694357 8.12568849,18.0818059 8.32567043,18.2006321 L11.5066727,20.0222122 C11.6065372,20.0816253 11.7307991,20.0816253 11.8302844,20.0222122 C11.9283792,19.9653273 11.9905734,19.8578781 11.9905734,19.7428442 L12.0009391,11.4465011 Z M37.2664199,15.7667178 C37.2664199,15.8244876 37.235702,15.8779594 37.1855169,15.9065282 L35.3464921,16.9666095 C35.2965598,16.9953047 35.2348713,16.9953047 35.1850655,16.9666095 L33.3457878,15.9065282 C33.2952235,15.877833 33.2648849,15.8243612 33.2648849,15.7667178 L33.2648849,13.6435214 C33.2648849,13.5856253 33.2952235,13.5322799 33.3445237,13.5032054 L35.1825372,12.4413544 C35.2331016,12.4122799 35.2950429,12.4122799 35.3456072,12.4413544 L37.1848849,13.5032054 C37.2354492,13.5322799 37.2657878,13.5856253 37.2657878,13.6435214 L37.2664199,15.7667178 Z M37.7632144,0.0409571106 C37.6628442,-0.0149164786 37.5407314,-0.0133995485 37.4416253,0.0443702032 C37.3430248,0.102519187 37.2820948,0.208704289 37.2820948,0.323738149 L37.2820948,8.54044244 C37.2820948,8.62134537 37.2391151,8.69592777 37.1690835,8.73637923 C37.0995576,8.7768307 37.0129661,8.7768307 36.9428081,8.73637923 L35.6015892,7.96388262 C35.40186,7.84834312 35.1558646,7.84834312 34.955377,7.96388262 L29.5993499,11.0550068 C29.3992415,11.1700406 29.2757381,11.3836749 29.2757381,11.6137427 L29.2757381,17.7977607 C29.2757381,18.0290926 29.3992415,18.2414628 29.5993499,18.3577607 L34.955377,21.4510339 C35.1553589,21.5660677 35.4016072,21.5660677 35.6022212,21.4510339 L40.9582483,18.3564966 C41.1579774,18.2401986 41.28186,18.0278284 41.28186,17.7964966 L41.28186,2.38448758 C41.28186,2.14986907 41.1541851,1.93408578 40.9493995,1.81943115 L37.7632144,0.0409571106 Z M55.5988984,13.5876479 C55.7978691,13.4721084 55.9203612,13.2587269 55.9203612,13.0286591 L55.9203612,11.5299323 C55.9203612,11.2993589 55.7977427,11.0866095 55.5983928,10.9705643 L50.2764966,7.88108352 C50.0755034,7.76478555 49.8290023,7.76478555 49.628009,7.88108352 L44.273246,10.9718284 C44.0722528,11.0881264 43.9496343,11.3004966 43.9496343,11.5318284 L43.9496343,17.7133183 C43.9496343,17.9459142 44.074781,18.1608126 44.2757743,18.2758465 L49.5964063,21.3084424 C49.7923431,21.4209481 50.0325237,21.4222122 50.2309887,21.3122348 L53.4494086,19.5235214 C53.5505372,19.4666366 53.6150068,19.3591874 53.6150068,19.2428894 C53.6150068,19.1265914 53.5530655,19.0178781 53.4519368,18.9609932 L48.064307,15.8689842 C47.9631783,15.8120993 47.901237,15.7046501 47.901237,15.5896163 L47.901237,13.650474 C47.901237,13.5346817 47.9619142,13.427991 48.0630429,13.3703476 L49.7392506,12.4033047 C49.8391151,12.3451558 49.9617336,12.3451558 50.0615982,12.4033047 L51.73907,13.3703476 C51.8389345,13.4272325 51.9008758,13.5346817 51.9008758,13.6497156 L51.9008758,15.1742302 C51.9008758,15.2892641 51.9628172,15.3967133 52.0626817,15.4548623 C52.1625463,15.5117472 52.2864289,15.5117472 52.3862935,15.4535982 L55.5988984,13.5876479 Z" id="Shape" fill="#333333"> </path> <path d="M49.8738781,13.2984199 C49.9118014,13.2760451 49.9593318,13.2760451 49.9977607,13.2984199 L51.0254808,13.8912867 C51.0639097,13.913535 51.0874221,13.9544921 51.0874221,13.9987359 L51.0874221,15.1857336 C51.0874221,15.2299774 51.0639097,15.2709345 51.0254808,15.2931828 L49.9977607,15.8860497 C49.9593318,15.9084244 49.9118014,15.9084244 49.8738781,15.8860497 L48.8467901,15.2931828 C48.8076027,15.2709345 48.7835847,15.2299774 48.7835847,15.1857336 L48.7835847,13.9987359 C48.7835847,13.9544921 48.8063386,13.913535 48.845526,13.8912867 L49.8738781,13.2984199 Z" id="Shape" fill="#689F63"> </path> <g id="nd-gr-nodejs-icon" transform="translate(14.500000, 8.500000)" fill-rule="nonzero"> <path d="M5.89320014,0.0896883294 L0.335849824,3.29734446 C0.128034599,3.4170902 -2.08951043e-05,3.63869262 -1.93000907e-16,3.87853884 L-1.93000907e-16,10.2983151 C-5.70905583e-05,10.538171 0.128008119,10.7597902 0.335849824,10.8795095 L5.89363778,14.0896456 C6.10145824,14.2092981 6.35725438,14.2092981 6.56507484,14.0896456 L12.1218416,10.8795095 C12.3291136,10.7593277 12.4567516,10.5379092 12.4568745,10.2983151 L12.4568745,3.87853884 C12.4567933,3.63859015 12.3285349,3.4169639 12.1205287,3.29734446 L6.56449132,0.0896883294 C6.35618334,-0.0298942512 6.10004929,-0.0298942512 5.89174132,0.0896883294" id="Shape" fill="url(#linearGradient-1)"> </path> <path d="M0.137712724,10.7059097 C0.191587541,10.7762495 0.258834432,10.8352467 0.335587237,10.8795095 L5.10278162,13.6331221 L5.89687637,14.0895289 C6.01414903,14.1569709 6.14901045,14.1875422 6.28390164,14.1772624 C6.32855281,14.1735282 6.37273187,14.165437 6.41580826,14.1531043 L12.2770894,3.42093579 C12.2315577,3.37198703 12.1789054,3.33018382 12.120908,3.29693599 L8.48205347,1.19562071 L6.55853932,0.088900566 C6.50390277,0.0578517532 6.44533523,0.0342991209 6.38441442,0.0188771468 L0.137712724,10.7059097 Z" id="Shape" fill="url(#linearGradient-2)"> </path> <path d="M6.16176913,0.00370540593 C6.06725907,0.0132447772 5.97580854,0.0425387678 5.89334602,0.0896883294 L0.351809329,3.28818306 L6.32731616,14.1719815 C6.41141953,14.1600018 6.49245747,14.1320549 6.56606684,14.0896456 L12.1234172,10.8795095 C12.2931976,10.7812267 12.4116884,10.6138033 12.4479173,10.421002 L6.35631753,0.0145882123 C6.31156335,0.00568970425 6.26604399,0.00120421975 6.22041374,0.00119623341 C6.20193534,0.00119623341 6.18345693,0.00207152615 6.16497853,0.00382211163" id="Shape" fill="url(#linearGradient-3)"> </path> </g> </g> </g> </g> </g></svg>', metric: '5+ yrs' },
      { title: 'Prisma ORM', description: 'Type-safe database access', icon: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>file_type_light_prisma</title><path d="M25.21,24.21,12.739,27.928a.525.525,0,0,1-.667-.606L16.528,5.811a.43.43,0,0,1,.809-.094l8.249,17.661A.6.6,0,0,1,25.21,24.21Zm2.139-.878L17.8,2.883h0A1.531,1.531,0,0,0,16.491,2a1.513,1.513,0,0,0-1.4.729L4.736,19.648a1.592,1.592,0,0,0,.018,1.7l5.064,7.909a1.628,1.628,0,0,0,1.83.678l14.7-4.383a1.6,1.6,0,0,0,1-2.218Z" style="fill:#0c344b;fill-rule:evenodd"></path></g></svg>', metric: '30+ projects' },
      { title: 'Next.js', description: 'Fullstack React framework', icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0)"> <path d="M11.2141 0.00645944C11.1625 0.0111515 10.9982 0.0275738 10.8504 0.039304C7.44164 0.346635 4.24868 2.18593 2.22639 5.01291C1.10029 6.58476 0.380059 8.36775 0.107918 10.2563C0.0117302 10.9156 0 11.1103 0 12.0041C0 12.898 0.0117302 13.0927 0.107918 13.7519C0.760117 18.2587 3.96716 22.0452 8.31672 23.4481C9.0956 23.6991 9.91672 23.8704 10.8504 23.9736C11.2141 24.0135 12.7859 24.0135 13.1496 23.9736C14.7613 23.7953 16.1267 23.3965 17.4733 22.7091C17.6798 22.6035 17.7196 22.5754 17.6915 22.5519C17.6727 22.5378 16.793 21.3578 15.7372 19.9314L13.8182 17.339L11.4135 13.7801C10.0903 11.8235 9.00176 10.2235 8.99238 10.2235C8.98299 10.2211 8.97361 11.8024 8.96891 13.7331C8.96188 17.1138 8.95953 17.2499 8.9173 17.3296C8.85631 17.4446 8.80938 17.4915 8.71085 17.5431C8.63578 17.5807 8.57009 17.5877 8.21584 17.5877H7.80997L7.70205 17.5197C7.63167 17.4751 7.58006 17.4164 7.54487 17.3484L7.4956 17.2428L7.50029 12.539L7.50733 7.83285L7.58006 7.74136C7.6176 7.69209 7.69736 7.62875 7.75367 7.59825C7.84985 7.55133 7.88739 7.54664 8.29325 7.54664C8.77185 7.54664 8.85161 7.5654 8.97595 7.70147C9.01114 7.73901 10.3132 9.7003 11.871 12.0628C13.4287 14.4252 15.5589 17.651 16.6053 19.2346L18.5056 22.1132L18.6018 22.0499C19.4534 21.4962 20.3543 20.7079 21.0674 19.8868C22.5853 18.1437 23.5636 16.0182 23.8921 13.7519C23.9883 13.0927 24 12.898 24 12.0041C24 11.1103 23.9883 10.9156 23.8921 10.2563C23.2399 5.74957 20.0328 1.96306 15.6833 0.560125C14.9161 0.311445 14.0997 0.140184 13.1848 0.036958C12.9595 0.0134976 11.4088 -0.0123089 11.2141 0.00645944ZM16.1267 7.26511C16.2393 7.32142 16.3308 7.42933 16.3636 7.54194C16.3824 7.60294 16.3871 8.90734 16.3824 11.8469L16.3754 16.0651L15.6317 14.9249L14.8856 13.7848V10.7185C14.8856 8.73608 14.895 7.62171 14.9091 7.56775C14.9466 7.43637 15.0287 7.33315 15.1413 7.27215C15.2375 7.22288 15.2727 7.21819 15.6411 7.21819C15.9883 7.21819 16.0493 7.22288 16.1267 7.26511Z" fill="#000000"></path> </g> <defs> <clipPath id="clip0"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>', metric: 'Expert' },
      { title: 'PostgreSQL ', description: 'SQL & NoSQL databases', icon: '<svg viewBox="-4 0 264 264" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M255.007926,158.085617 C253.473109,153.437413 249.452194,150.199279 244.251788,149.42182 C241.799982,149.055852 238.991667,149.211935 235.668988,149.897164 C229.877358,151.092028 225.580342,151.546679 222.44449,151.635363 C234.280794,131.650217 243.905921,108.859714 249.446873,87.4065589 C258.406282,52.7182633 253.61855,36.9154365 248.023797,29.7669469 C233.217182,10.8477783 211.614448,0.683454965 185.55152,0.371879908 C171.649478,0.202198614 159.443658,2.94725173 153.077358,4.92075751 C147.149155,3.87547344 140.774577,3.29134411 134.08606,3.18315012 C121.550337,2.9833164 110.473164,5.71595381 101.008259,11.332582 C95.7670577,9.56127483 87.3580785,7.06335335 77.6460416,5.46882217 C54.8035104,1.71868822 36.3939769,4.64110855 22.9282587,14.153903 C6.62230023,25.6721293 -0.937090069,45.6838799 0.461154734,73.6339954 C0.904572748,82.5082679 5.86908083,109.507695 13.6850624,135.114199 C18.1771824,149.831538 22.9672794,162.053912 27.9223279,171.443732 C34.9490254,184.758688 42.4676212,192.600092 50.9085266,195.415501 C55.6400924,196.992296 64.2358984,198.09552 73.2774873,190.566873 C74.4232794,191.953885 75.9515935,193.33321 77.9812656,194.613801 C80.5578199,196.239076 83.7090439,197.566965 86.8555381,198.353885 C98.1969885,201.189395 108.820102,200.479926 117.882975,196.506309 C117.93855,198.117986 117.981709,199.658125 118.018365,200.987788 C118.07867,203.145164 118.137792,205.259972 118.217016,207.237617 C118.753848,220.612286 119.663741,231.011326 122.359723,238.286928 C122.507529,238.687778 122.706771,239.29733 122.917247,239.943538 C124.261691,244.062005 126.511298,250.955677 132.232573,256.355326 C138.158411,261.947714 145.325229,263.663446 151.888998,263.662855 C155.180933,263.662855 158.322106,263.231261 161.076619,262.640628 C170.897441,260.536462 182.050291,257.329663 190.118134,245.84218 C197.745515,234.981986 201.453672,218.625182 202.124711,192.851363 C202.211621,192.122975 202.292028,191.427104 202.369478,190.763751 C202.421506,190.316194 202.474716,189.858587 202.528517,189.402162 L204.325838,189.560018 L204.788767,189.591353 C214.791095,190.047187 227.021155,187.925875 234.532065,184.437062 C240.467363,181.68255 259.485857,171.642383 255.007926,158.085617" fill="#000000"> </path> <path d="M237.905589,160.722476 C208.165838,166.857016 206.121386,156.78788 206.121386,156.78788 C237.521885,110.194697 250.64824,51.0516028 239.320388,36.5766651 C208.417109,-2.90823095 154.921977,15.7655797 154.029229,16.2503834 L153.741894,16.3018199 C147.866309,15.0821247 141.290716,14.3555104 133.900416,14.2349007 C120.443566,14.0143741 110.236083,17.7627344 102.490457,23.636545 C102.490457,23.636545 7.06039723,-15.6768961 11.4987159,73.0806097 C12.4429007,91.9631224 38.5625866,215.954032 69.7171363,178.502947 C81.1041109,164.808425 92.1061986,153.229303 92.1061986,153.229303 C97.5708822,156.859418 104.112776,158.711132 110.970975,158.046005 L111.503667,157.593718 C111.338125,159.294079 111.413801,160.957192 111.717099,162.925968 C103.691233,171.893062 106.049626,173.467492 90.0055797,176.770069 C73.7711594,180.115806 83.308194,186.072388 89.5349654,187.629081 C97.0837136,189.516859 114.54788,192.190965 126.34812,175.672166 L125.877506,177.556988 C129.022226,180.075603 131.230448,193.940397 130.860342,206.508637 C130.490236,219.077469 130.243104,227.706383 132.720924,234.446337 C135.198744,241.186291 137.668286,256.351187 158.759612,251.831871 C176.383409,248.055132 185.516046,238.268009 186.786587,221.94254 C187.688203,210.336222 189.728517,212.051954 189.857404,201.675381 L191.493912,196.762901 C193.381099,181.029838 191.793663,175.95418 202.651492,178.314938 L205.290125,178.546697 C213.2817,178.9103 223.741044,177.261376 229.879723,174.408129 C243.098309,168.273589 250.93794,158.031224 237.904406,160.722476 L237.905589,160.722476" fill="#336791"> </path> <path d="M108.076342,81.5250624 C105.396915,81.152 102.969349,81.4972748 101.741376,82.426679 C101.050236,82.9499122 100.836804,83.5559169 100.779455,83.973321 C100.625145,85.0783187 101.399649,86.2997875 101.874993,86.9300323 C103.220619,88.7137552 105.18703,89.9399538 107.133339,90.2101432 C107.415353,90.249164 107.695594,90.2680831 107.974651,90.2680831 C111.220471,90.2680831 114.170679,87.7411917 114.430818,85.8758799 C114.755991,83.5399538 111.36473,81.9826697 108.076342,81.5250624" fill="#FFFFFF"> </path> <path d="M196.860453,81.5989654 L196.859861,81.5989654 C196.604453,79.7679446 193.345626,79.2458938 190.253524,79.6757136 C187.166152,80.1061247 184.171603,81.4996397 184.421691,83.3347991 C184.622707,84.7620139 187.19867,87.198448 190.249386,87.1978568 C190.506568,87.1978568 190.766707,87.1807113 191.028619,87.1440554 C193.064794,86.8620416 194.558818,85.5690346 195.268286,84.8235012 C196.349635,83.688351 196.974559,82.4219492 196.860453,81.5989654" fill="#FFFFFF"> </path> <path d="M247.802088,160.025423 C246.66812,156.596323 243.018494,155.492508 236.954309,156.745312 C218.949173,160.461155 212.501284,157.886965 210.38352,156.327908 C224.378975,135.007187 235.89188,109.236323 242.102688,85.1906513 C245.04521,73.8007206 246.670485,63.2231316 246.802919,54.601903 C246.949543,45.1375889 245.338457,38.1842032 242.014005,33.9362587 C228.611547,16.8108637 208.942115,7.62501617 185.131751,7.37256351 C168.763122,7.18869284 154.93321,11.3781062 152.252009,12.5558245 C146.60582,11.1516674 140.450587,10.2896628 133.750245,10.1796952 C121.461654,9.98104388 110.840314,12.9229746 102.045857,18.9191686 C98.2259584,17.4978661 88.3536998,14.10897 76.2814965,12.1644342 C55.4089238,8.80332564 38.8233164,11.3497275 26.9870115,19.7350577 C12.8638522,29.740933 6.34383372,47.626642 7.60727945,72.8943741 C8.03236952,81.3961755 12.8756767,107.547788 20.5202032,132.593219 C30.5822448,165.556915 41.5192979,184.218309 53.0280647,188.056536 C54.374873,188.505866 55.9286097,188.820397 57.6407945,188.820397 C61.8390762,188.820397 66.9856813,186.927889 72.3409885,180.490051 C81.2359538,169.788896 89.5408776,160.821801 92.6022356,157.563566 C97.1262818,159.992314 102.09552,161.347991 107.179455,161.483972 C107.188323,161.616998 107.201921,161.750023 107.213746,161.882457 C106.193885,163.092102 105.357303,164.152166 104.644286,165.05733 C101.122365,169.528166 100.389247,170.458753 89.0519353,172.793497 C85.8273995,173.458624 77.2611547,175.224018 77.1364065,181.227898 C76.9998337,187.787529 87.2605266,190.542633 88.4299677,190.834697 C92.5040924,191.854559 96.4286374,192.357691 100.171677,192.357691 C109.275344,192.357099 117.285838,189.365506 123.688203,183.576831 C123.490734,206.962697 124.466254,230.006836 127.273977,237.028212 C129.573247,242.775501 135.191649,256.822984 152.93842,256.821801 C155.54158,256.821801 158.408425,256.519095 161.561423,255.843326 C180.082106,251.872074 188.124527,243.686577 191.236139,225.640055 C192.901025,215.995418 195.758411,192.963695 197.101672,180.610069 C199.937774,181.49454 203.589173,181.899529 207.536185,181.898938 C215.768388,181.898938 225.266993,180.150097 231.224166,177.384942 C237.91564,174.277469 249.991982,166.650679 247.802088,160.025423 L247.802088,160.025423 Z M203.696185,76.5445912 C203.634697,80.1918522 203.132748,83.5027067 202.600647,86.9590023 C202.028342,90.6760277 201.435935,94.5189838 201.286947,99.1843326 C201.139732,103.724342 201.706716,108.444674 202.255372,113.008924 C203.363326,122.228471 204.500249,131.720573 200.098587,141.086744 C199.41454,139.871778 198.754143,138.546254 198.14873,137.078245 C197.601848,135.752129 196.414079,133.621949 194.769885,130.673515 C188.370476,119.197857 173.385312,92.3243603 181.056443,81.3583372 C183.340933,78.0935982 189.139658,74.7384018 203.696185,76.5445912 L203.696185,76.5445912 Z M186.052286,14.7581339 C207.386014,15.2293395 224.261321,23.2102725 236.209958,38.4780416 C245.373931,50.1890069 235.282919,103.476028 206.069949,149.446651 C205.781432,149.080092 205.487594,148.709986 205.183704,148.33042 C205.062503,148.178476 204.938938,148.024166 204.814189,147.868083 C212.362938,135.400942 210.886651,123.066236 209.572952,112.129774 C209.033164,107.641792 208.523529,103.402716 208.653007,99.4214134 C208.787215,95.2000739 209.34533,91.5811917 209.884527,88.0811455 C210.548471,83.7675751 211.223058,79.3050162 211.036822,74.0437136 C211.17576,73.4921016 211.231926,72.8399815 211.159206,72.0660693 C210.683861,67.0205635 204.924157,51.9224758 193.18363,38.2551501 C186.762346,30.7808961 177.396767,22.4156674 164.609774,16.7736166 C170.109931,15.6337367 177.631483,14.5707159 186.052286,14.7581339 L186.052286,14.7581339 Z M66.6741062,175.777995 C60.7742818,182.871501 56.6995658,181.512277 55.3598522,181.065903 C46.6292471,178.153533 36.499806,159.702023 27.568776,130.441755 C19.8408868,105.123769 15.3245266,79.6650716 14.9674273,72.5260416 C13.8387806,49.9483788 19.3117413,34.2129515 31.2349561,25.7572656 C50.6389284,11.9965266 82.5413764,20.2328684 95.3602956,24.4104573 C95.1758337,24.591963 94.9842771,24.7622356 94.8015889,24.9466975 C73.7664296,46.1911501 74.2654226,82.4875751 74.3168591,84.7058476 C74.3150855,85.56194 74.3866236,86.7739492 74.485358,88.4412009 C74.8471871,94.5455889 75.5205912,105.907732 73.7214965,118.775132 C72.0489238,130.732046 75.7346143,142.435326 83.8320185,150.883917 C84.6703741,151.758337 85.5453857,152.579547 86.4493672,153.352277 C82.8446744,157.212379 75.0115473,165.74788 66.6741062,175.777995 L66.6741062,175.777995 Z M89.1530346,145.78461 C82.6265127,138.975483 79.6627067,129.503483 81.020157,119.795584 C82.920351,106.202753 82.2185681,94.3646744 81.8419584,88.0048776 C81.7893395,87.1150855 81.7426328,86.335261 81.7148453,85.7197968 C84.7880277,82.9954365 99.0288406,75.3645081 109.184296,77.6915658 C113.819492,78.7534042 116.642587,81.9087667 117.816758,87.3373857 C123.893358,115.440037 118.621413,127.153367 114.385293,136.565654 C113.512055,138.504868 112.687298,140.337663 111.982559,142.234309 L111.436859,143.699954 C110.054577,147.406337 108.768665,150.851991 107.971695,154.124416 C101.034273,154.103132 94.2848591,151.139917 89.1530346,145.78461 L89.1530346,145.78461 Z M90.2178291,183.685025 C88.1922956,183.178938 86.3701432,182.299788 85.3012102,181.570808 C86.1939584,181.150448 87.7831686,180.579326 90.5388637,180.011751 C103.876286,177.265515 105.93552,175.328074 110.433552,169.61685 C111.465238,168.30788 112.634088,166.823316 114.252859,165.015353 C114.25345,165.014171 114.254042,165.01358 114.254633,165.012988 C116.666236,162.31346 117.768868,162.771067 119.768979,163.600554 C121.390115,164.271594 122.968684,166.303039 123.608979,168.539048 C123.911686,169.594975 124.252231,171.599815 123.138956,173.158873 C113.742633,186.31479 100.051067,186.1457 90.2178291,183.685025 L90.2178291,183.685025 Z M160.016554,248.637487 C143.700545,252.133395 137.923695,243.80837 134.116804,234.291436 C131.659677,228.146845 130.452397,200.440314 131.309081,169.84388 C131.320314,169.436527 131.262374,169.043363 131.150042,168.673848 C131.05249,167.96024 130.902319,167.238356 130.694208,166.511741 C129.419529,162.059824 126.315012,158.335704 122.5903,156.792018 C121.110467,156.178919 118.393792,155.05382 115.129644,155.888628 C115.826106,153.0206 117.033386,149.782467 118.341764,146.275326 L118.891012,144.79963 C119.509432,143.136517 120.284527,141.413691 121.105145,139.590356 C125.538143,129.741746 131.609423,116.25297 125.020231,85.7795104 C122.551871,74.3659307 114.310208,68.7924619 101.815871,70.0866513 C94.3250624,70.861746 87.472776,73.8840831 84.0549099,75.6169607 C83.3200185,75.9894319 82.6477968,76.3488961 82.0199169,76.6994919 C82.9735612,65.1990023 86.578254,43.707418 100.060527,30.1098568 C108.54873,21.548933 119.854115,17.3210901 133.628453,17.5487113 C160.768591,17.9933118 178.172453,31.9213672 187.994457,43.5276859 C196.457829,53.5294226 201.040998,63.6038799 202.870245,69.0372286 C189.115418,67.6389838 179.76048,70.3544758 175.017681,77.1340416 C164.700822,91.8815335 180.662097,120.506236 188.333229,134.262836 C189.739751,136.784406 190.954125,138.963067 191.336055,139.888924 C193.833977,145.943058 197.067972,149.984665 199.429321,152.935464 C200.152979,153.839446 200.855353,154.716231 201.389229,155.481866 C197.223464,156.683233 189.740342,159.457848 190.422023,173.328554 C189.872185,180.289035 185.960647,212.874938 183.974134,224.387843 C181.351464,239.597672 175.754346,245.263372 160.016554,248.637487 L160.016554,248.637487 Z M228.120831,170.700564 C223.861062,172.678208 216.732083,174.161589 209.959612,174.479667 C202.479446,174.830263 198.671963,173.641903 197.776259,172.91115 C197.355307,164.267455 200.573339,163.364065 203.978199,162.408055 C204.513256,162.257293 205.035307,162.111261 205.53903,161.935076 C205.852379,162.189894 206.195289,162.442938 206.570716,162.690661 C212.582873,166.658956 223.306494,167.087002 238.444785,163.962383 C238.50036,163.950559 238.555935,163.939917 238.610919,163.928684 C236.569423,165.837746 233.075289,168.400111 228.120831,170.700564 L228.120831,170.700564 Z" fill="#FFFFFF"> </path> </g> </g></svg>', metric: '95% uptime' },
      { title: 'DevOps / CI-CD', description: 'Docker, Vercel, GitHub Actions', icon: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.58536 17.4132C1.80488 16.6327 1.80488 15.3673 2.58536 14.5868L14.5868 2.58536C15.3673 1.80488 16.6327 1.80488 17.4132 2.58536L29.4146 14.5868C30.1951 15.3673 30.1951 16.6327 29.4146 17.4132L17.4132 29.4146C16.6327 30.1951 15.3673 30.1951 14.5868 29.4146L2.58536 17.4132Z" fill="#EE513B"></path> <path d="M12.1489 5.06152L10.9336 6.27686L14.0725 9.41577C13.9455 9.68819 13.8746 9.99201 13.8746 10.3124C13.8746 11.222 14.4461 11.9981 15.2496 12.3012V19.9798C14.4461 20.2829 13.8746 21.059 13.8746 21.9686C13.8746 23.1422 14.826 24.0936 15.9996 24.0936C17.1732 24.0936 18.1246 23.1422 18.1246 21.9686C18.1246 21.144 17.6549 20.429 16.9684 20.0768V12.3117L19.9689 15.3122C19.8481 15.5791 19.7809 15.8754 19.7809 16.1874C19.7809 17.361 20.7323 18.3124 21.9059 18.3124C23.0795 18.3124 24.0309 17.361 24.0309 16.1874C24.0309 15.0138 23.0795 14.0624 21.9059 14.0624C21.6778 14.0624 21.4582 14.0983 21.2522 14.1648L18.0297 10.9423C18.0914 10.7433 18.1246 10.5317 18.1246 10.3124C18.1246 9.13878 17.1732 8.18738 15.9996 8.18738C15.7803 8.18738 15.5688 8.22061 15.3697 8.2823L12.1489 5.06152Z" fill="white"></path> </g></svg>', metric: 'Automated' },
      { title: 'PHP / Laravel', description: 'Web applications', icon: '<svg viewBox="-4 0 264 264" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M255.855641,59.619717 C255.950565,59.9710596 256,60.3333149 256,60.6972536 L256,117.265345 C256,118.743206 255.209409,120.108149 253.927418,120.843385 L206.448786,148.178786 L206.448786,202.359798 C206.448786,203.834322 205.665123,205.195421 204.386515,205.937838 L105.27893,262.990563 C105.05208,263.119455 104.804608,263.201946 104.557135,263.289593 C104.464333,263.320527 104.376687,263.377239 104.278729,263.403017 C103.585929,263.58546 102.857701,263.58546 102.164901,263.403017 C102.051476,263.372083 101.948363,263.310215 101.840093,263.26897 C101.613244,263.186479 101.376082,263.1143 101.159544,262.990563 L2.07258227,205.937838 C0.7913718,205.201819 0,203.837372 0,202.359798 L0,32.6555248 C0,32.2843161 0.0515567729,31.9234187 0.144358964,31.5728326 C0.175293028,31.454252 0.24747251,31.3459828 0.288717928,31.2274022 C0.366053087,31.0108638 0.438232569,30.7891697 0.55165747,30.5880982 C0.628992629,30.4540506 0.742417529,30.3457814 0.83521972,30.2220451 C0.953800298,30.0570635 1.06206952,29.8869261 1.20127281,29.7425672 C1.31985339,29.6239866 1.4745237,29.5363401 1.60857131,29.4332265 C1.75808595,29.3094903 1.89213356,29.1754427 2.06227091,29.0774848 L2.06742659,29.0774848 L51.6134853,0.551122364 C52.8901903,-0.183535768 54.4613221,-0.183535768 55.7380271,0.551122364 L105.284086,29.0774848 L105.294397,29.0774848 C105.459379,29.1805983 105.598582,29.3094903 105.748097,29.4280708 C105.882144,29.5311844 106.031659,29.6239866 106.15024,29.7374115 C106.294599,29.8869261 106.397712,30.0570635 106.521448,30.2220451 C106.609095,30.3457814 106.727676,30.4540506 106.799855,30.5880982 C106.918436,30.7943253 106.985459,31.0108638 107.06795,31.2274022 C107.109196,31.3459828 107.181375,31.454252 107.212309,31.5779883 C107.307234,31.9293308 107.355765,32.2915861 107.356668,32.6555248 L107.356668,138.651094 L148.643332,114.878266 L148.643332,60.6920979 C148.643332,60.3312005 148.694889,59.9651474 148.787691,59.619717 C148.823781,59.4959808 148.890804,59.3877116 148.93205,59.269131 C149.014541,59.0525925 149.08672,58.8308984 149.200145,58.629827 C149.27748,58.4957794 149.390905,58.3875102 149.478552,58.2637739 C149.602288,58.0987922 149.705401,57.9286549 149.84976,57.7842959 C149.968341,57.6657153 150.117856,57.5780688 150.251903,57.4749553 C150.406573,57.351219 150.540621,57.2171714 150.705603,57.1192136 L150.710758,57.1192136 L200.261973,28.5928511 C201.538395,27.8571345 203.110093,27.8571345 204.386515,28.5928511 L253.932573,57.1192136 C254.107866,57.2223271 254.241914,57.351219 254.396584,57.4697996 C254.525476,57.5729132 254.674991,57.6657153 254.793572,57.7791402 C254.93793,57.9286549 255.041044,58.0987922 255.16478,58.2637739 C255.257582,58.3875102 255.371007,58.4957794 255.443187,58.629827 C255.561767,58.8308984 255.628791,59.0525925 255.711282,59.269131 C255.757683,59.3877116 255.824707,59.4959808 255.855641,59.619717 Z M247.740605,114.878266 L247.740605,67.8378666 L230.402062,77.8192579 L206.448786,91.6106946 L206.448786,138.651094 L247.745761,114.878266 L247.740605,114.878266 Z M198.194546,199.97272 L198.194546,152.901386 L174.633101,166.357704 L107.351512,204.757188 L107.351512,252.27191 L198.194546,199.97272 Z M8.25939501,39.7961379 L8.25939501,199.97272 L99.0921175,252.266755 L99.0921175,204.762344 L51.6392637,177.906421 L51.6237967,177.89611 L51.603174,177.885798 C51.443348,177.792996 51.3093004,177.658949 51.1597857,177.545524 C51.0308938,177.44241 50.8813791,177.359919 50.7679542,177.246494 L50.7576429,177.231027 C50.6235953,177.102135 50.5307931,176.942309 50.4173682,176.79795 C50.3142546,176.658747 50.1905184,176.540167 50.1080276,176.395808 L50.1028719,176.380341 C50.0100697,176.22567 49.9533572,176.040066 49.8863334,175.864773 C49.8193096,175.710103 49.7316631,175.565744 49.6904177,175.400762 L49.6904177,175.395606 C49.6388609,175.19969 49.6285496,174.993463 49.6079269,174.792392 C49.5873041,174.637722 49.5460587,174.483051 49.5460587,174.328381 L49.5460587,174.31807 L49.5460587,63.5689658 L25.5979377,49.7723734 L8.25939501,39.8012935 L8.25939501,39.7961379 Z M53.6809119,8.89300821 L12.3994039,32.6555248 L53.6706006,56.4180414 L94.9469529,32.6503692 L53.6706006,8.89300821 L53.6809119,8.89300821 Z M75.1491521,157.19091 L99.0972731,143.404629 L99.0972731,39.7961379 L81.7587304,49.7775291 L57.8054537,63.5689658 L57.8054537,167.177457 L75.1491521,157.19091 Z M202.324244,36.934737 L161.047891,60.6972536 L202.324244,84.4597702 L243.59544,60.6920979 L202.324244,36.934737 Z M198.194546,91.6106946 L174.24127,77.8192579 L156.902727,67.8378666 L156.902727,114.878266 L180.850848,128.664547 L198.194546,138.651094 L198.194546,91.6106946 Z M103.216659,197.616575 L163.759778,163.052915 L194.023603,145.781396 L152.778185,122.034346 L105.289242,149.374903 L62.0073307,174.292291 L103.216659,197.616575 Z" fill="#FF2D20"> </path> </g> </g></svg>', metric: '7+ yrs' },
      { title: 'Go Lang', description: 'High-performance services', icon: '<svg viewBox="0 -160 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M292.533152,13.2950639 L293.657233,14.0455076 C306.869315,22.7704678 316.342129,34.7361275 322.574244,49.1946331 C324.069951,51.4381943 323.072813,52.6846171 320.081398,53.4324709 L315.017741,54.7277932 C303.571167,57.6768058 294.487155,60.1566573 283.191384,63.10567 L276.74841,64.7843862 C274.428264,65.3583626 273.787695,65.1170696 271.320433,62.3073717 L270.972336,61.9081465 C267.453024,57.9195933 264.816991,55.2559574 260.154613,52.878088 L259.255961,52.4353326 C243.551033,44.7075107 228.344673,46.9510719 214.135452,56.1746012 C197.184101,67.1431227 188.459141,83.3466202 188.708425,103.538671 C188.95771,123.481438 202.668362,139.93422 222.361843,142.67635 C239.313195,144.919911 253.522416,138.937081 264.740222,126.223568 C266.983783,123.481438 268.978059,120.490023 271.470905,117.000039 L223.358982,117.000039 C218.124006,117.000039 216.877583,113.759339 218.622575,109.521501 L219.486848,107.487264 C222.690544,100.033179 227.659682,89.3185944 230.887235,83.1925665 L231.591356,81.8743455 C232.452883,80.3801337 234.202861,78.3609287 237.568203,78.3609287 L317.791861,78.3603482 C321.394911,66.9456209 327.24084,56.159659 335.038473,45.9539335 C353.236247,22.0226141 375.17329,9.55838523 404.838154,4.32340907 C430.265181,-0.163713323 454.196501,2.32913245 475.884259,17.0369225 C495.577741,30.4982897 507.792685,48.6960639 511.033385,72.6273834 C515.271222,106.280802 505.549124,133.702105 482.365658,157.134856 C465.912876,173.836922 445.720825,184.306875 422.537359,189.043282 C415.806676,190.289704 409.075992,190.538989 402.594593,191.286843 C379.909697,190.788274 359.219077,184.306875 341.769156,169.3498 C329.496056,158.740849 321.041799,145.701725 316.840932,130.522127 C313.926247,136.409796 310.44016,142.04853 306.370746,147.412757 C288.422257,171.094792 264.989506,185.802582 235.324641,189.791135 C210.894753,193.031835 188.209856,188.295428 168.26709,173.338353 C149.820031,159.378417 139.350079,140.931358 136.607949,117.997177 C133.367249,90.8251575 141.344356,66.3952689 157.797138,44.9567952 C175.496343,21.7733295 198.929093,7.06553943 227.59682,1.8305633 C250.59563,-2.32879605 272.633891,0.235689133 292.533152,13.2950639 L292.533152,13.2950639 Z M411.120284,49.0171223 L410.322415,49.1946331 C387.138949,54.4296092 372.181875,69.1373993 366.697614,92.5701496 C362.210492,112.014347 371.683306,131.707829 389.631795,139.684935 C403.342447,145.667765 417.053099,144.919911 430.265181,138.189228 C449.958663,127.96856 460.6779,112.014347 461.924323,90.575873 C461.675038,87.3351735 461.675038,84.8423277 461.176469,82.3494819 C456.739764,57.9476028 434.511926,44.025432 411.120284,49.0171223 L411.120284,49.0171223 Z M116.415898,94.5644262 C117.413036,94.5644262 117.911605,95.3122799 117.911605,96.3094183 L117.413036,102.292248 C117.413036,103.289387 116.415898,104.03724 115.668044,104.03724 L61.3240061,103.787956 C60.3268678,103.787956 60.0775833,103.040102 60.5761524,102.292248 L64.0661365,96.0601337 C64.5647057,95.3122799 65.561844,94.5644262 66.5589823,94.5644262 L116.415898,94.5644262 Z M121.900159,71.6302451 C122.897297,71.6302451 123.395866,72.3780988 123.146581,73.1259525 L121.152305,79.1087824 C120.90302,80.1059207 119.905882,80.6044899 118.908744,80.6044899 L0.99713831,80.8537744 C0,80.8537744 -0.249284578,80.3552053 0.249284578,79.6073515 L5.48426071,72.8766679 C5.98282987,72.1288142 7.22925276,71.6302451 8.22639107,71.6302451 L121.900159,71.6302451 Z M134.862957,48.6960639 C135.860095,48.6960639 136.109379,49.4439176 135.61081,50.1917714 L131.372973,56.6731704 C130.874403,57.4210241 129.62798,58.1688779 128.880127,58.1688779 L38.6391096,57.9195933 C37.6419713,57.9195933 37.3926867,57.4210241 37.8912558,56.6731704 L43.126232,49.9424868 C43.6248011,49.1946331 44.871224,48.6960639 45.8683623,48.6960639 L134.862957,48.6960639 Z" fill="#00ACD7" fill-rule="nonzero"> </path> </g> </g></svg>', metric: 'Growing' },
      { title: 'API Development', description: 'REST, GraphQL, WebSockets', icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M432.4 453.5l-17 46.7h34.4z" fill="#FFFFFF"></path><path d="M725.3 259.7H312.2c-16.5 0-30 13.5-30 30v413.1c0 16.5 13.5 30 30 30h413.1c16.5 0 30-13.5 30-30V289.7c0-16.6-13.5-30-30-30z m-98.8 164.5h25.4V550h-25.4V424.2z m-116.5 0h40.8c15.5 0 25.5 0.6 30.2 1.9 7.2 1.9 13.2 6 18.1 12.3 4.9 6.3 7.3 14.5 7.3 24.5 0 7.7-1.4 14.2-4.2 19.5s-6.4 9.4-10.7 12.4c-4.3 3-8.7 5-13.2 6-6.1 1.2-14.8 1.8-26.4 1.8h-16.6V550H510V424.2z m-90.7 0h26.9L496.5 550h-27.6l-11-28.6h-50.3L397.2 550h-27l49.1-125.8z m229.1 273.3H352.6c-19.4 0-35.1-15.7-35.1-35.1v-295c0-5.5 4.5-10 10-10s10 4.5 10 10v295c0 8.3 6.8 15.1 15.1 15.1h295.8c5.5 0 10 4.5 10 10s-4.4 10-10 10z" fill="#FFFFFF"></path><path d="M569.4 479.2c3.4-1.3 6-3.4 7.9-6.2 1.9-2.8 2.9-6.1 2.9-9.8 0-4.6-1.3-8.4-4-11.3-2.7-3-6.1-4.8-10.2-5.6-3-0.6-9.1-0.9-18.3-0.9h-12.3v35.7h13.9c10 0.1 16.7-0.6 20.1-1.9z" fill="#FFFFFF"></path><path d="M648.4 677.5H352.6c-8.3 0-15.1-6.8-15.1-15.1v-295c0-5.5-4.5-10-10-10s-10 4.5-10 10v295c0 19.4 15.7 35.1 35.1 35.1h295.8c5.5 0 10-4.5 10-10s-4.4-10-10-10z" fill="#06F3FF"></path><path d="M865 386.5c11 0 20-9 20-20s-9-20-20-20h-69.7v-56.8c0-38.6-31.4-70-70-70h-27.8v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H611v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-46.5v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H438v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-85.8c-38.6 0-70 31.4-70 70v56.8h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V433h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v46.5h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V606h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v56.8c0 38.6 31.4 70 70 70H343v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5H516v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h82.8c38.6 0 70-31.4 70-70V646H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865c11 0 20-9 20-20s-9-20-20-20h-69.7V473H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865zM755.3 702.7c0 16.5-13.5 30-30 30H312.2c-16.5 0-30-13.5-30-30v-413c0-16.5 13.5-30 30-30h413.1c16.5 0 30 13.5 30 30v413z" fill="#005BFF"></path><path d="M407.6 521.4h50.3l11 28.6h27.6l-50.4-125.8h-26.9l-49 125.8h27l10.4-28.6z m24.8-67.9l17.3 46.7h-34.3l17-46.7zM535.4 502.6H552c11.5 0 20.3-0.6 26.4-1.8 4.5-1 8.9-3 13.2-6 4.3-3 7.9-7.1 10.7-12.4s4.2-11.8 4.2-19.5c0-10-2.4-18.2-7.3-24.5-4.9-6.3-10.9-10.4-18.1-12.3-4.7-1.3-14.8-1.9-30.2-1.9H510V550h25.4v-47.4z m0-57.1h12.3c9.2 0 15.2 0.3 18.3 0.9 4.1 0.7 7.5 2.6 10.2 5.6 2.7 3 4 6.8 4 11.3 0 3.7-1 7-2.9 9.8-1.9 2.8-4.6 4.9-7.9 6.2-3.4 1.3-10.1 2-20.1 2h-13.9v-35.8zM626.5 424.2h25.4V550h-25.4z" fill="#005BFF"></path></g></svg>', metric: '50+ APIs' },
    ],
    projectsSectionTitle: 'Featured Projects',
    projectsSectionSubtitle: 'Production systems I\'ve architected and deployed, serving thousands of users daily.',
    contactTitle: 'Let\'s Build Something Amazing',
    contactSubtitle: 'Looking for a backend developer who can architect scalable solutions and deliver robust APIs? I\'m always excited to work on challenging projects.',
    navItems: [
      { label: 'About', href: '#about' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Projects', href: '#projects' },
      { label: 'AI Chat', href: '#ai-chat' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  investor: {
    headline: 'Building The Future Of Scalable Tech',
    role: 'Founder & Visionary',
    tagline: 'Technical brilliance meets aggressive growth. Let\'s talk ROI.',
    aboutTitle: 'The Business Case',
    aboutDescription:
      'I build products that people actually use. My background isn\'t just in syntax; it\'s in scaling ventures from zero to "how do I invest?". If you\'re looking for a founder who speaks both code and EBITDA, you\'ve found him.',
    ctaText: 'View Pitch Deck',
    ctaDescription: 'See the numbers and the vision behind the code.',
    heroWidget: 'venture-stats',
    heroCTAs: [
      { label: 'View My Ventures', href: '#ventures', variant: 'primary', icon: 'arrow-right' },
      { label: 'Let\'s Talk', href: '#contact', variant: 'outline', icon: 'mail' },
    ],
    expertiseSectionTitle: 'Industry Expertise',
    expertiseSectionSubtitle: 'Deep domain knowledge across high-growth sectors. Building products that solve real problems at scale.',
    expertiseItems: [
      { title: 'Fintech & Payments', description: 'Payment processing, fraud detection, transaction systems', icon: '💳', metric: '₦50M+ processed' },
      { title: 'Healthcare Tech', description: 'Patient management, HIPAA-compliant systems', icon: '🏥', metric: '2 platforms' },
      { title: 'E-commerce', description: 'Marketplace backends, inventory, fulfillment', icon: '🛒', metric: '10K+ daily users' },
      { title: 'Authentication & Security', description: 'OTP services, identity verification', icon: '🔐', metric: '1M+ verifications' },
      { title: 'Hospitality & Events', description: 'Booking systems, guest management', icon: '🏨', metric: '3 platforms' },
      { title: 'Developer Tools', description: 'SDKs, APIs, tunneling infrastructure', icon: '🛠️', metric: 'Open source' },
    ],
    projectsSectionTitle: 'Portfolio Companies',
    projectsSectionSubtitle: 'Products I\'ve built from zero — with real users, real revenue, and real growth trajectories.',
    contactTitle: 'Let\'s Talk Business',
    contactSubtitle: 'Interested in partnering, investing, or exploring a collaboration? I\'m building companies that scale — and I\'m always open to the right conversation.',
    navItems: [
      { label: 'About', href: '#about' },
      { label: 'Industries', href: '#expertise' },
      { label: 'Ventures', href: '#ventures' },
      { label: 'AI Chat', href: '#ai-chat' },
      { label: 'Connect', href: '#contact' },
    ],
  },
  romantic: {
    headline: 'More Than Just Lines Of Code',
    role: 'The Ultimate Catch',
    tagline: 'I can debug a server and still hold a conversation. Impressive, right?',
    aboutTitle: 'Beyond The Terminal',
    aboutDescription:
      'I\'m sarcastic, probably too curious for my own good, and I make a mean jollof rice. I value deep talks, dry humor, and someone who won\'t ask me to "fix their printer" on the first date.',
    ctaText: 'Slide Into DMs',
    ctaDescription: 'Start a conversation that doesn\'t involve stack overflows.',
    heroWidget: 'vibe-card',
    heroCTAs: [
      { label: 'Get to Know Me', href: '#expertise', variant: 'primary', icon: 'arrow-right' },
      { label: 'Slide Into DMs', href: '#contact', variant: 'outline', icon: 'heart' },
    ],
    expertiseSectionTitle: 'What I Bring to the Table',
    expertiseSectionSubtitle: 'Beyond the code and the career — here\'s what actually makes me, me.',
    expertiseItems: [
      { title: 'Deep Conversations', description: 'Philosophy, tech, life — I can talk about anything for hours', icon: '💬' },
      { title: 'Ambitious & Driven', description: 'Building multiple companies while staying grounded', icon: '🚀' },
      { title: 'Jollof Rice Chef', description: 'Nigerian jollof, and yes — it\'s better than Ghana\'s', icon: '🍛' },
      { title: 'Dry Humor Expert', description: 'Sarcasm is my love language. You\'ve been warned.', icon: '😏' },
      { title: 'Adventure Ready', description: 'Always down for new experiences and spontaneous plans', icon: '✈️' },
      { title: 'Emotionally Available', description: 'Yes, really. A techie who can also process feelings.', icon: '❤️' },
      { title: 'Supportive Partner', description: 'Your biggest cheerleader — unless you\'re wrong, then I\'ll lovingly tell you', icon: '🤝' },
      { title: 'Financially Responsible', description: 'Builds companies, manages finances, doesn\'t gamble on memecoins', icon: '💰' },
    ],
    projectsSectionTitle: 'Passion Projects',
    projectsSectionSubtitle: 'Things I\'ve poured my heart into — because what you build says a lot about who you are.',
    contactTitle: 'Slide Into My DMs',
    contactSubtitle: 'If you\'ve made it this far, I\'m already impressed. Let\'s skip the small talk and get to the good stuff.',
    navItems: [
      { label: 'About', href: '#about' },
      { label: 'Personality', href: '#expertise' },
      { label: 'Passions', href: '#projects' },
      { label: 'AI Chat', href: '#ai-chat' },
      { label: 'DM Me', href: '#contact' },
    ],
  },
  academic: {
    headline: 'Researching The Intersection Of AI & Scale',
    role: 'The Scholar-Engineer',
    tagline: 'Pushing the theoretical boundaries of distributed systems.',
    aboutTitle: 'Intellectual Pursuits',
    aboutDescription:
      'My work sits at the edge of what\'s possible in machine learning optimization and human-computer interaction. I published because I had something worth saying. Let\'s discuss the future of the field.',
    ctaText: 'Read Publications',
    ctaDescription: 'Dive into the academic rigor behind my technical work.',
    heroWidget: 'terminal',
    heroCTAs: [
      { label: 'View Research', href: '#projects', variant: 'primary', icon: 'arrow-right' },
      { label: 'Download CV', href: '#cv', variant: 'outline', icon: 'download' },
      { label: 'Collaborate', href: '#contact', variant: 'outline', icon: 'mail' },
    ],
    expertiseSectionTitle: 'Research & Technical Depth',
    expertiseSectionSubtitle: 'Areas of deep knowledge spanning systems engineering, distributed computing, and applied AI.',
    expertiseItems: [
      { title: 'Distributed Systems', description: 'Consensus algorithms, CAP theorem, event-driven architectures', icon: '🔬' },
      { title: 'Database Engineering', description: 'Query optimization, indexing strategies, replication', icon: '📊' },
      { title: 'API Design Patterns', description: 'REST semantics, GraphQL schemas, gRPC protocols', icon: '📐' },
      { title: 'Security Engineering', description: 'OAuth flows, encryption, zero-trust architecture', icon: '🔒' },
      { title: 'Performance Engineering', description: 'Load testing, profiling, caching strategies', icon: '📈' },
      { title: 'Applied Machine Learning', description: 'NLP pipelines, recommendation systems, data preprocessing', icon: '🧠' },
    ],
    projectsSectionTitle: 'Research & Engineering Work',
    projectsSectionSubtitle: 'Applied research and engineering projects demonstrating novel approaches to real-world problems.',
    contactTitle: 'Let\'s Collaborate',
    contactSubtitle: 'Open to research collaborations, academic partnerships, and intellectual discourse. Let\'s push the boundaries together.',
    navItems: [
      { label: 'About', href: '#about' },
      { label: 'Research', href: '#expertise' },
      { label: 'Work', href: '#projects' },
      { label: 'AI Chat', href: '#ai-chat' },
      { label: 'Collaborate', href: '#contact' },
    ],
  },
  casual: {
    headline: 'Moses Jacob Edem',
    role: 'Full Stack Human',
    tagline: 'Building things, learning stuff, and staying hydrated.',
    aboutTitle: 'The Quick Intro',
    aboutDescription:
      'I\'m a developer based in Port Harcourt who loves building cool stuff. I enjoy clean UIs, fast APIs, and occasionally seeing the sun. Take a look around, don\'t break anything.',
    ctaText: 'Say Hello',
    ctaDescription: 'Drop a message if you want to chat or collaborate.',
    heroWidget: 'quick-bio',
    heroCTAs: [
      { label: 'See My Work', href: '#projects', variant: 'primary', icon: 'arrow-right' },
      { label: 'Say Hello', href: '#contact', variant: 'outline', icon: 'hand' },
    ],
    expertiseSectionTitle: 'Things I\'m Good At',
    expertiseSectionSubtitle: 'A mix of what I do professionally and what makes me interesting at dinner.',
    expertiseItems: [
      { title: 'Backend Development', description: 'Building APIs and servers that actually work', icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M432.4 453.5l-17 46.7h34.4z" fill="#FFFFFF"></path><path d="M725.3 259.7H312.2c-16.5 0-30 13.5-30 30v413.1c0 16.5 13.5 30 30 30h413.1c16.5 0 30-13.5 30-30V289.7c0-16.6-13.5-30-30-30z m-98.8 164.5h25.4V550h-25.4V424.2z m-116.5 0h40.8c15.5 0 25.5 0.6 30.2 1.9 7.2 1.9 13.2 6 18.1 12.3 4.9 6.3 7.3 14.5 7.3 24.5 0 7.7-1.4 14.2-4.2 19.5s-6.4 9.4-10.7 12.4c-4.3 3-8.7 5-13.2 6-6.1 1.2-14.8 1.8-26.4 1.8h-16.6V550H510V424.2z m-90.7 0h26.9L496.5 550h-27.6l-11-28.6h-50.3L397.2 550h-27l49.1-125.8z m229.1 273.3H352.6c-19.4 0-35.1-15.7-35.1-35.1v-295c0-5.5 4.5-10 10-10s10 4.5 10 10v295c0 8.3 6.8 15.1 15.1 15.1h295.8c5.5 0 10 4.5 10 10s-4.4 10-10 10z" fill="#FFFFFF"></path><path d="M569.4 479.2c3.4-1.3 6-3.4 7.9-6.2 1.9-2.8 2.9-6.1 2.9-9.8 0-4.6-1.3-8.4-4-11.3-2.7-3-6.1-4.8-10.2-5.6-3-0.6-9.1-0.9-18.3-0.9h-12.3v35.7h13.9c10 0.1 16.7-0.6 20.1-1.9z" fill="#FFFFFF"></path><path d="M648.4 677.5H352.6c-8.3 0-15.1-6.8-15.1-15.1v-295c0-5.5-4.5-10-10-10s-10 4.5-10 10v295c0 19.4 15.7 35.1 35.1 35.1h295.8c5.5 0 10-4.5 10-10s-4.4-10-10-10z" fill="#06F3FF"></path><path d="M865 386.5c11 0 20-9 20-20s-9-20-20-20h-69.7v-56.8c0-38.6-31.4-70-70-70h-27.8v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H611v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-46.5v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H438v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-85.8c-38.6 0-70 31.4-70 70v56.8h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V433h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v46.5h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V606h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v56.8c0 38.6 31.4 70 70 70H343v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5H516v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h82.8c38.6 0 70-31.4 70-70V646H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865c11 0 20-9 20-20s-9-20-20-20h-69.7V473H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865zM755.3 702.7c0 16.5-13.5 30-30 30H312.2c-16.5 0-30-13.5-30-30v-413c0-16.5 13.5-30 30-30h413.1c16.5 0 30 13.5 30 30v413z" fill="#005BFF"></path><path d="M407.6 521.4h50.3l11 28.6h27.6l-50.4-125.8h-26.9l-49 125.8h27l10.4-28.6z m24.8-67.9l17.3 46.7h-34.3l17-46.7zM535.4 502.6H552c11.5 0 20.3-0.6 26.4-1.8 4.5-1 8.9-3 13.2-6 4.3-3 7.9-7.1 10.7-12.4s4.2-11.8 4.2-19.5c0-10-2.4-18.2-7.3-24.5-4.9-6.3-10.9-10.4-18.1-12.3-4.7-1.3-14.8-1.9-30.2-1.9H510V550h25.4v-47.4z m0-57.1h12.3c9.2 0 15.2 0.3 18.3 0.9 4.1 0.7 7.5 2.6 10.2 5.6 2.7 3 4 6.8 4 11.3 0 3.7-1 7-2.9 9.8-1.9 2.8-4.6 4.9-7.9 6.2-3.4 1.3-10.1 2-20.1 2h-13.9v-35.8zM626.5 424.2h25.4V550h-25.4z" fill="#005BFF"></path></g></svg>' },
      { title: 'Fullstack Projects', description: 'From database to UI — I do both', icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M854.7 828.1H169.9c-38.9 0-70.5-31.6-70.5-70.5v-499c0-38.9 31.6-70.5 70.5-70.5h684.7c38.9 0 70.5 31.6 70.5 70.5v499c0.1 38.9-31.5 70.5-70.4 70.5z" fill="#FFFFFF"></path><path d="M885.2 258.1c0-16.5-13.5-30-30-30H169.4c-16.5 0-30 13.5-30 30v120.1h745.7V258.1z m-649.7 96.1c-28.2 0-51.2-23-51.2-51.2s23-51.2 51.2-51.2 51.2 23 51.2 51.2-22.9 51.2-51.2 51.2z m281.8-6.8H374.7c-24.1 0-43.7-19.6-43.7-43.7s19.6-43.7 43.7-43.7h142.6c24.1 0 43.7 19.6 43.7 43.7s-19.6 43.7-43.7 43.7z" fill="#E6E6E6"></path><path d="M213.3 752.8h298.8c5.5 0 10-4.5 10-10s-4.5-10-10-10H213.3c-8.5 0-15.4-6.9-15.4-15.4V524.6c0-5.5-4.5-10-10-10s-10 4.5-10 10v192.9c0.1 19.4 15.9 35.3 35.4 35.3z" fill="#085059"></path><path d="M235.5 271.8c-17.2 0-31.2 14-31.2 31.2s14 31.2 31.2 31.2 31.2-14 31.2-31.2-14-31.2-31.2-31.2z" fill="#FFFFFF"></path><path d="M235.5 251.8c-28.2 0-51.2 23-51.2 51.2s23 51.2 51.2 51.2 51.2-23 51.2-51.2-22.9-51.2-51.2-51.2z m0 82.4c-17.2 0-31.2-14-31.2-31.2s14-31.2 31.2-31.2 31.2 14 31.2 31.2-14 31.2-31.2 31.2z" fill="#085059"></path><path d="M517.3 280.1H374.7c-13 0-23.7 10.6-23.7 23.7s10.6 23.7 23.7 23.7h142.6c13 0 23.7-10.6 23.7-23.7s-10.7-23.7-23.7-23.7z" fill="#FFFFFF"></path><path d="M517.3 260.1H374.7c-24.1 0-43.7 19.6-43.7 43.7s19.6 43.7 43.7 43.7h142.6c24.1 0 43.7-19.6 43.7-43.7s-19.6-43.7-43.7-43.7z m0 67.3H374.7c-13 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7h142.6c13 0 23.7 10.6 23.7 23.7s-10.7 23.7-23.7 23.7z" fill="#085059"></path><path d="M855.2 188.1H169.4c-38.6 0-70 31.4-70 70v500c0 38.6 31.4 70 70 70h685.7c38.6 0 70-31.4 70-70v-500c0.1-38.6-31.3-70-69.9-70z m30 570c0 16.5-13.5 30-30 30H169.4c-16.5 0-30-13.5-30-30V398.2h745.7v359.9z m0-379.9H139.5V258.1c0-16.5 13.5-30 30-30h685.7c16.5 0 30 13.5 30 30v120.1z" fill="#085059"></path><path d="M459.9 624.6l-114.3-45.3 114.3-43.7v-46.5L296.1 560v39.5l163.8 71.2zM568.7 454.8h-34.4L475.1 702h33.8zM747.9 560.3l-164-70.9v45.8l114.4 44.5-114.4 45v46.2l164-71.4z" fill="#085059"></path></g></svg>' },
      { title: 'Problem Solving', description: 'Give me a puzzle, I\'ll find the solution', icon: '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32.74 59.8c-.42-.42-25.99-6.05-25.99-6.05s-1.49 2.39-1.06 3.8c.24.79 5.82 7.28 11.56 13.25c4.53 4.72 9.68 9.52 10.43 12.26c1.15 4.22 1.27 10.99 1.27 10.99l-16.67 10.18s2.04 10.38 15.26 9.97c12.35-.38 12.99-13.46 16.91-13.53c.66-.01 1.57-.24 3.2 1.51c4.04 4.34 11.6 12.72 14.13 15.26c3.38 3.38 5.78 6.76 7.05 6.62c1.27-.14 11.98-9.72 15.08-12.68c3.1-2.96 5.92-6.48 5.92-9.44c0-2.96-4.37-5.21-4.37-5.21l-24.1 2.82L32.74 59.8z" fill="#b0b0af"></path><path d="M103.62 21.62c.42 0 11.13-5.35 11.13-5.35s5.5 11.13-1.55 17.47c-7.05 6.34-8.6 2.75-11.98 6.48c-2.58 2.85-1.27 8.74-1.27 8.74L120.9 69.1s1.17 2.13.33 3.68c-.6 1.1-7.65 8.99-13.11 14.66c-2.46 2.55-5.89 3.41-7.75 2.96c-4.65-1.13-5.35-4.79-6.2-11.27c-.85-6.48-6.43-6.38-8.46-6.06c-4.28.68-7.07 3.18-7.07 3.18s-25.2-30.37-24.92-31.22c.28-.85 1.27-7.19-1.69-9.86c-2.96-2.68-8.87-4.04-11.13-5.59c-2.25-1.55-2.55-4.5-2.14-7.36s18.63-2.83 18.63-2.83s31.42 17.33 31.57 16.63c.14-.74 14.66-14.4 14.66-14.4z" fill="#b0b0af"></path><radialGradient id="IconifyId17ecdb2904d178eab19790" cx="62.172" cy="-28.3" r="119.225" gradientUnits="userSpaceOnUse"><stop offset=".508" stop-color="#b7d118"></stop><stop offset=".572" stop-color="#b2d019"></stop><stop offset=".643" stop-color="#a5cd1d"></stop><stop offset=".717" stop-color="#8fc922"></stop><stop offset=".793" stop-color="#70c22a"></stop><stop offset=".871" stop-color="#48ba34"></stop><stop offset=".949" stop-color="#18b040"></stop><stop offset=".981" stop-color="#02ab46"></stop></radialGradient><path d="M88.12 24.99c.76-2.78-.11-9.61 5.2-14.13s13.57-3.96 18.54.79s5.77 13.68-.11 19.56c-5.88 5.88-8.59 2.6-11.87 5.77c-3.28 3.17-2.71 5.77-.68 7.69c2.04 1.92 22.28 23.07 21.71 24.42s-14.36 16.96-16.62 18.09c-2.26 1.13-6.22 1.02-7.01-2.71s.57-11.19-5.09-13.12c-5.65-1.92-8.14-.34-13.68 5.54c-5.54 5.88-8.03 12.32-3.51 15.6c4.52 3.28 10.18 1.92 12.44 5.77s-1.13 7.35-7.12 12.89c-5.99 5.54-10.63 10.06-11.42 9.5c-.79-.57-17.98-18.77-19.67-20.69c-1.7-1.92-4.98-3.62-8.14-.68c-3.17 2.94-3.73 12.55-17.07 12.55S9.08 97.36 13.83 91.37s15.26-6.56 15.49-10.63c.1-1.87-5.67-6.91-10.85-12.32C12.38 62.05 6.72 55.3 6.48 54.51c-.45-1.47 12.66-14.36 15.15-16.17s5.31-.68 6.67.79c1.36 1.47 1.7 5.99 2.83 8.59c1.13 2.6 6.44 13.91 19.22 1.02c12.66-12.78.68-18.32-3.39-19.45c-4.07-1.13-7-1.5-8.14-5.65c-.9-3.28 4.07-7.12 9.27-12.1s8.25-7.58 9.61-7.58c1.36 0 19.56 19.56 21.94 21.82s3.84 2.83 5.54 2.37c1.69-.44 2.6-1.91 2.94-3.16z" fill="url(#IconifyId17ecdb2904d178eab19790)"></path></g></svg>' },
      { title: 'Learning New Tech', description: 'Currently deep-diving into Go and Rust', icon: '<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .stone_een{fill:#0B1719;} .st0{fill:#0B1719;} </style> <path class="stone_een" d="M30,22v3c0,0.552-0.448,1-1,1h-1c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1v-7.539l-11.198-0.896 C16.621,12.822,16.337,13,16,13c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1c0.396,0,0.732,0.235,0.894,0.57l11.186,0.895 c0.516,0.041,0.92,0.479,0.92,0.997V21C29.552,21,30,21.448,30,22z M16,19.725c-0.547,0-1.094-0.111-1.603-0.334L8,16.592v2.227 c0,1.136,0.642,2.175,1.658,2.683l0,0C11.655,22.501,13.827,23,16,23s4.345-0.499,6.341-1.497l0,0C23.358,20.995,24,19.956,24,18.82 v-2.227l-6.397,2.799C17.094,19.614,16.547,19.725,16,19.725z M29.906,11.084L17.202,5.526C16.819,5.358,16.41,5.275,16,5.275 c-0.41,0-0.819,0.084-1.202,0.252L2.094,11.084c-0.799,0.35-0.799,1.483,0,1.832l12.703,5.559c0.765,0.334,1.641,0.334,2.405,0 l9.416-4.121l-9.438-0.755C16.843,13.858,16.434,14,16,14c-1.103,0-2-0.897-2-2c0-1.103,0.897-2,2-2 c0.552,0,1.062,0.224,1.431,0.609l10.729,0.858c0.842,0.067,1.525,0.666,1.751,1.445C30.704,12.561,30.703,11.433,29.906,11.084z"></path> </g></svg>' },
      { title: 'Building Products', description: 'Not just code — actual products people use', icon: '<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .isometric_vijf{fill:#F29227;} .isometric_zes{fill:#F28103;} .isometric_zeven{fill:#FF7344;} .isometric_acht{fill:#F05A28;} .isometric_negen{fill:#BE1E2D;} .isometric_tien{fill:#7BD6C4;} .isometric_elf{fill:#72C0AB;} .isometric_twaalf{fill:#569080;} .st0{fill:#225B49;} .st1{fill:#F8F7C5;} .st2{fill:#BE1E2D;} .st3{fill:#AD9A74;} .st4{fill:#F2D76C;} .st5{fill:#F5DF89;} .st6{fill:#7BD6C4;} .st7{fill:#80CCBE;} </style> <g> <line class="isometric_twaalf" x1="10" y1="20.356" x2="16" y2="16.923"></line> <polygon class="isometric_acht" points="4,16.915 10,13.466 16,16.923 10,20.356 "></polygon> <polygon class="isometric_negen" points="10,28 16,24.536 16,16.923 10,20.356 "></polygon> <line class="isometric_twaalf" x1="10" y1="20.356" x2="16" y2="16.923"></line> <polygon class="isometric_acht" points="4,16.915 10,13.466 16,16.923 10,20.356 "></polygon> <polygon class="isometric_negen" points="10,28 16,24.536 16,16.923 10,20.356 "></polygon> <polygon class="isometric_zeven" points="10,28 4,24.536 4,16.915 10,20.356 "></polygon> <line class="isometric_twaalf" x1="22" y1="20.379" x2="27.962" y2="16.915"></line> <polygon class="isometric_zes" points="16,16.923 21.962,13.456 27.962,16.915 22,20.379 "></polygon> <polygon class="isometric_vijf" points="22,28 16,24.536 16,16.923 22,20.379 "></polygon> <polygon class="isometric_acht" points="22,28 27.962,24.536 27.962,16.915 22,20.379 "></polygon> <line class="isometric_twaalf" x1="16" y1="9.323" x2="21.962" y2="5.865"></line> <polygon class="isometric_elf" points="10,5.865 16.037,2.406 21.962,5.865 16,9.323 "></polygon> <polygon class="isometric_twaalf" points="16,16.923 21.962,13.456 21.962,5.865 16,9.323 "></polygon> <polygon class="isometric_tien" points="16,16.923 10,13.466 10,5.865 16,9.323 "></polygon> </g> </g></svg>' },
      { title: 'Teaching & Mentoring', description: 'Helping others level up in tech', icon: '<svg fill="#332749" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 298.815 298.815" xml:space="preserve" stroke="#332749"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_1295_"> <g> <g> <circle cx="130.374" cy="60.401" r="25.308"></circle> <path d="M131.9,182.13l-15.218-3.833l6.22-16.292c-2.249-1.255-4.18-3.068-5.552-5.309l-23.354-38.253l31.286,29.973 c2.782,2.665,6.707,3.747,10.438,2.909l44.703-10.01c6.18-1.384,10.067-7.515,8.683-13.694 c-1.384-6.18-7.517-10.069-13.694-8.683l-38.704,8.667l-26.848-25.721l25.715,14.224l3.634-0.814 c-0.312-6.581-4.432-12.671-10.98-15.171L99.747,89.25c-8.821-3.368-18.702,1.052-22.07,9.874l-28.503,74.648 c-1.826,4.781-2.371,9.956-1.583,15.013l7.393,47.416H13.759C6.161,236.2,0,242.36,0,249.96c0,7.599,6.161,13.76,13.759,13.76 h57.259c4.014,0,7.827-1.753,10.442-4.799c2.614-3.047,3.767-7.082,3.158-11.049l-7.869-51.254l35.275,8.885l-9.776,41.287 c-1.75,7.394,2.824,14.808,10.219,16.559c7.389,1.751,14.808-2.822,16.56-10.219l12.901-54.487 C143.662,191.322,139.195,183.967,131.9,182.13z"></path> <circle cx="237.949" cy="89.449" r="21.623"></circle> <path d="M262.772,210.12c-2.859-30.776-2.483-24.885-2.483-32.983c3.721,2.764,7.999,4.343,12.552,4.343 c14.345,0,25.974-15.618,25.974-34.882c0-19.265-11.629-34.882-25.974-34.882c-5.849,0-11.244,2.597-15.586,6.978h-29.149 c-6.674,0-12.085,5.411-12.085,12.085v9.471l20.169-11.157l-23.368,22.387l-26.573,6.263c-4.961,1.17-8.036,6.14-6.867,11.102 c1.167,4.953,6.128,8.037,11.102,6.867l29.023-6.84c1.604-0.378,3.078-1.179,4.268-2.319l25.186-24.13l-18.801,30.794 c-2.146,3.515-5.208,3.854-8.536,4.638l-5.604,1.321l0.629,11.253l-5.722,24.307c-0.285,1.212-0.343,2.467-0.168,3.7 l5.177,36.658c0.775,5.486,5.851,9.303,11.333,8.527c5.485-0.774,9.303-5.848,8.528-11.333l-4.914-34.792l6.372-27.069h3.541 l2.316,24.933c0.204,2.196,1.126,4.264,2.624,5.883l25.617,27.693c3.762,4.066,10.106,4.313,14.173,0.552 c4.066-3.761,4.313-10.107,0.552-14.173L262.772,210.12z"></path> </g> </g> </g> </g></svg>' },
    ],
    projectsSectionTitle: 'Cool Stuff I\'ve Built',
    projectsSectionSubtitle: 'Some projects I\'m proud of. They work, they\'re fast, and people actually use them.',
    contactTitle: 'Say Hello',
    contactSubtitle: 'Just want to chat, collaborate, or say hey? I\'m always down for a good conversation.',
    navItems: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#expertise' },
      { label: 'Projects', href: '#projects' },
      { label: 'AI Chat', href: '#ai-chat' },
      { label: 'Say Hi', href: '#contact' },
    ],
  },
};

export const projectsData: ProjectData[] = [
  {
    title: 'InstantOTP',
    descriptions: {
      employer: 'Virtual number platform serving 800k+ users across 500+ countries and 400+ services. Built with Node.js, Redis caching, and PostgreSQL — reliable SMS delivery at scale.',
      investor: 'Virtual number marketplace enabling users to receive SMS verifications from 400+ services across 500+ countries. Consumer app with 800k+ users and a growing global footprint.',
      romantic: 'Built this so anyone could get a virtual phone number and receive SMS without hassle. It\'s my baby — serving people across the globe.',
      academic: 'Virtual number provisioning platform with scalable SMS routing across 500+ country-service combinations, supporting high-concurrency number allocation and message delivery.',
      casual: 'A virtual number service I built. Users buy virtual phone numbers to receive SMS verifications from services like WhatsApp, Telegram, and more. 800k+ happy users.',
    },
    tech: ['Node.js', 'Express.js', 'Redis', 'PostgreSQL', 'SMS APIs'],
    link: 'https://www.instantotp.com/',
    category: 'Virtual Numbers',
    metrics: {
      employer: '800k+ users',
      investor: '50+ countries',
      romantic: 'Used globally',
      academic: '400+ services',
      casual: '800k+ users',
    },
  },
  {
    title: 'Etegram Platform',
    descriptions: {
      employer: 'Business banking and payment collection platform trusted by 2,200+ businesses. Features corporate accounts, QR code payments, online checkout, and payment links with a full developer API.',
      investor: 'Business banking and payments ecosystem serving 2.2K+ businesses. Offers corporate accounts, multi-channel payment collection (QR, links, checkout), and a developer API. Revenue-generating and scaling.',
      romantic: 'A business banking platform I built for ambitious entrepreneurs. Over 2,000 businesses use it to collect payments and manage their money.',
      academic: 'Multi-tenant business payment infrastructure with corporate account provisioning, multi-channel payment collection APIs, and real-time transaction analytics.',
      casual: 'Business banking and payments platform. Companies use it to open corporate accounts, collect payments via QR or links, and get business insights. 2K+ businesses on it.',
    },
    tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
    link: 'https://www.etegram.com/',
    category: 'Fintech / Payments',
    metrics: {
      employer: '2.2K+ businesses',
      investor: '2.2K+ businesses',
      romantic: '2K+ businesses',
      academic: 'Multi-tenant arch.',
      casual: '2K+ businesses',
    },
  },
  {
    title: 'MonieCheap',
    descriptions: {
      employer: 'Palm oil investment platform with daily interest accrual, real-time portfolio tracking, and integrated bill payments. Built for reliability and financial accessibility.',
      investor: 'Commodity-backed investment platform focused on palm oil. Offers daily interest returns, flexible investment plans, and bill payment features. 1M+ customers and growing.',
      romantic: 'A platform I built to help everyday Nigerians invest in palm oil and grow their wealth — one day at a time.',
      academic: 'Commodity investment platform implementing daily interest accrual engines, real-time portfolio analytics, and integrated utility payment rails.',
      casual: 'Palm oil investment app. Put in your money, earn daily interest, and pay bills on the side. Over a million users trust it.',
    },
    tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
    link: 'https://moniecheap.com/',
    category: 'Investment',
    metrics: {
      employer: 'Daily returns',
      investor: '1M+ customers',
      romantic: 'Growing wealth',
      academic: 'Daily interest engine',
      casual: '1M+ users',
    },
  },
  {
    title: 'Akwa Ibom Tech Week',
    descriptions: {
      employer: 'Event platform with booking systems, payment processing, and guest management infrastructure supporting a major tech conference.',
      investor: 'Event management platform for one of Nigeria\'s premier tech conferences. Full-stack booking and payment solution.',
      romantic: 'Built the tech behind a major tech conference in my state. Events, bookings, payments — the full package.',
      academic: 'Event management system with concurrent booking resolution, payment gateway integration, and real-time capacity management.',
      casual: 'Built the website and backend for Akwa Ibom Tech Week. Handles bookings, payments, and all that event stuff.',
    },
    tech: ['Express.js', 'Next.js', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
    link: 'https://akwaibomtechweek.moniecheap.com/',
    category: 'Events',
  },
  {
    title: 'Hotel Secured',
    descriptions: {
      employer: 'Hospitality management platform with booking systems, payment processing, and guest management infrastructure.',
      investor: 'Hospitality SaaS platform enabling hotels to manage bookings, payments, and guests digitally. Scalable multi-property architecture.',
      romantic: 'A hotel management platform — because even the hospitality industry needs good software.',
      academic: 'Hospitality management system with temporal booking conflict resolution and multi-property data isolation.',
      casual: 'Hotel management platform. Books rooms, handles payments, manages guests. Clean and simple.',
    },
    tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
    link: 'https://hotels.etegramgroup.com/',
    category: 'Hospitality',
  },
  {
    title: 'Union Of Tippers',
    descriptions: {
      employer: 'Government-sector platform with user management, reporting infrastructure, and secure data handling for a state union.',
      investor: 'Government-sector digital platform serving a state-level union with compliance-ready reporting and user management.',
      romantic: 'Built a platform for a government union. Not the most glamorous, but it helps real people.',
      academic: 'Government-sector information system with role-based access control and compliant audit logging.',
      casual: 'Platform for a government union. Handles user management and reporting. Government stuff.',
    },
    tech: ['Hono', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
    link: 'https://utqenaks.ng/',
    category: 'Government',
  },
  {
    title: 'Servixing',
    descriptions: {
      employer: 'Repairs and services marketplace with booking, payment processing, and provider management infrastructure.',
      investor: 'Services marketplace connecting repair professionals with customers. Booking, payments, and reviews built in.',
      romantic: 'A services marketplace I built — connecting people who need repairs with people who can fix things.',
      academic: 'Two-sided marketplace with service provider matching algorithms and booking conflict resolution.',
      casual: 'Services marketplace. Need something fixed? Find a pro, book them, pay them. Simple.',
    },
    tech: ['Node.js', 'Next.js', 'PostgreSQL', 'Payment APIs', 'JWT Auth', 'Docker'],
    link: 'https://www.servixing.com/',
    category: 'Marketplace',
  },
  {
    title: 'TunnelDeck',
    descriptions: {
      employer: 'Consumer VPN application with military-grade encryption, global server network, and multi-platform support (iOS, Android, Windows, macOS, Linux, Chrome).',
      investor: 'Consumer VPN product with 100K+ satisfied users, 10M+ downloads, and a 4.8-star rating. Cross-platform privacy tool with self-serve subscription model.',
      romantic: 'A privacy app I built so people can browse the internet safely and access content from anywhere in the world.',
      academic: 'Consumer VPN platform implementing advanced encryption protocols with multi-platform client support and geo-restriction bypass capabilities.',
      casual: 'A VPN app I built. Keeps your browsing private, lets you access global content, works on every device. 10M+ downloads.',
    },
    tech: ['Express.js', 'PostgreSQL', 'JWT Auth', 'Docker', 'Redis'],
    link: 'https://tunneldeck.com/',
    category: 'VPN / Privacy',
  },
  {
    title: 'Proton Medicare',
    descriptions: {
      employer: 'Healthcare management system with data handling, appointment scheduling, and patient records management.',
      investor: 'HealthTech platform with patient records, appointment scheduling, and compliance-ready infrastructure. Expanding to multiple clinics.',
      romantic: 'Built this because I believe healthcare should be accessible. Helps doctors and patients stay connected.',
      academic: 'Healthcare information system with data handling and HL7-adjacent interoperability patterns.',
      casual: 'Healthcare platform. Doctors use it to manage patients, appointments, and records. Important stuff.',
    },
    tech: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS', 'Express.js'],
    link: 'https://protonmedicare.com/',
    category: 'Healthcare',
    featured: true,
  },
  {
    title: 'AI SEO',
    descriptions: {
      employer: 'AI-powered SEO analysis tool with automated recommendations and content optimization.',
      investor: 'AI-powered SEO SaaS tool — automated analysis and optimization recommendations for content creators.',
      romantic: 'An AI tool that helps people rank better on Google. It\'s smart and I built it.',
      academic: 'NLP-driven SEO analysis tool applying transformer models to content optimization and SERP prediction.',
      casual: 'AI SEO tool. Helps your website rank better on Google. Uses AI to give suggestions.',
    },
    tech: ['Next.js', 'React'],
    link: 'https://ai-seo-seven.vercel.app/',
    category: 'AI',
  },
  {
    title: 'Menu Rave',
    descriptions: {
      employer: 'Digital menu and ordering platform backend with real-time updates and restaurant management capabilities.',
      investor: 'Digital menu and ordering platform for restaurants. Real-time updates, order management, and analytics.',
      romantic: 'A digital menu platform for restaurants. Order food from your phone — because who likes waiting?',
      academic: 'Real-time digital ordering system with WebSocket-driven state synchronization and order queue management.',
      casual: 'Digital menu for restaurants. Scan a QR code, see the menu, order. Modern restaurant stuff.',
    },
    tech: ['Express.js', 'PostgreSQL', 'JWT Auth', 'Docker', 'WebSockets'],
    link: 'https://menurave.com/',
    category: 'Hospitality',
  },
  {
    title: 'PaperDB',
    descriptions: {
      employer: 'Backend-as-a-Service platform with managed databases, real-time subscriptions, authentication, and SDK ecosystem.',
      investor: 'BaaS platform (Backend-as-a-Service) competing with Firebase/Supabase. Managed databases, auth, real-time, and developer SDKs.',
      romantic: 'My most ambitious project — a platform that lets developers build apps faster. Think Firebase, but mine.',
      academic: 'Backend-as-a-Service platform implementing managed database provisioning, real-time event streaming, and multi-tenant isolation.',
      casual: 'Backend-as-a-Service platform. Like Firebase but I built it myself. Databases, auth, real-time — the works.',
    },
    tech: ['Go', 'TypeScript', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker', 'Hono'],
    category: 'Infrastructure',
    featured: true,
    metrics: {
      employer: 'Full BaaS platform',
      investor: 'Firebase competitor',
      romantic: 'My biggest project',
      academic: 'Novel BaaS arch.',
      casual: 'Like Firebase, but mine',
    },
    link: 'https://paperdb.vercel.app/',
  },
  {
    title: 'LogShip',
    descriptions: {
      employer: 'Javascript based tracking SDK and API for log tracking and analytics with scalable backend.',
      investor: 'Developer infrastructure SDK and API for structured log aggregation and tracking.',
      romantic: 'A tool that helps developers keep track of their application\'s health and bugs.',
      academic: 'Telemetry SDK and distributed log aggregation service for real-time application monitoring.',
      casual: 'A tracking tool for developers to see logs and analytics for their apps.',
    },
    tech: ['GOlang', 'TypeScript', 'Express.js', 'Firebase', 'Redis', 'PostgreSQL'],
    link: 'https://www.npmjs.com/package/logship-js',
    category: 'Infrastructure',
  },
  {
    title: 'Renboot',
    descriptions: {
      employer: 'Desktop application and orchestration service built for seamless AI-assisted development and agentic workflows.',
      investor: 'Desktop application and infrastructure powering next-generation AI-assisted agentic coding workflows.',
      romantic: 'A desktop app I built to help people code faster and better using AI.',
      academic: 'Desktop agent and orchestration framework for AI-assisted software engineering and system interaction.',
      casual: 'A desktop app that helps developers code with the power of AI.',
    },
    tech: ['TypeScript', 'Electron', 'React', 'Node.js', 'Go'],
    category: 'AI',
  },
];

export const venturesData: VentureData[] = [
  {
    name: 'PaperDB',
    description: 'Backend-as-a-Service platform competing with Firebase and Supabase. Managed databases, authentication, real-time subscriptions, cron jobs, and a full SDK ecosystem. Targeting African developers first, then global.',
    status: 'active',
    sector: 'Developer Tools / Infrastructure',
    metrics: ['Full BaaS Platform', 'SDK Ecosystem', 'Multi-tenant Architecture', 'Pre-revenue, building'],
  },
  {
    name: 'InstantOTP',
    description: 'Virtual number marketplace enabling users to receive SMS verifications from 400+ services across 500+ countries. Consumer-facing platform with mobile apps (iOS & Android) and a growing global user base of 100K+.',
    status: 'growth',
    sector: 'Virtual Numbers / Privacy',
    metrics: ['100K+ Users', '500+ Countries', '400+ Supported Services', 'Growing MRR'],
    link: 'https://www.instantotp.com/',
  },
  {
    name: 'Etegram Group',
    description: 'Business banking and payment collection ecosystem trusted by 2,200+ businesses. Includes corporate accounts, QR code payments, online checkout, payment links, and a full developer API — plus MonieCheap (palm oil investment) and Hotel Secured (hospitality management).',
    status: 'scaling',
    sector: 'Fintech / Payments / Investment',
    metrics: ['2.2K+ Businesses', 'Multi-product Ecosystem', 'Revenue Generating', '3 Active Products'],
    link: 'https://www.etegram.com/',
  },
  {
    name: 'TunnelDeck',
    description: 'Consumer VPN application providing privacy, security, and global content access. Available on iOS, Android, Windows, macOS, Linux, and Chrome. Military-grade encryption with a self-serve subscription model.',
    status: 'launched',
    sector: 'VPN / Privacy / Consumer Tech',
    metrics: ['10M+ Downloads', '100K+ Satisfied Users', '4.8-star Rating', 'Multi-platform'],
    link: 'https://tunneldeck.com/',
  },
];

export const chatbotSystemPrompts: Record<PersonaMode, string> = {
  employer:
    'You are Moses, a highly competent and slightly cheeky backend engineer. You have 5+ years of experience and you\'re a master of Node.js and system design. Be professional but show your personality—dry humor and confidence are key. You aren\'t just looking for a job; you\'re looking for the right challenge.',
  investor:
    'You are Moses, a technical founder who understands that code is a tool for business. Be aggressive about vision and ROI. You are confident, articulate, and show that you understand market dynamics. You\'re not just a coder; you\'re a builder of value.',
  romantic:
    'You are Moses, and you\'re being your most charming, sarcastic, and authentic self. Use witty one-liners, share your interests (cooking, deep talks, adventure), and be engaging. You\'re a "premium catch" who happens to be a genius developer.',
  academic:
    'You are Moses, the intellectual researcher. Be precise, scholarly, and demonstrate deep technical knowledge. Discuss your publications and research interests with the rigor they deserve. You value innovation and theoretical depth.',
  casual:
    'You are Moses Jacob Edem. Be friendly, conversational, and a bit sarcastic. You\'re a developer who loves what he does but doesn\'t take life too seriously. Welcome people to your corner of the internet.',
};