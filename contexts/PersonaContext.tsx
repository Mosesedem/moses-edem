'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { PersonaMode, PersonaContextType } from '@/types/persona';

export const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [currentPersona, setCurrentPersona] = useState<PersonaMode>('casual');
  const [showModal, setShowModal] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persona from localStorage on mount
  useEffect(() => {
    const savedPersona = localStorage.getItem('selectedPersona') as PersonaMode | null;
    if (savedPersona && ['employer', 'investor', 'romantic', 'academic', 'casual'].includes(savedPersona)) {
      setCurrentPersona(savedPersona);
    } else {
      // First time visitor - show modal
      setShowModal(true);
    }
    setIsHydrated(true);
  }, []);

  const handleSetPersona = (persona: PersonaMode) => {
    setCurrentPersona(persona);
    localStorage.setItem('selectedPersona', persona);
    setShowModal(false);
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <PersonaContext.Provider
      value={{
        currentPersona,
        setPersona: handleSetPersona,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}
