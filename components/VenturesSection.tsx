'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { venturesData } from '@/lib/personaContent';

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e', label: 'Active' },
  scaling: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', label: 'Scaling' },
  growth: { bg: 'rgba(212, 168, 67, 0.1)', text: '#D4A843', label: 'Growth' },
  launched: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6', label: 'Launched' },
};

export default function VenturesSection() {
  return (
    <section id="ventures" className="section-padding" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            Companies & Ventures
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Products I&apos;ve founded and built from scratch — real companies with real users and real growth.
          </p>
        </motion.div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {venturesData.map((venture, index) => {
            const status = statusStyles[venture.status];
            return (
              <motion.div
                key={venture.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-clean overflow-hidden group"
              >
                {/* Top accent */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, var(--forest), var(--gold))` }} />

                <div className="p-6 sm:p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="font-sans font-bold text-xl transition-colors duration-300 group-hover:text-forest"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {venture.name}
                        </h3>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1"
                          style={{ background: status.bg, color: status.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.text }} />
                          {status.label}
                        </span>
                      </div>
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {venture.sector}
                      </span>
                    </div>
                    {venture.link && (
                      <a
                        href={venture.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-60 group-hover:opacity-100"
                        style={{
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {venture.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2">
                    {venture.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(26, 77, 62, 0.06)',
                          color: 'var(--forest)',
                          border: '1px solid rgba(26, 77, 62, 0.1)',
                        }}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
