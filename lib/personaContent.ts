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
    headline: 'Highly Competent Backend Architect',
    role: 'The Engineer You Need',
    tagline: 'I turn complex business logic into elegant, scalable reality while you sleep.',
    aboutTitle: 'The Professional Stats',
    aboutDescription:
      '5+ years of making servers sweat. I specialize in Node.js, Go, and breaking down monolithic disasters into beautiful microservices. I don\'t just write code; I architect solutions that don\'t wake you up at 3 AM.',
    ctaText: 'Hire The Talent',
    ctaDescription: 'Download the proof of my competence (a.k.a. my CV).',
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
  },
};

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

// Projects that appear differently based on persona
export const projectDescriptions: Record<PersonaMode, Record<string, string>> = {
  employer: {
    // Technical details, scalability, impact
    default: 'Production-grade application demonstrating technical expertise and architectural foresight.',
  },
  investor: {
    // Market fit, revenue potential, growth
    default: 'Scalable product with clear market opportunity and aggressive growth potential.',
  },
  romantic: {
    // Personal story, creativity, meaning
    default: 'A project I poured my heart into, showcasing the creativity that drives me beyond the code.',
  },
  academic: {
    // Research contribution, innovation
    default: 'Novel approach demonstrating research contribution and significant technical innovation.',
  },
  casual: {
    // Balanced overview
    default: 'A cool project I built. It works, it\'s fast, and I\'m proud of it.',
  },
};
