"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "lucide-react";
import CodeRainBackground from "@/components/code-rain-background";
import Terminal from "@/components/terminal";
import FloatingElements from "@/components/floating-elements";
import { downloadProfessionalCV } from "@/components/cv-generator";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    {
      name: "Node.js/Express",
      icon: Server,
      description: "Server-side JavaScript runtime",
    },
    {
      name: "Python/Django",
      icon: Code,
      description: "High-level programming language",
    },
    {
      name: "PHP/Laravel",
      icon: Code,
      description: "Web development framework",
    },
    {
      name: "Database Design",
      icon: Database,
      description: "Relational & NoSQL databases",
    },
    {
      name: "API Development",
      icon: Globe,
      description: "RESTful & GraphQL APIs",
    },
    {
      name: "Microservices",
      icon: Server,
      description: "Distributed system architecture",
    },
  ];
  const projects = [
    {
      title: "InstantOTP",
      description:
        "High-performance OTP service handling thousands of SMS/email verifications daily. Built with Node.js microservices architecture, Redis caching, and PostgreSQL for scalability.",
      tech: ["Node.js", "Express.js", "Redis", "PostgreSQL", "SMS APIs"],
      link: "https://www.instantotp.com/",
      category: "Authentication Service",
      image:
        "https://api.microlink.io/?url=https://www.instantotp.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "Etegram Platform",
      description:
        "E-commerce platform backend supporting 10,000+ daily users. Implemented secure payment processing, inventory management, and real-time order tracking with microservices architecture.",
      tech: ["NestJS", "PostgreSQL", "Payment APIs", "JWT Auth", "Docker"],
      link: "https://www.etegram.com/",
      category: "E-commerce",
      image:
        "https://api.microlink.io/?url=https://www.etegram.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "MonieCheap",
      description:
        "Financial technology platform backend with secure transaction processing, real-time notifications, and comprehensive fraud detection systems built with Python Django.",
      tech: ["Python", "Django", "Celery", "PostgreSQL", "Security"],
      link: "https://moniecheap.com/",
      category: "Fintech",
      image:
        "https://api.microlink.io/?url=https://moniecheap.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "BrixVPN",
      description:
        "VPN service backend with server management, user authentication, bandwidth monitoring, and secure connection protocols. Handles global server infrastructure and user sessions.",
      tech: [
        "Node.js",
        "Network Security",
        "MongoDB",
        "Server Management",
        "Encryption",
      ],
      link: "https://www.brixvpn.com/",
      category: "Network Security",
      image:
        "https://api.microlink.io/?url=https://www.brixvpn.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "TunnelDeck",
      description:
        "Advanced tunneling service backend with custom protocol implementation, traffic routing, and performance optimization. Built for high-throughput network applications.",
      tech: [
        "Python",
        "Flask",
        "Network Protocols",
        "Performance Tuning",
        "Load Balancing",
      ],
      link: "https://tunneldeck.com/",
      category: "Network Infrastructure",
      image:
        "https://api.microlink.io/?url=https://tunneldeck.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
    {
      title: "ProtonMedicare",
      description:
        "Healthcare management system backend with HIPAA-compliant data handling, appointment scheduling, patient records management, and secure communication channels.",
      tech: ["PHP", "Laravel", "MySQL", "HIPAA Compliance", "Security"],
      link: "https://protonmedicare.com/",
      category: "Healthcare",
      image:
        "https://api.microlink.io/?url=https://protonmedicare.com/&screenshot=true&meta=false&embed=screenshot.url",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Code Rain Background */}
      <CodeRainBackground />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-teal-600/5" />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Modern Header */}
      <header className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-lg z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              moses.dev
            </div>
            <ul className="hidden md:flex gap-8">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-300 hover:text-blue-400 transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`${
                isVisible ? "animate-fade-in" : "opacity-0"
              } space-y-8`}
            >
              <div className="space-y-4">
                <div className="text-blue-400 font-semibold tracking-wide uppercase text-sm">
                  Backend Developer & System Architect
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  Moses
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                    Edem
                  </span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                  Crafting robust, scalable backend systems and APIs that power
                  modern applications. Expert in Node.js, Python, PHP, and
                  microservices architecture with 2+ years of professional
                  experience delivering high-performance solutions.
                </p>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Port Harcourt, Nigeria</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Available for projects</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="#projects">
                    View My Work
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={downloadProfessionalCV}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                >
                  Download CV
                  <Download className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                  asChild
                >
                  <a href="#contact">
                    Get In Touch
                    <Mail className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 pt-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/mosesedem",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/mosesedem",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:mosesedem81@gmail.com",
                    label: "Email",
                  },
                  { icon: Phone, href: "tel:+2349030465501", label: "Phone" },
                ].map(({ icon: Icon, href, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-full transition-all duration-300 hover:scale-110"
                    asChild
                  >
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:pl-8">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Backend Expertise
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Specialized in building robust, scalable backend systems using
              modern technologies and best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card
                  key={skill.name}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                      <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                      {skill.name}
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-sm">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A showcase of recent backend systems and APIs I've built, serving
              thousands of users daily.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="group bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden hover:transform hover:scale-[1.02]"
              >
                <div
                  className="relative h-48 overflow-hidden rounded-t-lg"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                  <Badge className="absolute top-4 left-4 bg-slate-900/90 text-blue-400 border-blue-500/50 backdrop-blur-sm">
                    {project.category}
                  </Badge>

                  <Button
                    size="sm"
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-600/90 hover:bg-blue-700 backdrop-blur-sm"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>

                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-white font-semibold text-sm backdrop-blur-sm bg-slate-900/70 px-2 py-1 rounded">
                      Live Project
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 leading-relaxed text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/50 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Looking for a backend developer who can architect scalable solutions
            and deliver robust APIs? I'm always excited to work on challenging
            projects that push the boundaries of what's possible.
          </p>

          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="mailto:mosesedem81@gmail.com">
                <Mail className="mr-2 w-5 h-5" />
                Email Me
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
              asChild
            >
              <a href="tel:+2349030465501">
                <Phone className="mr-2 w-5 h-5" />
                Call Me
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="https://linkedin.com/in/mosesedem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/mosesedem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            &copy; 2024 Moses Edem. Building the future, one API at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
