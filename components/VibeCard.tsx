'use client';

import { motion } from 'framer-motion';

const traits = [
  { emoji: '😏', label: 'Sarcasm Level', value: '∞' },
  { emoji: '🍛', label: 'Jollof Rating', value: '10/10' },
  { emoji: '💬', label: 'Deep Talk Ready', value: 'Always' },
  { emoji: '✈️', label: 'Adventure Mode', value: 'On' },
];

const interests = ['Deep conversations', 'Cooking', 'Tech debates', 'Spontaneous plans', 'Dry humor', 'Building things'];

export default function VibeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl p-7 sm:p-8"
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(212, 168, 67, 0.1)' }}
        >
          <span className="text-lg">✨</span>
        </div>
        <div>
          <h3 className="font-sans font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            The Vibe Check
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Quick personality snapshot
          </p>
        </div>
      </div>

      {/* Traits Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {traits.map((trait, index) => (
          <motion.div
            key={trait.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="rounded-xl p-3.5"
            style={{
              background: 'var(--surface-secondary)',
              border: '1px solid var(--border-light)',
            }}
          >
            <span className="text-lg block mb-1">{trait.emoji}</span>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>
              {trait.label}
            </p>
            <p className="font-sans font-bold text-lg" style={{ color: 'var(--forest)' }}>
              {trait.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Interests */}
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-muted)' }}>
          Interests
        </p>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(26, 77, 62, 0.06)',
                color: 'var(--forest)',
                border: '1px solid rgba(26, 77, 62, 0.1)',
              }}
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-4 text-center" style={{ borderTop: '1px solid var(--border-light)' }}>
        <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
          &ldquo;If you can handle my sarcasm, you might just be the one.&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
