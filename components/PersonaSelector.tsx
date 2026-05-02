'use client';

import { useState, useRef, useEffect } from 'react';
import { usePersona } from '@/hooks/usePersona';
import { PERSONA_LABELS, PERSONA_EMOJIS, PersonaMode } from '@/types/persona';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const personas: PersonaMode[] = ['employer', 'investor', 'romantic', 'academic', 'casual'];

export default function PersonaSelector() {
  const { currentPersona, setPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="persona-badge flex items-center gap-2"
      >
        <span>{PERSONA_EMOJIS[currentPersona]}</span>
        <span className="hidden sm:inline">{PERSONA_LABELS[currentPersona].split('/')[0].trim()}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-muted)' }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-[240px] rounded-2xl overflow-hidden z-50"
            style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div className="p-1.5">
              {personas.map((persona) => {
                const isActive = currentPersona === persona;
                return (
                  <button
                    key={persona}
                    onClick={() => {
                      setPersona(persona);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: isActive ? 'var(--surface-secondary)' : 'transparent',
                      color: isActive ? 'var(--forest)' : 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--surface-secondary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span className="text-lg">{PERSONA_EMOJIS[persona]}</span>
                    <span className="text-sm font-medium flex-1">{PERSONA_LABELS[persona]}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
