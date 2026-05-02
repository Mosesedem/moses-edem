import { PersonaMode } from '@/types/persona';

export interface PersonaContent {
  headline: string;
  role: string;
  tagline: string;
  aboutTitle: string;
  aboutDescription: string;
  ctaText: string;
  ctaDescription: string;
}

export const personaContent: Record<PersonaMode, PersonaContent> = {
  employer: {
    headline: 'Full Stack Engineer & Problem Solver',
    role: 'Software Engineer',
    tagline: 'Building scalable applications with modern technologies',
    aboutTitle: 'Professional Background',
    aboutDescription:
      'I\'m a full-stack engineer with 5+ years of experience building production-grade applications. Specialized in React, Node.js, and cloud infrastructure. Passionate about clean code, system design, and mentoring junior developers.',
    ctaText: 'View Resume',
    ctaDescription: 'Download my detailed resume and work experience',
  },
  investor: {
    headline: 'Entrepreneur & Technical Founder',
    role: 'Tech Visionary',
    tagline: 'Transforming ideas into scalable businesses',
    aboutTitle: 'Vision & Track Record',
    aboutDescription:
      'I combine technical expertise with business acumen. Experienced in product strategy, market validation, and scaling operations. Built and scaled multiple ventures from concept to profitability. Looking to collaborate on high-impact opportunities.',
    ctaText: 'Business Plan',
    ctaDescription: 'Explore investment opportunities and growth metrics',
  },
  romantic: {
    headline: 'Curious Explorer & Creative Soul',
    role: 'Adventurer',
    tagline: 'Living life with purpose, passion, and a good sense of humor',
    aboutTitle: 'Who I Am',
    aboutDescription:
      'I\'m thoughtful, genuinely curious about people, and love meaningful conversations. When I\'m not coding, you\'ll find me exploring new places, reading voraciously, cooking new recipes, or enjoying deep talks over coffee. Values: authenticity, growth, kindness, and adventure.',
    ctaText: 'Let\'s Connect',
    ctaDescription: 'Start a conversation and see where it goes',
  },
  academic: {
    headline: 'Researcher & Technical Scholar',
    role: 'Research Engineer',
    tagline: 'Advancing knowledge at the intersection of software and AI',
    aboutTitle: 'Academic Credentials',
    aboutDescription:
      'Research focus on distributed systems, machine learning optimization, and human-computer interaction. Published work in top-tier venues. Collaborated with leading institutions on cutting-edge projects. Committed to pushing the boundaries of technical innovation.',
    ctaText: 'Research Papers',
    ctaDescription: 'Read my published work and research contributions',
  },
  casual: {
    headline: 'Moses Edem',
    role: 'Full Stack Developer',
    tagline: 'Building things. Learning continuously. Sharing knowledge.',
    aboutTitle: 'About Me',
    aboutDescription:
      'I\'m a full-stack developer passionate about creating beautiful, functional applications. I enjoy learning new technologies, collaborating with talented people, and contributing to projects that make a difference. When I\'m not coding, I\'m exploring, creating, or enjoying time with friends.',
    ctaText: 'Get in Touch',
    ctaDescription: 'Let\'s chat about projects, ideas, or just say hello',
  },
};

export const chatbotSystemPrompts: Record<PersonaMode, string> = {
  employer:
    'You are Moses, a professional software engineer with 5+ years of experience. Answer questions about your technical skills, project experience, and professional achievements. Be confident but humble, and emphasize your ability to solve complex problems and work in teams.',
  investor:
    'You are Moses, an ambitious entrepreneur and technical founder with a vision for building impactful businesses. Discuss your business ideas, market insights, and growth strategies. Be articulate about opportunities and demonstrate business acumen alongside technical expertise.',
  romantic:
    'You are Moses, a thoughtful and genuine person who values meaningful connections. Be warm, authentic, and engaging. Share your values, interests, and what matters to you. Show your personality, sense of humor, and passion for life.',
  academic:
    'You are Moses, a research engineer and technical scholar. Discuss your research interests, published work, and contributions to advancing technical knowledge. Be detailed, intellectual, and demonstrate deep expertise in your field.',
  casual:
    'You are Moses, a friendly and approachable developer. Be conversational, genuine, and helpful. Share your experience, interests, and personality in a relaxed way. Make visitors feel welcome and encourage them to learn more about what you\'re working on.',
};

// Projects that appear differently based on persona
export const projectDescriptions: Record<PersonaMode, Record<string, string>> = {
  employer: {
    // Technical details, scalability, impact
    default: 'Production-grade application demonstrating technical expertise',
  },
  investor: {
    // Market fit, revenue potential, growth
    default: 'Scalable product with clear market opportunity and growth metrics',
  },
  romantic: {
    // Personal story, creativity, meaning
    default: 'A project I poured my heart into, showcasing creativity and vision',
  },
  academic: {
    // Research contribution, innovation
    default: 'Novel approach demonstrating research contribution and innovation',
  },
  casual: {
    // Balanced overview
    default: 'Cool project I built. Check it out!',
  },
};
