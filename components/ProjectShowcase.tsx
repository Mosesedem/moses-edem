"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { usePersona } from "@/hooks/usePersona";
import { personaContent, projectsData } from "@/lib/personaContent";
import {
  Zap,
  Shield,
  Code,
  Terminal,
  Database,
  Lock,
  Globe,
  Bell,
  Key,
} from "lucide-react";

type ProjectIcon = ComponentType<{ className?: string }>;

const categoryIcons: Record<string, ProjectIcon> = {
  "Virtual Numbers": Key,
  "Fintech / Payments": Database,
  Investment: Shield,
  Events: Bell,
  Hospitality: Globe,
  Government: Shield,
  Marketplace: Code,
  DevTools: Terminal,
  Healthcare: Lock,
  AI: Zap,
  Infrastructure: Database,
  Web3: Globe,
};

const fallbackProjectIcons: ProjectIcon[] = [
  Key,
  Database,
  Globe,
  Bell,
  Zap,
  Shield,
  Lock,
  Code,
  Terminal,
];

export default function ProjectShowcase() {
  const { currentPersona } = usePersona();
  const content = personaContent[currentPersona];
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const regularProjects = projectsData.filter((p) => !p.featured);
  const visibleRegularProjects = showAll
    ? regularProjects
    : regularProjects.slice(0, 4);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    Authentication: "#6366f1",
    "E-commerce": "#ec4899",
    Fintech: "#14b8a6",
    Events: "#f59e0b",
    Hospitality: "#8b5cf6",
    Government: "#64748b",
    Marketplace: "#06b6d4",
    DevTools: "#22c55e",
    Healthcare: "#ef4444",
    AI: "#a855f7",
    Infrastructure: "#3b82f6",
    Web3: "#f97316",
  };

  const getProjectIcon = (category: string, index: number) => {
    const Icon =
      categoryIcons[category] ||
      fallbackProjectIcons[index % fallbackProjectIcons.length];
    return <Icon className="h-5 w-5" />;
  };

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          key={`projects-header-${currentPersona}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="font-serif text-3xl md:text-5xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {content.projectsSectionTitle}
          </h2>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {content.projectsSectionSubtitle}
          </p>
        </motion.div>

        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.24em] mb-2"
                  style={{ color: "var(--gold)" }}
                >
                  Featured Projects
                </p>
                <h3
                  className="text-xl md:text-2xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  The pieces worth calling out first
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featuredProjects.map((project, index) => {
                const catColor =
                  categoryColors[project.category] || "var(--forest)";
                const techPreview = project.tech.slice(0, 4);
                const hiddenTechCount = Math.max(
                  project.tech.length - techPreview.length,
                  0,
                );

                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="card-clean p-8 sm:p-10 group relative"
                    style={{
                      background: "var(--surface-primary)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div
                      className="w-10 h-10 border flex items-center justify-center mb-6 rounded-md transition-all duration-300 group-hover:scale-[1.03]"
                      style={{
                        borderColor: `${catColor}25`,
                        background: `${catColor}08`,
                        color: catColor,
                      }}
                    >
                      {getProjectIcon(project.category, index)}
                    </div>

                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                          style={{
                            background: `${catColor}10`,
                            color: catColor,
                            border: `1px solid ${catColor}20`,
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(212, 168, 67, 0.08)",
                            color: "var(--gold)",
                            border: "1px solid rgba(212, 168, 67, 0.16)",
                          }}
                        >
                          Featured
                        </span>
                        {project.metrics && (
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                            style={{
                              background: "var(--surface-secondary)",
                              color: "var(--forest)",
                              border: "1px solid var(--border-light)",
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
                            border: "1px solid var(--border-light)",
                            color: "var(--text-muted)",
                            background: "var(--surface-secondary)",
                          }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <h3
                      className="text-[17px] sm:text-[18px] font-semibold mb-3 tracking-normal leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-[14px] leading-[1.65] font-light mb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.descriptions[currentPersona]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 items-center">
                      {techPreview.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md"
                          style={{
                            background: "var(--surface-secondary)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border-light)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {hiddenTechCount > 0 && (
                        <span
                          className="text-[10px] font-semibold px-2 py-1 rounded-md"
                          style={{ color: "var(--text-muted)" }}
                        >
                          +{hiddenTechCount}
                        </span>
                      )}
                    </div>

                    <div
                      className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${catColor}, transparent)`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-xl overflow-hidden"
          style={{
            background: "var(--border-light)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {visibleRegularProjects.map((project, index) => {
            const catColor =
              categoryColors[project.category] || "var(--forest)";
            const techPreview = project.tech.slice(0, 4);
            const hiddenTechCount = Math.max(
              project.tech.length - techPreview.length,
              0,
            );

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="card-clean p-8 sm:p-10 hover:-translate-y-0.5 group relative"
                style={{
                  background: "var(--surface-primary)",
                  borderRadius: "0",
                  boxShadow: "none",
                }}
              >
                <div
                  className="w-10 h-10 border flex items-center justify-center mb-6 rounded-md transition-all duration-300 group-hover:scale-[1.03]"
                  style={{
                    borderColor: `${catColor}25`,
                    background: `${catColor}08`,
                    color: catColor,
                  }}
                >
                  {getProjectIcon(project.category, index)}
                </div>

                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                      style={{
                        background: `${catColor}10`,
                        color: catColor,
                        border: `1px solid ${catColor}20`,
                      }}
                    >
                      {project.category}
                    </span>
                    {project.metrics && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                        style={{
                          background: "var(--surface-secondary)",
                          color: "var(--forest)",
                          border: "1px solid var(--border-light)",
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
                        border: "1px solid var(--border-light)",
                        color: "var(--text-muted)",
                        background: "var(--surface-secondary)",
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h3
                  className="text-[17px] sm:text-[18px] font-semibold mb-3 tracking-normal leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-[14px] leading-[1.65] font-light mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.descriptions[currentPersona]}
                </p>

                <div className="flex flex-wrap gap-1.5 items-center">
                  {techPreview.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md"
                      style={{
                        background: "var(--surface-secondary)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {hiddenTechCount > 0 && (
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded-md"
                      style={{ color: "var(--text-muted)" }}
                    >
                      +{hiddenTechCount}
                    </span>
                  )}
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${catColor}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {regularProjects.length > visibleRegularProjects.length && !showAll && (
          <div className="flex justify-center mt-12">
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
