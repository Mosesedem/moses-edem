'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { PersonaMode, PersonaContextType } from '@/types/persona';

export const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [currentPersona, setCurrentPersona] = useState<PersonaMode>('casual');
  const [hasSelectedInitialPersona, setHasSelectedInitialPersona] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persona from localStorage on mount
  useEffect(() => {
    const savedPersona = localStorage.getItem('selectedPersona') as PersonaMode | null;
    if (savedPersona && ['employer', 'investor', 'romantic', 'academic', 'casual'].includes(savedPersona)) {
      setCurrentPersona(savedPersona);
      setHasSelectedInitialPersona(true);
    } else {
      // First time visitor — will show the intent dialog
      setHasSelectedInitialPersona(false);
    }
    setIsHydrated(true);
  }, []);

  const handleSetPersona = (persona: PersonaMode) => {
    setCurrentPersona(persona);
    localStorage.setItem('selectedPersona', persona);
    setHasSelectedInitialPersona(true);
    setShowModal(false);
  };

  // Don't render children until hydrated to prevent flash
  if (!isHydrated) {
    return null;
  }

  return (
    <PersonaContext.Provider
      value={{
        currentPersona,
        setPersona: handleSetPersona,
        hasSelectedInitialPersona,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}
