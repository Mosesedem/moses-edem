'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { usePersona } from '@/hooks/usePersona';
import { personaContent, projectsData } from '@/lib/personaContent';

export default function ProjectShowcase() {
  const { currentPersona } = usePersona();
  const content = personaContent[currentPersona];
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 6);
  const featured = projectsData.filter((p) => p.featured);
  const regular = projectsData.filter((p) => !p.featured);
  const displayRegular = showAll ? regular : regular.slice(0, 3);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    Authentication: '#6366f1',
    'E-commerce': '#ec4899',
    Fintech: '#14b8a6',
    Events: '#f59e0b',
    Hospitality: '#8b5cf6',
    Government: '#64748b',
    Marketplace: '#06b6d4',
    DevTools: '#22c55e',
    Healthcare: '#ef4444',
    AI: '#a855f7',
    Infrastructure: '#3b82f6',
    Web3: '#f97316',
  };

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          key={`projects-header-${currentPersona}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            {content.projectsSectionTitle}
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {content.projectsSectionSubtitle}
          </p>
        </motion.div>

        {/* Featured Projects — Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {featured.map((project, index) => {
            const catColor = categoryColors[project.category] || 'var(--forest)';
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-clean overflow-hidden group relative"
              >
                {/* Accent bar */}
                <div className="h-1 w-full" style={{ background: catColor }} />

                <div className="p-6 sm:p-7">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{
                          background: `${catColor}12`,
                          color: catColor,
                          border: `1px solid ${catColor}25`,
                        }}
                      >
                        {project.category}
                      </span>
                      {project.metrics && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(212, 168, 67, 0.1)',
                            color: 'var(--gold)',
                          }}
                        >
                          {project.metrics[currentPersona]}
                        </span>
                      )}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-60 group-hover:opacity-100"
                        style={{
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-sans font-bold text-xl sm:text-2xl mb-3 transition-colors duration-300 group-hover:text-forest"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>

                  {/* Description — persona-specific */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {project.descriptions[currentPersona]}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{
                          background: 'var(--surface-secondary)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Regular Projects — Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayRegular.map((project, index) => {
            const catColor = categoryColors[project.category] || 'var(--forest)';
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="card-clean overflow-hidden group"
              >
                <div className="h-0.5 w-full" style={{ background: catColor }} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${catColor}12`,
                        color: catColor,
                        border: `1px solid ${catColor}25`,
                      }}
                    >
                      {project.category}
                    </span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-50 group-hover:opacity-100"
                        style={{
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <h3
                    className="font-sans font-bold text-base mb-2 transition-colors duration-300 group-hover:text-forest"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                    {project.descriptions[currentPersona]}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          background: 'var(--surface-secondary)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5" style={{ color: 'var(--text-muted)' }}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show All Button */}
        {regular.length > 3 && !showAll && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAll(true)}
              className="btn-outline inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
