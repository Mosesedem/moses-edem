/**
 * Structured dating-profile content for the romantic lens.
 * Answers everything a "tell me about yourself" would cover.
 * No emoji. Lucide icon names only.
 */

export type DatingFact = {
  iconName: string;
  key: string;
  value: string;
};

export type DatingInterest = {
  iconName: string;
  title: string;
  description: string;
};

export type RelationshipTrait = {
  label: string;
  highlight: string;
  body: string;
  accent?: boolean;
};

export type VisionStep = {
  date: string;
  title: string;
  description: string;
};

export type AboutChapter = {
  id: string;
  title: string;
  body: string;
};

export type CompatibilityQuestion = {
  id: string;
  question: string;
  options: { id: string; label: string; points: number }[];
};

export type ConversationStarter = {
  category: "icebreaker" | "deep" | "fun" | "values";
  question: string;
};

export type DatingFaq = {
  question: string;
  answer: string;
};

const age = new Date().getFullYear() - 1999;

export const datingProfile = {
  intent: "Looking for a wife",
  intentBody:
    "Not casual. Not situationships. I am looking for a serious partner to build a life and family with. Marriage-minded, intentional, and ready for the real thing.",
  fullName: "Moses Jacob Edem",
  shortName: "Moses",
  age: age,
  height: "6'1\"",
  location: "Uyo, Akwa Ibom, Nigeria",
  role: "Software Developer & Founder",
  tagline:
    "A builder at heart. Software, wealth, and something real with someone worth it.",
  chips: [
    "Serious only",
    "Ambivert",
    "Dark humour",
    "Secure",
    "Faith-driven",
  ],

  stats: [
    { title: String(age), body: "Years old" },
    { title: "6'1\"", body: "Height" },
    { title: "Wife", body: "What I am looking for" },
  ],
  heroIntro:
    "I can debug a server and still hold a real conversation. Sarcasm, deep talks, good food, and someone who will not ask me to fix their printer on the first date.",
  aboutChapters: [
    {
      id: "who",
      title: "Who I am",
      body: "I am a software developer and founder from Uyo who builds things into existence. Not just apps, but futures. My weekends look like writing code that actually works, listening to blues or Afrobeats, and cooking something I invented on the spot.",
    },
    {
      id: "energy",
      title: "How I show up",
      body: "I am an ambivert with a big heart, a dark sense of humour, and the kind of loyalty people write songs about. I am chill until I am not. When I am passionate about something, you will know it immediately.",
    },
    {
      id: "fun",
      title: "Fun fact",
      body: "I box. Not professionally, but enough to surprise people at the gym. The ring taught me discipline, confidence, and a clear head, same as shipping product did.",
    },
    {
      id: "seeking",
      title: "What I am seeking",
      body: "A wife. A partner who wants children, takes faith seriously, loves family, and can match ambition without competing with it. Someone I can build a legacy with, not just share weekends with.",
    },
  ] satisfies AboutChapter[],
  facts: [
    { iconName: "MapPin", key: "Based in", value: "Uyo, Nigeria" },
    {
      iconName: "Code2",
      key: "By day",
      value: "Software Developer & Founder",
    },
    { iconName: "Dumbbell", key: "Surprise skill", value: "Boxing. Yes, really." },
    {
      iconName: "Music",
      key: "Soundtrack",
      value: "Blues and Afrobeats, depending on the mood",
    },
    {
      iconName: "BookOpen",
      key: "Currently",
      value: "Moving into OS-level programming",
    },
    {
      iconName: "Church",
      key: "Faith",
      value: "Very important. A foundation, not a footnote",
    },
    {
      iconName: "Heart",
      key: "Looking for",
      value: "Marriage. A wife, a family, a shared future",
    },
    {
      iconName: "Users",
      key: "Family",
      value: "Everything. Legacy over lifestyle alone",
    },
  ] satisfies DatingFact[],
  interests: [
    {
      iconName: "Music",
      title: "Music",
      description:
        "Blues and Afrobeats are my reset buttons. Music is how I recharge, think, and feel. Not a hobby. A lifestyle.",
    },
    {
      iconName: "ChefHat",
      title: "Cooking",
      description:
        "I genuinely love to cook. Afang, Banga, and whatever I invent on the spot. Creative, grounding, and one of the best ways I show care.",
    },
    {
      iconName: "Plane",
      title: "Travel",
      description:
        "Dream trip: all the STAN countries. Kazakhstan, Uzbekistan, Kyrgyzstan. The kind of trip most people never take.",
    },
    {
      iconName: "BookOpen",
      title: "Reading",
      description:
        "Self-improvement and business books. I invest in my mind the same way I invest in my projects. Intentionally.",
    },
    {
      iconName: "Globe2",
      title: "Global politics",
      description:
        "Geopolitics, diplomacy, how nations move. I watch carefully and love a sharp conversation about it.",
    },
    {
      iconName: "Dumbbell",
      title: "Boxing and gym",
      description:
        "The gym keeps me grounded. Boxing teaches discipline and confidence in a way little else does.",
    },
  ] satisfies DatingInterest[],
  relationshipDna: [
    {
      label: "Love language",
      highlight: "Physical touch",
      body: "Presence over words. Being there, holding space, showing up. That is how I love and how I want to be loved.",
    },
    {
      label: "Communication",
      highlight: "Expressive and open",
      body: "I say what I mean and mean what I say. No games, no subtext. Honest, real conversation.",
    },
    {
      label: "Attachment",
      highlight: "Secure",
      body: "I do not need constant validation, but I show up fully when I am in. Growth is part of the story.",
      accent: true,
    },
    {
      label: "Green flag",
      highlight: "I will make you laugh",
      body: "Not forced, not performed. Real, dark-humoured, sarcastic, belly-laugh funny, with a big heart behind it.",
    },
  ] satisfies RelationshipTrait[],
  greenFlags: [
    "Loyal, respectful, and committed in action, not theory",
    "Intellectually curious. Real conversations, not small talk only",
    "Faith matters to you too. It grounds us both",
    "Family is everything to you, as it is to me",
    "You want children and a real future, not just the present",
    "You appreciate ambition and support the build, not only the results",
    "You can handle dark humour and dish it right back",
  ],
  dealbreakers: ["Cheating", "Disrespect", "Disloyalty", "Single moms"],
  firstDate:
    "A quiet dinner somewhere we can actually hear each other. No noise, no distractions. Just presence, eye contact, and real conversation. Atmosphere matters. Chemistry matters more.",
  perfectWeekend:
    "Build something meaningful in the morning, cook a proper meal, music on, maybe the gym or a walk, then deep conversation into the night. Spontaneous plans welcome if the company is right.",
  quote:
    "Success is being able to independently rely on yourself for the means of a quality life, while having the ones you truly care about right beside you.",
  ventures: [
    {
      type: "Healthcare · Insurtech",
      name: "Proton Medicare",
      description:
        "Affordable health insurance for Nigerians. Transparent, modern, and actually accessible.",
      href: "https://protonmedicare.com",
    },
    {
      type: "Infrastructure · Renttech",
      name: "Renboot",
      description:
        "Rent idle hardware for hosting. Decentralised cloud infrastructure that turns dormant machines into income.",
      href: "https://www.renboot.com",
    },
  ],
  vision: [
    {
      date: "Origins",
      title: "Born in Akwa Ibom",
      description:
        "Uyo taught community, resilience, and the drive to build something that lasts.",
    },
    {
      date: "2015 to 2019",
      title: "School and hustle",
      description:
        "Heritage Polytechnic, then University of Uyo (Soil Science) while teaching myself software.",
    },
    {
      date: "2020 to 2022",
      title: "Broke into tech",
      description:
        "HTML, CSS, JS, then products. Rainbowtellers, Koboconnect, Proton Medicare from the ground up.",
    },
    {
      date: "Now",
      title: "Building",
      description:
        "Scaling ventures, shipping systems, and looking for the person to build a family with.",
    },
    {
      date: "5 years",
      title: "A family man",
      description: "A thriving family. Not someday. With intention.",
    },
    {
      date: "Long-term",
      title: "Legacy",
      description:
        "Passing on wealth to the next generation. Money, values, opportunities, and a name that means something.",
    },
  ] satisfies VisionStep[],
  conversationStarters: [
    {
      category: "icebreaker",
      question: "What is your favourite thing to do on a lazy weekend?",
    },
    {
      category: "icebreaker",
      question: "Do you prefer coffee dates or dinner dates?",
    },
    {
      category: "icebreaker",
      question: "What is the most spontaneous thing you have ever done?",
    },
    {
      category: "icebreaker",
      question: "What kind of music sets the mood for a great night?",
    },
    {
      category: "icebreaker",
      question: "If you could take a day trip anywhere tomorrow, where would you go?",
    },
    {
      category: "deep",
      question: "What values are most important to you in a relationship?",
    },
    {
      category: "deep",
      question: "How do you define success, and what does family mean in that picture?",
    },
    {
      category: "deep",
      question: "What makes you feel alive, and what is on your bucket list?",
    },
    {
      category: "deep",
      question: "What helps you feel loved, safe, and protected?",
    },
    {
      category: "deep",
      question: "What assumption do people make about you that is totally wrong?",
    },
    {
      category: "values",
      question: "How does faith show up in how you want to build a life?",
    },
    {
      category: "values",
      question: "What does marriage mean to you? Not the wedding. The covenant.",
    },
    {
      category: "values",
      question: "How do you want to raise children, if you want them?",
    },
    {
      category: "fun",
      question: "If you could have dinner with any fictional character, who would it be?",
    },
    {
      category: "fun",
      question: "What is your guilty pleasure TV show or movie?",
    },
    {
      category: "fun",
      question: "Would you rather have an incredibly fast car or incredibly fast internet?",
    },
    {
      category: "fun",
      question: "What would your perfect vacation look like?",
    },
  ] satisfies ConversationStarter[],
  faqs: [
    {
      question: "Are you actually looking for marriage?",
      answer:
        "Yes. Wife, children, shared future. I am not here for situationships or endless 'seeing where it goes.' Intentional from day one.",
    },
    {
      question: "What do you actually build?",
      answer:
        "Products and systems. Healthcare, infrastructure, backends people rely on. I am drawn to things that need both technical depth and a clear human vision.",
    },
    {
      question: "What kind of conversations do you value?",
      answer:
        "Ones that go somewhere. Depth over small talk. Both people leave thinking differently than when they started.",
    },
    {
      question: "What does honesty look like for you?",
      answer:
        "Saying what I actually think, even when it is uncomfortable. Not brutal. Real. I would rather have a harder conversation early than a polite misunderstanding later.",
    },
    {
      question: "How important is faith?",
      answer:
        "Very. It is a foundation, not a footnote. I want a partner who takes that seriously too.",
    },
    {
      question: "What are you working on right now?",
      answer:
        "A few ventures at once, plus levelling up technically. If you are curious, ask. I would rather talk about it in conversation than summarise it into a pitch.",
    },
    {
      question: "What do you look for in a partner?",
      answer:
        "Loyalty, respect, intellectual curiosity, faith, family-first energy, and someone who can laugh at dark humour. Ambition that builds with me, not against me.",
    },
    {
      question: "Any dealbreakers?",
      answer:
        "Cheating, disrespect, disloyalty. I also know myself well enough to say I am not open to dating single moms. Clarity saves everyone time.",
    },
  ] satisfies DatingFaq[],
  compatibilityQuestions: [
    {
      id: "intent",
      question: "What are you looking for right now?",
      options: [
        { id: "marriage", label: "Marriage and a life partner", points: 3 },
        { id: "serious", label: "Something serious, open to forever", points: 2 },
        { id: "explore", label: "Getting to know people, no rush", points: 1 },
        { id: "casual", label: "Casual only", points: 0 },
      ],
    },
    {
      id: "faith",
      question: "How does faith fit into your life?",
      options: [
        { id: "central", label: "Central. It shapes how I live", points: 3 },
        { id: "important", label: "Important, though I keep growing", points: 2 },
        { id: "private", label: "Private or cultural more than practiced", points: 1 },
        { id: "none", label: "Not really my thing", points: 0 },
      ],
    },
    {
      id: "family",
      question: "How do you feel about children and family?",
      options: [
        { id: "want", label: "I want children and a family life", points: 3 },
        { id: "open", label: "Open to it with the right person", points: 2 },
        { id: "unsure", label: "Still figuring that out", points: 1 },
        { id: "no", label: "Not something I want", points: 0 },
      ],
    },
    {
      id: "humour",
      question: "Can you handle dry or dark humour?",
      options: [
        { id: "dish", label: "I dish it right back", points: 3 },
        { id: "love", label: "I love it when it is smart", points: 2 },
        { id: "sometimes", label: "Sometimes, depending on the day", points: 1 },
        { id: "soft", label: "I prefer soft and sweet only", points: 0 },
      ],
    },
    {
      id: "ambition",
      question: "How do you feel about a partner who builds companies?",
      options: [
        { id: "cheer", label: "I would cheer and build alongside", points: 3 },
        { id: "support", label: "Supportive as long as we stay connected", points: 2 },
        { id: "balance", label: "Fine if work does not eat the relationship", points: 1 },
        { id: "prefer", label: "I would prefer a 9 to 5 energy only", points: 0 },
      ],
    },
    {
      id: "talk",
      question: "Ideal evening conversation?",
      options: [
        { id: "deep", label: "Deep talks. Life, faith, future", points: 3 },
        { id: "mix", label: "A mix of deep and playful", points: 2 },
        { id: "light", label: "Keep it light and fun", points: 1 },
        { id: "phone", label: "Honestly, phones out and Netflix on", points: 0 },
      ],
    },
  ] satisfies CompatibilityQuestion[],
  ctaChips: [
    "Serious relationship",
    "Uyo, Nigeria",
    "Wants children",
    "Faith-driven",
    "Ambitious builder",
    "Looking for a wife",
  ],
  whatsappNumber: "2349030465501",
  whatsappDefaultText:
    "Hi Moses, I found your dating profile on mosesedem.me and I would like to introduce myself.",
} as const;

export function getWhatsAppUrl(text: string): string {
  const params = new URLSearchParams({
    phone: datingProfile.whatsappNumber,
    text,
    type: "phone_number",
    app_absent: "0",
  });
  return `https://api.whatsapp.com/send?${params.toString()}`;
}
