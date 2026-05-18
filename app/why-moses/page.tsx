"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Shield,
  Zap,
  Activity,
  Globe,
  Cpu,
  Database,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle2,
  ExternalLink,
  Code2,
  Download,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";
import { downloadProfessionalCV } from "@/components/cv-generator";
import { Button } from "@/components/ui/button";

// --- Components ---

const SectionHeader = ({
  label,
  title,
  light = false,
}: {
  label: string;
  title: string;
  light?: boolean;
}) => (
  <div className="mb-12">
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-xs uppercase tracking-[0.2em] font-bold mb-3 block"
      style={{ color: light ? "var(--gold)" : "var(--gold)" }}
    >
      {label}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-serif leading-tight"
      style={{ color: light ? "white" : "var(--forest)" }}
    >
      {title}
    </motion.h2>
  </div>
);

// --- Data ---

const stats = [
  {
    value: "7+",
    label: "Years in Backend",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    value: "20+",
    label: "Production Apps",
    icon: <Globe className="w-5 h-5" />,
  },
  { value: "99.9%", label: "Uptime SLA", icon: <Shield className="w-5 h-5" /> },
  { value: "60%", label: "Latency Cut", icon: <Zap className="w-5 h-5" /> },
];

const reasons = [
  {
    title: "Architected for Scale",
    desc: "I don't just build features; I build systems. From microservices handling 10k+ daily users to optimizing PostgreSQL queries that reduce costs by 40%.",
    icon: <Cpu />,
  },
  {
    title: "Product-First Engineering",
    desc: "Having founded my own ventures (Proton, Renboot), I understand ROI. I write code that serves the business goals, not just the linter.",
    icon: <Activity />,
  },
  {
    title: "DevOps Excellence",
    desc: "Zero-downtime deployments, Dockerized environments, and automated CI/CD pipelines. I ensure the path from 'Local' to 'Production' is seamless.",
    icon: <Database />,
  },
];

const projects = [
  {
    name: "Proton Medicare",
    tag: "HealthTech",
    impact:
      "Built end-to-end health insurance onboarding serving thousands of users in Nigeria.",
    stack: ["Node.js", "Next.js", "PostgreSQL", "Docker"],
    link: "https://protonmedicare.com",
  },
  {
    name: "Instant OTP (Child Panel)",
    tag: "Infra",
    impact:
      "Multi-tenant white-label SMS verification panel with real-time DNS management.",
    stack: ["Node.js", "Next.js", "PostgreSQL", "Docker"],
    link: "https://childpanel.instantotp.com",
  },
  {
    name: "Renboot",
    tag: "Infra",
    impact:
      "Cloud service provider coupled with a desktop Application that allows users to rent their hardware in realtime and users can also host cloud applications. ",
    stack: ["Node.js", "Next.js", "PostgreSQL", "Docker"],
    link: "https://renboot.com",
  },
  {
    name: "PaperDB",
    tag: "BaaS",
    impact:
      "Type-safe backend actions directly from frontend. Designed for high-performance ingestion.",
    stack: ["TypeScript", "Golang", "Next.js", "Express.js", "PostgreSQL"],
    link: "https://database.renboot.com",
  },
];

const experience = [
  {
    period: "2022 – Present",
    role: "Founder & Lead Architect",
    company: "Startup Ventures",
    points: [
      "Architected log-aggregation SaaS using Go for 1M+ event ingestion.",
      "Built decentralized hardware compute marketplace (Renboot).",
      "Scaling healthtech access for 500+ businesses via Proton Medicare.",
      "Managed Linux server clusters with 99.9% uptime track record.",
    ],
  },
  {
    period: "2020 – 2024",
    role: "Full-Stack Developer & DevOps",
    company: "Freelance & Consulting",
    points: [
      "Reduced API latency by 60% across 5+ client projects.",
      "Deployed secure payment gateways for fintech platforms.",
      // "Managed Linux server clusters with 99.9% uptime track record.",
    ],
  },
];

// --- Main Page ---

