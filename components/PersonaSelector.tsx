'use client';

import { useState } from 'react';
import { usePersona } from '@/hooks/usePersona';
import { PERSONA_LABELS, PersonaMode } from '@/types/persona';
import { motion, AnimatePresence } from 'framer-motion';

const personas: PersonaMode[] = ['employer', 'investor', 'romantic', 'academic', 'casual'];

export function PersonaSelector() {
  const { currentPersona, setPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-foreground border border-accent/30 transition-colors text-sm font-medium"
      >
        {PERSONA_LABELS[currentPersona].split('/')[0]}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-40 min-w-max"
          >
            {personas.map((persona) => (
              <button
                key={persona}
                onClick={() => {
                  setPersona(persona);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-accent/10 transition-colors ${
                  currentPersona === persona ? 'bg-accent/20 font-semibold' : ''
                }`}
              >
                {PERSONA_LABELS[persona]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
