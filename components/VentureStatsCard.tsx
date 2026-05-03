'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
  { label: 'Active ventures', value: 4, suffix: '' },
  { label: 'Total Users', value: 100, suffix: 'K+' },
  { label: 'Industries served', value: 5, suffix: '+' },
  { label: 'Products shipped', value: 12, suffix: '+' },
];

const industries = ['Fintech', 'HealthTech', '', 'E-commerce', '', 'SaaS', 'Logistics'];

function AnimatedNumber({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(count, target, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1], // expo ease-out
      });
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay, count]);

  return (
    <span
      style={{
        fontFamily: 'var(--font-sans, system-ui)',
        fontSize: 'clamp(28px, 6vw, 38px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--forest, #1a4d3e)',
      }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function VentureStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--surface-elevated, #fff)',
        border: '1px solid var(--border-light, #e8e8e8)',
        borderRadius: 20,
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        boxShadow: 'var(--shadow-lg, 0 8px 32px rgba(0,0,0,0.08))',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-sans, system-ui)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-muted, #999)',
            marginBottom: 6,
          }}
        >
          Venture overview
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans, system-ui)',
            fontSize: 'clamp(16px, 3.5vw, 19px)',
            fontWeight: 500,
            color: 'var(--text-primary, #111)',
            lineHeight: 1.35,
            maxWidth: 280,
          }}
        >
          Building across {industries.length} industries since&nbsp;2019.
        </p>
      </div>

      {/* Stats — horizontal pairs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--border-light, #e8e8e8)',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
            style={{
              background: 'var(--surface-secondary, #f8f8f7)',
              padding: 'clamp(1rem, 3vw, 1.25rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <AnimatedNumber target={stat.value} suffix={stat.suffix} delay={400 + i * 150} />
            <span
              style={{
                fontFamily: 'var(--font-sans, system-ui)',
                fontSize: 11.5,
                fontWeight: 500,
                color: 'var(--text-muted, #999)',
                letterSpacing: '0.01em',
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Industry tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {industries.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
            style={{
              fontFamily: 'var(--font-sans, system-ui)',
              fontSize: 11.5,
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 20,
              background: 'transparent',
              border: '1px solid var(--border-light, #e8e8e8)',
              color: 'var(--text-muted, #999)',
              letterSpacing: '0.01em',
            }}
          >
            {name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}