export default function WhyMosesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4A843]/30">
      <style jsx global>{`
        :root {
          --forest: #1a4d3e;
          --gold: #d4a843;
          --cream: #faf8f5;
        }
        .font-serif {
          font-family: var(--font-serif), serif;
        }
        .font-sans {
          font-family: var(--font-sans), sans-serif;
        }
        .bg-forest {
          background-color: var(--forest);
        }
        .text-forest {
          color: var(--forest);
        }
        .text-gold {
          color: var(--gold);
        }
        .border-forest/10 {
          border-color: rgba(26, 77, 62, 0.1);
        }
      `}</style>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-forest/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeftIcon />
            <span>Go Back</span>
          </Button>

          {/* <Link href="/" className="text-xl font-serif text-forest group">
            Moses <span className="text-gold group-hover:opacity-80 transition-opacity">Edem</span>
          </Link> */}
          <div className="flex gap-6 items-center">
            {/* <Link href="/why-moses" className="text-sm font-medium text-gray-500 hover:text-forest transition-colors">Professional</Link> */}
            {/* <a 
              href="mailto:mosesedem81@gmail.com" 
              className="bg-forest text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-forest/90 transition-all shadow-lg shadow-forest/10"
            >
              Hire Moses
            </a> */}
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative z-10 flex flex-col items-center">
            {/* <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-forest text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              Available for Strategic Roles
            </motion.div> */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-forest leading-[1.1] mb-8"
            >
              High-Impact Engineering.
              <br />
              <span className="text-gold">Zero Technical Debt.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl mb-10"
            >
              I build backend systems that don&apos;t just work—they scale. With
              7+ years of founder-led experience, I bridge the gap between
              complex architecture and business ROI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/#contact"
                className="bg-forest text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:gap-5 transition-all shadow-xl shadow-forest/20"
              >
                Discuss a Project <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={downloadProfessionalCV}
                className="bg-white border border-forest/10 text-forest px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                Download CV <Download className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Stats Bar --- */}
      <section className="bg-forest py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-gold mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-serif text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- The Value Proposition --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Why Moses?" title="Beyond the Lines of Code" />

          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl bg-white border border-forest/5 hover:border-gold/30 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center text-forest mb-8 group-hover:bg-forest group-hover:text-white transition-all">
                  {React.cloneElement(reason.icon as React.ReactElement<any>, {
                    className: "w-7 h-7",
                  })}
                </div>
                <h3 className="text-xl font-bold text-forest mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Projects Showreel --- */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <SectionHeader label="Portfolio" title="Validated Solutions" />
            <div className="flex gap-2 p-1 bg-gray-50 rounded-full border border-gray-100 mb-12">
              {["All", "HealthTech", "Infra", "BaaS"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeFilter === filter ? "bg-forest text-white shadow-lg" : "text-gray-400 hover:text-forest"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => activeFilter === "All" || p.tag === activeFilter)
              .map((project) => (
                <motion.div
                  layout
                  key={project.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative bg-[#FAF8F5] rounded-3xl p-8 border border-forest/5 overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-black text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {project.tag}
                    </span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        className="text-gray-300 hover:text-forest transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif text-forest mb-4">
                    {project.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {project.impact}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold text-forest/60 border border-forest/10 px-2 py-1 rounded-md bg-white"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* --- Experience Timeline --- */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            label="Professional Path"
            title="The Journey of Impact"
          />

          <div className="space-y-16">
            {experience.map((item) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12 border-l-2 border-forest/10"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold border-4 border-[#FAF8F5]" />
                <span className="text-sm font-bold text-gold mb-2 block">
                  {item.period}
                </span>
                <h3 className="text-2xl font-serif text-forest mb-1">
                  {item.role}
                </h3>
                <p className="text-lg font-medium text-gray-400 mb-6">
                  {item.company}
                </p>
                <ul className="space-y-4">
                  {item.points.map((point, pi) => (
                    <li
                      key={pi}
                      className="flex gap-4 text-gray-500 leading-relaxed italic"
                    >
                      <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-32 px-6 bg-forest text-white overflow-hidden relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8">
              Ready to scale your next big idea?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
              Whether you need a full-stack lead, a backend specialist, or a
              strategic technical consultant, I&apos;m ready to ship.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link
                href="/#contact"
                className="bg-gold text-forest px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-gold/20"
              >
                Email Me Directly
              </Link>
              <div className="flex gap-6">
                <a
                  href="tel:+2349030465501"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2 font-bold"
                >
                  <Phone className="w-5 h-5" /> +234 903 046 5501
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-forest/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-gray-400 italic">
            © {new Date().getFullYear()} Moses Jacob Edem. Engineered for
            excellence.
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/mosesedem"
              target="_blank"
              className="text-forest hover:text-gold transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mosesedem"
              target="_blank"
              className="text-forest hover:text-gold transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:mosesedem81@gmail.com"
              className="text-forest hover:text-gold transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
