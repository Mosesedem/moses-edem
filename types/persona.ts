export type PersonaMode = 'employer' | 'investor' | 'romantic' | 'academic' | 'casual';

export interface PersonaContextType {
  currentPersona: PersonaMode;
  setPersona: (persona: PersonaMode) => void;
  hasSelectedInitialPersona: boolean;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const PERSONA_LABELS: Record<PersonaMode, string> = {
  employer: 'Employer / Recruiter',
  investor: 'Investor / Partner',
  romantic: 'Romantic Interest',
  academic: 'Academic / Research',
  casual: 'Casual Visitor',
};

export const PERSONA_DESCRIPTIONS: Record<PersonaMode, string> = {
  employer: 'Professional experience, skills, and achievements',
  investor: 'Business acumen, growth potential, and vision',
  romantic: 'Values, interests, personality, and compatibility',
  academic: 'Credentials, research, and intellectual pursuits',
  casual: 'General overview of who I am',
};

export const PERSONA_DIALOG_TITLES: Record<PersonaMode, string> = {
  employer: "I'm an Employer",
  investor: "I'm an Investor",
  romantic: "I Want to Marry Moses",
  academic: "I'm His Professor",
  casual: "Just Passing By",
};

export const PERSONA_DIALOG_LINES: Record<PersonaMode, string> = {
  employer: "Let's talk about why I'm your next hire.",
  investor: "Show me the vision… and the numbers.",
  romantic: "Brave choice. Let's see if you can handle the sarcasm.",
  academic: "Ah, a fellow intellectual. Proceed with curiosity.",
  casual: "Just vibing? Cool, me too. Welcome.",
};

export const PERSONA_EMOJIS: Record<PersonaMode, string> = {
  employer: '💼',
  investor: '📈',
  romantic: '💘',
  academic: '🎓',
  casual: '👋',
};
