export type PersonaMode = 'employer' | 'investor' | 'romantic' | 'academic' | 'casual';

export interface PersonaContextType {
  currentPersona: PersonaMode;
  setPersona: (persona: PersonaMode) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const PERSONA_LABELS: Record<PersonaMode, string> = {
  employer: 'Employer/Recruiter',
  investor: 'Investor/Partner',
  romantic: 'Romantic Interest',
  academic: 'Academic/Research',
  casual: 'Casual Visitor',
};

export const PERSONA_DESCRIPTIONS: Record<PersonaMode, string> = {
  employer: 'Professional experience, skills, and achievements',
  investor: 'Business acumen, growth potential, and vision',
  romantic: 'Values, interests, personality, and compatibility',
  academic: 'Credentials, research, and intellectual pursuits',
  casual: 'General overview of who I am',
};
