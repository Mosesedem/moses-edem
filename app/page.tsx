"use client";

import { Github, Linkedin, Mail, Phone, Download, MapPin, ArrowRight, Heart } from "lucide-react";
import Terminal from "@/components/terminal";
import VentureStatsCard from "@/components/VentureStatsCard";
import VibeCard from "@/components/VibeCard";
import QuickBioCard from "@/components/QuickBioCard";
import DynamicExpertise from "@/components/DynamicExpertise";
import ProjectShowcase from "@/components/ProjectShowcase";
import VenturesSection from "@/components/VenturesSection";
import AIPlayground from "@/components/ai-playground";
import { downloadProfessionalCV } from "@/components/cv-generator";
import PersonaSelector from "@/components/PersonaSelector";
import IntentDialog from "@/components/IntentDialog";
import { usePersona } from "@/hooks/usePersona";
import { personaContent } from "@/lib/personaContent";
import { motion, AnimatePresence } from "framer-motion";

// WhatsApp SVG icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Portfolio() {
  const { currentPersona, hasSelectedInitialPersona } = usePersona();
  const content = personaContent[currentPersona];

  // Render the correct hero widget based on persona
  const renderHeroWidget = () => {
    switch (content.heroWidget) {
      case 'venture-stats':
        return <VentureStatsCard />;
      case 'vibe-card':
        return <VibeCard />;
      case 'quick-bio':
        return <QuickBioCard />;
      case 'terminal':
      default:
        return <Terminal />;
    }
  };

  // Render persona-specific CTA buttons
  const renderHeroCTAs = () => {
    return content.heroCTAs.map((cta) => {
      const isDownloadCV = cta.icon === 'download';
      const Component = isDownloadCV ? 'button' : 'a';
      const props = isDownloadCV
        ? { onClick: downloadProfessionalCV }
        : { href: cta.href };

      const iconMap: Record<string, React.ReactNode> = {
        'arrow-right': <ArrowRight className="w-4 h-4" />,
        'download': <Download className="w-4 h-4" />,
        'mail': <Mail className="w-4 h-4" />,
        'heart': <Heart className="w-4 h-4" />,
        'hand': <span className="text-sm">👋</span>,
      };

      return (
        <Component
          key={cta.label}
          {...props}
          className={`${cta.variant === 'primary' ? 'btn-primary' : 'btn-outline'} inline-flex items-center gap-2`}
        >
          {cta.label}
          {iconMap[cta.icon]}
        </Component>
      );
    });
  };

  return (
    <>
      {/* Intent Dialog (blocks content for first-time visitors) */}
      <IntentDialog />

      {/* Main Content — only visible after persona selection */}
      <AnimatePresence>
        {hasSelectedInitialPersona && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-h-screen"
            style={{ background: 'var(--cream)' }}
          >
            {/* ─── Header ─── */}
            <header
              className="fixed top-0 w-full z-50 backdrop-blur-xl"
              style={{
                background: 'rgba(250, 248, 245, 0.85)',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex justify-between items-center">
                  <a href="#" className="text-xl font-serif" style={{ color: 'var(--forest)' }}>
                    Moses <span style={{ color: 'var(--gold)' }}>Edem</span>
                  </a>
                  <ul className="hidden md:flex gap-10 items-center">
                    {content.navItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-sm font-medium transition-colors duration-300 hover:opacity-100"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--forest)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <PersonaSelector />
                </nav>
              </div>
            </header>

            {/* ─── Hero Section ─── */}
            <section id="about" className="relative min-h-screen flex items-center px-6 pt-24" style={{ background: 'var(--cream)' }}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <div className="space-y-5">
                      <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={`role-${currentPersona}`}
                        className="text-sm uppercase tracking-[0.15em] font-semibold"
                        style={{ color: 'var(--gold)' }}
                      >
                        {content.role}
                      </motion.p>

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        key={`headline-${currentPersona}`}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {content.headline.split(' ').slice(0, -2).join(' ')}{" "}
                        <span className="block" style={{ color: 'var(--forest)' }}>
                          {content.headline.split(' ').slice(-2).join(' ')}
                        </span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        key={`desc-${currentPersona}`}
                        className="text-lg leading-relaxed max-w-xl"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {content.tagline}
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="flex flex-wrap items-center gap-5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" style={{ color: 'var(--forest-light)' }} />
                        <span>Uyo, Akwa Ibom, Nigeria</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--forest-light)' }} />
                        <span>Available for projects</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      key={`ctas-${currentPersona}`}
                      className="flex flex-wrap gap-3"
                    >
                      {renderHeroCTAs()}
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex gap-3 pt-2"
                    >
                      {[
                        { icon: Github, href: "https://github.com/mosesedem", label: "GitHub" },
                        { icon: Linkedin, href: "https://linkedin.com/in/mosesedem", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:mosesedem81@gmail.com", label: "Email" },
                        { icon: Phone, href: "tel:+2349030465501", label: "Phone" },
                      ].map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                    </motion.div>
                  </div>

                  {/* Dynamic Hero Widget */}
                  <div className="lg:pl-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`hero-widget-${currentPersona}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        {renderHeroWidget()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Dynamic Expertise Section ─── */}
            <DynamicExpertise />

            {/* ─── Ventures Section (Investor only) ─── */}
            {currentPersona === 'investor' && <VenturesSection />}

            {/* ─── Projects Section ─── */}
            <ProjectShowcase />

            {/* ─── AI Playground Section ─── */}
            <section id="ai-chat" className="section-padding" style={{ background: 'var(--forest)' }}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                  <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-on-dark)' }}>
                    Chat with AI Moses
                  </h2>
                  <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-on-dark-muted)' }}>
                    Experience an interactive AI-powered conversation with me. Ask
                    about my projects, technical expertise, or anything else.
                  </p>
                </div>
                <AIPlayground />
              </div>
            </section>

            {/* ─── Contact Section ─── */}
            <section id="contact" className="section-padding" style={{ background: 'var(--cream)' }}>
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  key={`contact-title-${currentPersona}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-serif text-3xl md:text-5xl mb-5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {content.contactTitle}
                </motion.h2>
                <motion.p
                  key={`contact-sub-${currentPersona}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="text-base mb-10 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {content.contactSubtitle}
                </motion.p>
                <div className="flex flex-wrap gap-4 justify-center mb-10">
                  <a href="mailto:mosesedem81@gmail.com" className="btn-primary inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Me
                  </a>
                  <a href="tel:+2349030465501" className="btn-outline inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Me
                  </a>
                  <a
                    href="https://wa.me/2349030465501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1da851';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#25D366';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://linkedin.com/in/mosesedem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-300"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--forest)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/mosesedem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-300"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--forest)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </section>

            {/* ─── Footer ─── */}
            <footer style={{ background: 'var(--forest-deep)', borderTop: '1px solid var(--border-on-dark)' }}>
              <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm" style={{ color: 'var(--text-on-dark-muted)' }}>
                  &copy; {new Date().getFullYear()} Moses Jacob Edem. Building the
                  future, one API at a time.
                </p>
                <div className="flex gap-5">
                  {[
                    { icon: Github, href: "https://github.com/mosesedem" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mosesedem" },
                    { icon: Mail, href: "mailto:mosesedem81@gmail.com" },
                  ].map(({ icon: Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="transition-opacity duration-300 hover:opacity-100"
                      style={{ color: 'var(--text-on-dark-muted)', opacity: 0.6 }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
