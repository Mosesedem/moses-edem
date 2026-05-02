"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Server,
  Database,
  Globe,
  Phone,
  Download,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Terminal from "@/components/terminal";
import AIPlayground from "@/components/ai-playground";
import { downloadProfessionalCV } from "@/components/cv-generator";
import PersonaSelector from "@/components/PersonaSelector";
import IntentDialog from "@/components/IntentDialog";
import { usePersona } from "@/hooks/usePersona";
import { personaContent } from "@/lib/personaContent";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { currentPersona, hasSelectedInitialPersona } = usePersona();

  const skills = [
    { name: "Node.js / Express / Fastify", icon: Server, description: "Backend APIs & Microservices" },
    { name: "Prisma ORM", icon: Database, description: "Type-safe database access" },
    { name: "Next.js", icon: Code, description: "Fullstack React framework" },
    { name: "PostgreSQL / MongoDB", icon: Database, description: "SQL & NoSQL databases" },
    { name: "DevOps / CI-CD", icon: Server, description: "Docker, Vercel, GitHub Actions" },
    { name: "PHP / Laravel", icon: Code, description: "Web applications" },
    { name: "Go Lang", icon: Server, description: "High-performance services" },
    { name: "API Development", icon: Globe, description: "REST, GraphQL, WebSockets" },
  ];

  const projects = [
    {
      title: "InstantOTP",
      description: "High-performance OTP service handling thousands of SMS/email verifications daily. Built with Node.js microservices, Redis caching, and PostgreSQL.",
      tech: ["Node.js", "Express.js", "Redis", "PostgreSQL", "SMS APIs"],
      link: "https://www.instantotp.com/",
      category: "Authentication",
      image: "https://api.microlink.io/?url=https://www.instantotp.com/&screenshot=true&meta=false&embed=screenshot.url",
    },

    {
      title: "Etegram Platform",
      description: "E-commerce platform backend supporting 10,000+ daily users with secure payment processing, inventory management, and real-time order tracking.",
      tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://www.etegram.com/",
      category: "E-commerce",
      image: "https://api.microlink.io/?url=https://www.etegram.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "MonieCheap",
      description: "Fintech platform with secure transaction processing, real-time notifications, and comprehensive fraud detection systems.",
      tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://moniecheap.com/",
      category: "Fintech",
      image: "https://api.microlink.io/?url=https://moniecheap.com/&screenshot=true&meta=false&embed=screenshot.url",
    },

        {
      title: "Akwa Ibom Teck Week",
      description: "Event platform for Akwa Ibom Tech Week with booking systems, payment processing, and guest management infrastructure.",
      tech: ["Express.js", "Next.js", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://akwaibomtechweek.moniecheap.com/",
      category: "Events",
      image: "https://api.microlink.io/?url=https://akwaibomtechweek.moniecheap.com/&screenshot=true&meta=false&embed=screenshot.url",
    },


    {
      title: "Hotel Secured",
      description: "Hospitality management platform with booking systems, payment processing, and guest management infrastructure.",
      tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://hotels.etegramgroup.com/",
      category: "Hospitality",
      image: "https://api.microlink.io/?url=https://hotels.etegramgroup.com/&screenshot=true&meta=false&embed=screenshot.url",
    },

    {
      title: "Union Of Tippers",
      description: "Government-sector platform backend with user management, reporting infrastructure, and secure data handling.",
      tech: ["Hono", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://utqenaks.ng/",
      category: "Government",
      image: "https://api.microlink.io/?url=https://utqenaks.ng/&screenshot=true&meta=false&embed=screenshot.url",
    },

        {
      title: "Servixing",
      description: "Repairs and services platform with booking systems, payment processing, and user management infrastructure.",
      tech: ["Node.js", "Next.js", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://www.servixing.com/",
      category: "Infrastructure",
      image: "https://api.microlink.io/?url=https://www.servixing.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "TunnelDeck",
      description: "Advanced tunneling service with custom protocol implementation, traffic routing, and performance optimization.",
      tech: ["Express.js", "PostgreSQL", "JWT Auth", "Docker", "Redis"],
      link: "https://tunneldeck.com/",
      category: "Infrastructure",
      image: "https://api.microlink.io/?url=https://tunneldeck.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "Proton Medicare",
      description: "Healthcare management system with HIPAA-compliant data handling, appointment scheduling, and patient records management.",
      tech: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "Express.js"],
      link: "https://protonmedicare.com/",
      category: "Healthcare",
      image: "https://api.microlink.io/?url=https://protonmedicare.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    
        {
      title: "AI SEO ",
      description: "AI SEO ",
      tech: ["Next.js", "React"],
      link: "https://ai-seo-seven.vercel.app/",
      category: "AI",
      image: "https://api.microlink.io/?url=https://ai-seo-seven.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "Menu Rave",
      description: "Digital menu and ordering platform backend with real-time updates and restaurant management capabilities.",
      tech: ["Express.js", "PostgreSQL", "JWT Auth", "Docker", "WebSockets"],
      link: "https://menurave.com/",
      category: "Hospitality",
      image: "https://api.microlink.io/?url=https://menurave.com/&screenshot=true&meta=false&embed=screenshot.url",
    },

    {
      title: "Dakuri",
      description: "Concept crypto trading application built to explore AI prompting and vibe coding techniques.",
      tech: ["Flutter", "Express.js", "Next.js", "Firebase"],
      category: "Web3",
      image: "https://api.microlink.io/?url=https://dakuri.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "Hospitalcard",
      description: "Healthcare management system with appointment scheduling, patient records, and secure communication channels.",
     tech: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "Express.js"],
      link: "https://hospitalcard-seven.vercel.app/",
      category: "Healthcare",
      image: "https://api.microlink.io/?url=https://hospitalcard-seven.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    },
        {
      title: "LogShip",
      description: "Javascript based tracking SDK and API for log tracking and analytics.",
      tech: ["GOlang", "TypeScript", "Express.js", "Firebase", "Redis", "PostgreSQL", ],
      category: "Infrastructure",
      image: "https://api.microlink.io/?url=https://dakuri.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    },
  ];

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
                    {["About", "Skills", "Projects", "AI Chat", "Contact"].map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(" ", "-")}`}
                          className="text-sm font-medium transition-colors duration-300 hover:opacity-100"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--forest)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                          {item}
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
                        {personaContent[currentPersona].role}
                      </motion.p>

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        key={`headline-${currentPersona}`}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {personaContent[currentPersona].headline.split(' ').slice(0, -2).join(' ')}{" "}
                        <span className="block" style={{ color: 'var(--forest)' }}>
                          {personaContent[currentPersona].headline.split(' ').slice(-2).join(' ')}
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
                        {personaContent[currentPersona].tagline}
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
                        <span>Port Harcourt, Nigeria</span>
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
                      className="flex flex-wrap gap-3"
                    >
                      <a href="#projects" className="btn-primary inline-flex items-center gap-2">
                        Explore Work
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button onClick={downloadProfessionalCV} className="btn-outline inline-flex items-center gap-2">
                        Download CV
                        <Download className="w-4 h-4" />
                      </button>
                      <a href="#contact" className="btn-outline inline-flex items-center gap-2">
                        Get In Touch
                        <Mail className="w-4 h-4" />
                      </a>
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

                  {/* Terminal */}
                  <div className="lg:pl-8">
                    <Terminal />
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Skills Section ─── */}
            <section id="skills" className="section-padding" style={{ background: 'var(--surface-secondary)' }}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                  <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
                    Technical Expertise
                  </h2>
                  <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Specialized in fullstack development with Node.js, Prisma ORM, and
                    DevOps practices. Building robust, scalable systems.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.06 }}
                        className="card-clean p-6 text-center"
                      >
                        <div
                          className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300"
                          style={{ background: 'rgba(26, 77, 62, 0.07)' }}
                        >
                          <Icon className="w-6 h-6" style={{ color: 'var(--forest)' }} />
                        </div>
                        <h3 className="font-sans font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                          {skill.name}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {skill.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ─── Projects Section ─── */}
            <section id="projects" className="section-padding" style={{ background: 'var(--cream)' }}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                  <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
                    Featured Projects
                  </h2>
                  <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    A showcase of backend systems and APIs I&apos;ve built, serving
                    thousands of users daily.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(showAllProjects ? projects : projects.slice(0, 6)).map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      className="card-clean overflow-hidden group"
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute inset-0" style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)'
                        }} />
                        <span
                          className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{
                            background: 'rgba(255,255,255,0.9)',
                            color: 'var(--forest)',
                          }}
                        >
                          {project.category}
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{
                              background: 'rgba(255,255,255,0.9)',
                              color: 'var(--forest)',
                            }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3
                          className="font-sans font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-forest"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {project.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed mb-4 line-clamp-2"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((tech) => (
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
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {projects.length > 6 && !showAllProjects && (
                  <div className="flex justify-center mt-14">
                    <button
                      onClick={() => setShowAllProjects(true)}
                      className="btn-outline inline-flex items-center gap-2"
                    >
                      View All Projects
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </section>

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
                <h2 className="font-serif text-3xl md:text-5xl mb-5" style={{ color: 'var(--text-primary)' }}>
                  Let&apos;s Build Something Amazing
                </h2>
                <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Looking for a backend developer who can architect scalable solutions
                  and deliver robust APIs? I&apos;m always excited to work on challenging
                  projects.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mb-10">
                  <a href="mailto:mosesedem81@gmail.com" className="btn-primary inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Me
                  </a>
                  <a href="tel:+2349030465501" className="btn-outline inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Me
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
