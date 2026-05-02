'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Active Ventures', value: 4, suffix: '', icon: '🏢' },
  { label: 'Daily Users', value: 10, suffix: 'K+', icon: '👥' },
  { label: 'Industries Served', value: 6, suffix: '+', icon: '🌍' },
  { label: 'Products Shipped', value: 12, suffix: '+', icon: '🚀' },
];

function AnimatedCounter({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <span className="font-sans font-black text-3xl sm:text-4xl" style={{ color: 'var(--forest)' }}>
      {count}{suffix}
    </span>
  );
}

export default function VentureStatsCard() {
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
          style={{ background: 'rgba(26, 77, 62, 0.08)' }}
        >
          <span className="text-lg">📊</span>
        </div>
        <div>
          <h3 className="font-sans font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Venture Overview
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Live metrics across portfolio
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#28C840' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--forest-light)' }}>Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="rounded-xl p-4 text-center"
            style={{
              background: 'var(--surface-secondary)',
              border: '1px solid var(--border-light)',
            }}
          >
            <span className="text-xl mb-1 block">{stat.icon}</span>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={500 + index * 200} />
            <p className="text-[11px] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom tag */}
      <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-light)' }}>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Building across Fintech, HealthTech, E-commerce & more
        </span>
        <span className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>
          Since 2019
        </span>
      </div>
    </motion.div>
  );
}
