'use client';

import { PersonaMode, PERSONA_DIALOG_TITLES, PERSONA_DIALOG_LINES, PERSONA_EMOJIS } from '@/types/persona';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '@/hooks/usePersona';

const personas: PersonaMode[] = ['employer', 'investor', 'romantic', 'academic', 'casual'];

export default function IntentDialog() {
  const { hasSelectedInitialPersona, setPersona } = usePersona();

  return (
    <AnimatePresence>
      {!hasSelectedInitialPersona && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] overflow-y-auto"
          style={{ background: 'var(--forest-deep)' }}
        >
          {/* Subtle background pattern */}
          <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />

          <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto px-6 py-12 sm:py-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center mb-12"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: 'var(--gold)' }}
              >
                Welcome to my corner of the internet
              </motion.p>
              <h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight"
                style={{ color: 'var(--text-on-dark)' }}
              >
                So… who are you?
              </h1>
              <p
                className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
                style={{ color: 'var(--text-on-dark-muted)' }}
              >
                I tailor this entire experience based on who&apos;s visiting.
                Pick the one that fits and I&apos;ll make it worth your time.
              </p>
            </motion.div>

            {/* Persona Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto"
            >
              {personas.map((persona, index) => (
                <motion.button
                  key={persona}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPersona(persona)}
                  className="intent-card text-left p-6 sm:p-7 group"
                >
                  <div className="text-3xl mb-3">{PERSONA_EMOJIS[persona]}</div>
                  <h3 className="font-sans font-bold text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    {PERSONA_DIALOG_TITLES[persona]}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {PERSONA_DIALOG_LINES[persona]}
                  </p>
                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
                      Select
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Subtle footer text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center mt-10 text-xs"
              style={{ color: 'var(--text-on-dark-muted)' }}
            >
              You can switch anytime from the navigation bar.
            </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
