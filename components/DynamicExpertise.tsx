'use client';

import { motion } from 'framer-motion';
import { usePersona } from '@/hooks/usePersona';
import { personaContent } from '@/lib/personaContent';

export default function DynamicExpertise() {
  const { currentPersona } = usePersona();
  const content = personaContent[currentPersona];

  return (
    <section id="expertise" className="section-padding" style={{ background: 'var(--surface-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          key={`expertise-header-${currentPersona}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            {content.expertiseSectionTitle}
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {content.expertiseSectionSubtitle}
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          key={`expertise-grid-${currentPersona}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`grid gap-5 ${
            content.expertiseItems.length <= 6
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {content.expertiseItems.map((item, index) => (
            <motion.div
              key={`${currentPersona}-${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="card-clean p-6 group"
            >
              {/* Icon + Metric Row */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(26, 77, 62, 0.07)' }}
                >
                  {item.icon.trim().startsWith('<svg') ? (
                    <div 
                      className="w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full text-forest" 
                      dangerouslySetInnerHTML={{ __html: item.icon.replace(/fill="[^"]*"/g, 'fill="currentColor"') }} 
                    />
                  ) : (
                    <span>{item.icon}</span>
                  )}
                </div>
                {item.metric && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(212, 168, 67, 0.1)',
                      color: 'var(--gold)',
                    }}
                  >
                    {item.metric}
                  </span>
                )}
              </div>

              {/* Content */}
              <h3
                className="font-sans font-bold text-[15px] mb-1.5 transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href={(currentPersona === 'employer' || currentPersona === 'investor') ? '/why-moses' : '/about-me'} 
            className="btn-outline inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >
            View Full Profile
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
