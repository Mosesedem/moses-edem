'use client';

import { PERSONA_LABELS, PERSONA_DESCRIPTIONS, PersonaMode } from '@/types/persona';
import { motion, AnimatePresence } from 'framer-motion';

const personas: PersonaMode[] = ['employer', 'investor', 'romantic', 'academic', 'casual'];

interface PersonaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (persona: PersonaMode) => void;
}

export default function PersonaSelectionModal({ isOpen, onClose, onSelect }: PersonaSelectionModalProps) {
  const handleSelect = (persona: PersonaMode) => {
    onSelect(persona);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background border border-border rounded-lg shadow-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome!</h2>
              <p className="text-muted-foreground mb-8">
                I wear different hats depending on who I&apos;m talking to. Who are you?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personas.map((persona) => (
                  <motion.button
                    key={persona}
                    onClick={() => handleSelect(persona)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-foreground mb-1">
                      {PERSONA_LABELS[persona]}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {PERSONA_DESCRIPTIONS[persona]}
                    </p>
                  </motion.button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-8 text-center">
                You can change this later by clicking the persona button in the navigation.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
