'use client';

import { motion } from 'framer-motion';
import { MapPin, Github, Linkedin, Mail } from 'lucide-react';

const quickFacts = [
  { label: 'Based in', value: 'Uyo, Akwa Ibom, Nigeria' },
  { label: 'Focus', value: 'Backend Engineering' },
  { label: 'Experience', value: '7+ Years' },
  { label: 'Vibe', value: 'Building cool stuff' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/mosesedem', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/mosesedem', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mosesedem81@gmail.com', label: 'Email' },
];

export default function QuickBioCard() {
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
      {/* Avatar placeholder & intro */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-serif"
          style={{
            background: 'linear-gradient(135deg, var(--forest), var(--forest-light))',
            color: 'var(--text-on-dark)',
          }}
        >
          ME
        </div>
        <div>
          <h3 className="font-serif text-xl" style={{ color: 'var(--text-primary)' }}>
            Moses Edem
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3 h-3" style={{ color: 'var(--forest-light)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Uyo, Akwa Ibom, Nigeria</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#28C840' }} />
            <span className="text-xs" style={{ color: 'var(--forest-light)' }}>Available</span>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="space-y-3 mb-5">
        {quickFacts.map((fact, index) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl"
            style={{
              background: 'var(--surface-secondary)',
              border: '1px solid var(--border-light)',
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {fact.label}
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {fact.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border-light)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--forest)';
              e.currentTarget.style.borderColor = 'var(--forest)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
