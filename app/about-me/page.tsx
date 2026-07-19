/* eslint-disable react-hooks/purity */
"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
// --- DATA ---
const facts = [
  { icon: "📍", key: "Based in", val: "Uyo, Nigeria" },
  { icon: "💻", key: "By day", val: "Software Developer & Founder" },
  { icon: "🥊", key: "Surprise skill", val: "Boxing. Yes, really." },
  {
    icon: "🎵",
    key: "Soundtrack",
    val: "Blues & Afrobeats — depends on the mood",
  },
  {
    icon: "📚",
    key: "Currently",
    val: "Moving into OS-level programming (wish me luck)",
  },
  {
    icon: "🙏",
    key: "Faith",
    val: "Very important — it's a foundation, not a footnote",
  },
];

const interests = [
  {
    icon: "🎵",
    title: "Music",
    desc: "Blues and Afrobeats are my reset buttons. Music is how I recharge, think, and feel. It's not a hobby — it's a lifestyle.",
  },
  {
    icon: "🍳",
    title: "Cooking",
    desc: "I genuinely love to cook. It's creative, grounding, and one of the best ways I know to show someone I care.",
  },
  {
    icon: "✈️",
    title: "Travel",
    desc: "My dream? Visit all the STAN countries — Kazakhstan, Uzbekistan, Kyrgyzstan... the kind of trip most people never take.",
  },
  {
    icon: "📖",
    title: "Reading",
    desc: "Self-improvement and business books. I invest in my mind like I invest in my projects — intentionally.",
  },
  {
    icon: "🌍",
    title: "Global Politics",
    desc: "International politics fascinates me. Geopolitics, diplomacy, the power of nations — I'm watching it all carefully.",
  },
  {
    icon: "🥊",
    title: "Boxing & Gym",
    desc: "The gym keeps me grounded. Boxing teaches discipline and confidence in a way nothing else does.",
  },
];

const relationshipCards = [
  {
    label: "Love language",
    content: (
      <>
        I'm all about{" "}
        <strong className="text-gold font-medium">physical touch</strong>.
        Presence over words. Being there, holding space, showing up. That's how
        I love and how I want to be loved.
      </>
    ),
    accent: false,
  },
  {
    label: "Communication style",
    content: (
      <>
        <strong className="text-gold font-medium">
          Very expressive and open.
        </strong>{" "}
        I say what I mean and mean what I say. No games, no subtext, just
        honest, and real conversation.
      </>
    ),
    accent: false,
  },
  {
    label: "Attachment style",
    content: (
      <>
        <strong className="text-gold font-medium">Secure.</strong> I don't need
        constant validation but I show up fully when I'm in. I'm a lover ✌️ and
        yes, I've been a leaver too. Growth is part of the story.
      </>
    ),
    accent: true,
  },
  {
    label: "The green flag you should know",
    content: (
      <>
        I will{" "}
        <strong className="text-gold font-medium">
          genuinely make you laugh.
        </strong>{" "}
        Not forced, not performed. Real, dark-humoured, sarcastic, belly-laugh
        funny. And I've got a big heart to back it up.
      </>
    ),
    accent: false,
  },
];

const greenFlags = [
  "Loyal, respectful, and committed — not in theory, in action",
  "Intellectually curious — someone I can have real conversations with",
  "Faith matters to you too — it grounds us both",
  "Family is everything to you, as it is to me",
  "You want children and a real future, not just the present",
  "You appreciate ambition and support the build, not just the results",
  "You can handle dark humour and dish it right back",
];

const dealbreakers = ["Cheating", "Disrespect", "Disloyalty", "Single moms"];

const visionSteps = [
  {
    date: "Origins",
    title: "Born in Akwa Ibom",
    desc: "The journey started in the heart of Uyo, Nigeria. A background that taught the value of community, resilience, and the drive to build something that lasts.",
  },
  {
    date: "2015",
    title: "Heritage Polytechnic, Eket",
    desc: "Moved to Eket to study.",
  },
  {
    date: "2018",
    title: "Back to Uyo",
    desc: "Tried starting a business, struggled at it, then settled for a job.",
  },
  {
    date: "2019",
    title: "University of Uyo",
    desc: "Studying Soil Science and Land Resource Management while simultaneously teaching myself the architecture of the digital world. The transition from physical soil to digital systems.",
  },
  {
    date: "2020",
    title: "Covid Happened",
    desc: "Broke into tech, starting by learning HTML, CSS ans Js.",
  },
  {
    date: "2021",
    title: "The Tech Journey begins",
    desc: "Started Rainbowtellers, Joined the Koboconnect team",
  },
  {
    date: "2022",
    title: "Proton Medicare",
    desc: "Launched Proton Medicare, built it from the ground up and got our first 200 customers.",
  },
  {
    date: "2024",
    title: "The Expansion",
    desc: "Scaling Proton Medicare and realized I had other passions.",
  },
  {
    date: "Now",
    title: "Renboot",
    desc: " Recently started building Renboot. A decentralised hardware infrastructure for the next generation of builders.",
  },
  {
    date: "5 Years",
    title: "A family man",
    desc: "I should have a thriving family.",
  },
  {
    date: "Long-term",
    title: "Legacy",
    desc: "Passing on wealth to the next generation — not just money, but values, opportunities, and a name that means something.",
  },
];

// --- COMPONENTS ---

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-gold rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `float ${15 + Math.random() * 10}s infinite linear`,
            animationDelay: `${Math.random() * 20}s`,
            opacity: Math.random(),
          }}
        />
      ))}
    </div>
  );
}

function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
        {children}
      </span>
      <div className="flex-1 h-[1px] bg-gold/20" />
    </div>
  );
}

function Hero() {
  const chips = ["Serious only", "Ambivert", "Dark humour", "Secure"];

  return (
    <header className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden bg-forest-deep">
      {/* Left */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-cream relative z-10 lg:clip-hero-diagonal">
        <FadeUp delay={100}>
          <div className="flex items-center gap-3 mb-8 text-[11px] font-medium tracking-[0.18em] uppercase text-forest">
            <span className="w-8 h-[1px] bg-forest" />
            Available · Uyo, Nigeria
          </div>

          <h1 className="font-serif text-6xl md:text-8xl font-black leading-[0.9] text-forest mb-4">
            Moses
            <br />
            <em className="text-gold italic">Edem</em>
          </h1>

          <p className="text-sm text-text-secondary tracking-widest uppercase mb-10">
            27 years old &nbsp;·&nbsp; Software Developer &nbsp;·&nbsp; 6'1"
          </p>

          <p className="font-serif text-xl italic text-forest leading-relaxed border-l-2 border-gold pl-6 mb-12 max-w-md">
            "A builder at heart — of software, of wealth, of something real with
            someone worth it."
          </p>

          <div className="flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <span
                key={chip}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 ${
                  i === 0
                    ? "bg-forest text-cream border-forest shadow-lg"
                    : "bg-transparent text-forest border-forest/30 hover:border-gold hover:text-gold"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Right */}
      <div className="hidden lg:flex items-center justify-center p-20 relative bg-forest-deep">
        <div className="relative group">
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-gold/20  group-hover:scale-105 transition-transform duration-700" />
          {/* rounded-[160px_160px_0_0] */}
          <div className="w-80 h-[450px]  bg-gradient-to-b from-[#2a3a30] via-[#1a2d25] to-[#0f1d18] border border-gold/30 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,168,67,0.1),transparent_70%)]" />
            <span className="font-serif text-[120px] font-black text-gold/30 tracking-tighter select-none">
              ME
            </span>

            {/* <Image 
height={100}
width={100}
alt='Moses Edem Best Photo'
src='/images/moses.jpg'
fill
// className="w-full h-full"
/> */}
          </div>

          {/* Floating Stats */}
          <div className="absolute -bottom-6 -right-12 space-y-4">
            {[
              { num: "2", label: "Ventures" },
              { num: "27", label: "Years" },
              { num: "∞", label: "Ambition" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="bg-cream/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gold/10 min-w-[100px] animate-slide-up"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="font-serif text-2xl font-bold text-forest leading-none">
                  {s.num}
                </div>
                <div className="text-[9px] text-text-secondary uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-8 md:left-16 flex items-center gap-4 text-text-muted text-[10px] tracking-[0.2em] uppercase">
        <div className="w-12 h-[1px] bg-text-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold animate-scroll-line" />
        </div>
        Scroll to discover
      </div>
    </header>
  );
}

function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <FadeUp>
            <SectionLabel>Who I am</SectionLabel>
            <h2 className="font-serif text-4xl md:text-6xl text-forest leading-tight mb-8">
              Loyal. Curious. <br />
              <em className="text-gold italic font-medium">Always building.</em>
            </h2>
            <div className="text-lg text-text-secondary leading-relaxed space-y-6 max-w-2xl font-light">
              <p>
                I'm a software developer from Uyo who codes things into
                existence — not just apps, but futures. My weekends mostly look
                like writing code that{" "}
                <em className="text-forest font-normal">actually works</em>,
                listening to blues or Afrobeats, and cooking something I
                invented on the spot.
              </p>
              <p>
                I'm an ambivert with a big heart, a dark sense of humour, and
                the kind of loyalty that people write songs about. I'm chill
                until I'm not — and when I'm passionate about something, you'll
                know it immediately.
              </p>
              <p>
                Fun fact nobody asked for:{" "}
                <span className="text-forest font-normal">I box.</span> Not
                professionally, but enough to surprise people at the gym.
              </p>
            </div>
          </FadeUp>
        </div>

        <div className="lg:col-span-5">
          <FadeUp delay={200}>
            <ul className="space-y-4">
              {facts.map((f) => (
                <li
                  key={f.key}
                  className="group flex gap-5 items-start p-6 rounded-2xl bg-white border border-border-light hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-2xl shrink-0 group-hover:bg-gold/10 transition-colors">
                    {f.icon}
                  </span>
                  <div>
                    <div className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">
                      {f.key}
                    </div>
                    <div className="text-base text-forest font-medium">
                      {f.val}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Building() {
  const projects = [
    {
      type: "Healthcare · Insurtech",
      name: "Proton Medicare",
      desc: "Affordable health insurance plans for Nigerians — transparent, modern, and actually accessible. Top-tier coverage without breaking the bank.",
      link: "https://protonmedicare.com",
    },
    {
      type: "Infrastructure · Renttech",
      name: "Renboot",
      desc: "Rent your idle hardware to others for hosting their projects. Turning dormant machines into passive income — decentralised cloud infrastructure.",
      link: "https://www.renboot.com",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 pb-32">
      <FadeUp>
        <SectionLabel>What I'm building</SectionLabel>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {projects.map((p, i) => (
          <FadeUp key={p.name} delay={i * 150}>
            <div className="group h-full p-10 rounded-[2rem] bg-forest-deep border border-gold/10 relative overflow-hidden hover:border-gold/40 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-8xl font-serif font-black text-gold">
                  {i + 1}
                </span>
              </div>

              <div className="relative z-10">
                <div className="text-[11px] font-bold tracking-[0.2em] text-gold/60 uppercase mb-4">
                  {p.type}
                </div>
                <h3 className="font-serif text-3xl text-cream mb-6 group-hover:text-gold transition-colors">
                  {p.name}
                </h3>
                <p className="text-cream/60 leading-relaxed font-light mb-10 text-lg">
                  {p.desc}
                </p>
                <Link
                  href={p.link}
                  target="_blank"
                  className="inline-flex items-center gap-3 text-gold text-sm font-semibold tracking-wider hover:gap-5 transition-all"
                >
                  Explore Venture
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17l10-10M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function TheVision() {
  return (
    <section className="bg-forest py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <SectionLabel>The Vision</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl text-cream mb-20">
            Where I'm Headed
          </h2>
        </FadeUp>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[1px] bg-cream/10 lg:-translate-x-1/2" />

          <div className="space-y-24">
            {visionSteps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 200}>
                <div
                  className={`relative flex flex-col lg:flex-row items-center gap-12 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Point */}
                  <div className="absolute left-0 lg:left-1/2 top-0 w-4 h-4 bg-gold rounded-full border-4 border-forest lg:-translate-x-1/2 z-10" />

                  <div className="w-full lg:w-1/2 lg:text-right">
                    <div
                      className={`${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                    >
                      <div className="text-gold font-bold text-2xl mb-2">
                        {step.date}
                      </div>
                      <h3 className="font-serif text-2xl text-cream mb-4">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div
                      className={`${i % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}
                    >
                      <p className="text-cream/60 leading-relaxed text-lg font-light max-w-md mx-auto lg:mx-0">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RelationshipDNA() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-32">
      <FadeUp>
        <SectionLabel>Relationship DNA</SectionLabel>
        <h2 className="font-serif text-4xl md:text-6xl text-forest mb-16">
          In a relationship, I am...
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relationshipCards.map((card, i) => (
          <FadeUp key={card.label} delay={i * 100}>
            <div
              className={`p-10 rounded-[2rem] h-full transition-all duration-500 border ${
                card.accent
                  ? "bg-forest text-cream border-forest shadow-2xl"
                  : "bg-surface-secondary text-forest border-border-light hover:border-gold/40"
              }`}
            >
              <div
                className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-6 ${card.accent ? "text-gold" : "text-gold"}`}
              >
                {card.label}
              </div>
              <div
                className={`text-xl leading-relaxed font-light ${card.accent ? "text-cream/90" : "text-text-secondary"}`}
              >
                {card.content}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function WinMyHeart() {
  return (
    <section className="bg-forest-deep py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <FadeUp>
              <SectionLabel>Substance over Surface</SectionLabel>
              <h2 className="font-serif text-4xl md:text-6xl text-cream mb-12">
                Win my heart with <br />
                <em className="text-gold italic font-medium">
                  real substance.
                </em>
              </h2>

              <ul className="space-y-6">
                {greenFlags.map((flag, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <span className="w-2 h-2 rounded-full bg-gold mt-2.5 shrink-0" />
                    <span className="text-lg text-cream/70 font-light group-hover:text-cream transition-colors">
                      {flag}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <div className="space-y-8">
            <FadeUp delay={200}>
              <div className="p-10 rounded-[2.5rem] bg-forest border border-gold/10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-8">
                  Non-negotiables (Dealbreakers)
                </div>
                <div className="flex flex-wrap gap-3">
                  {dealbreakers.map((d) => (
                    <span
                      key={d}
                      className="px-6 py-3 rounded-full bg-forest-deep/50 border border-red-500/30 text-red-400 text-sm font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-forest/30 border border-gold/5 mt-8">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-6">
                  Perfect First Date
                </div>
                <p className="text-cream/60 leading-relaxed font-light text-lg italic">
                  "A quiet dinner — somewhere we can actually hear each other.
                  No noise, no distractions. Just presence, eye contact, and
                  real conversation. Atmosphere matters. Chemistry matters
                  more."
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="bg-cream py-32 px-6 text-center border-y border-gold/10">
      <FadeUp>
        <div className="max-w-3xl mx-auto">
          <svg
            className="w-12 h-12 text-gold/20 mx-auto mb-8"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M10 8v8h6v8h-9v-8h3v-8h0zM22 8v8h6v8h-9v-8h3v-8h0z" />
          </svg>
          <blockquote className="font-serif text-3xl md:text-5xl text-forest leading-tight mb-10">
            Success is being able to independently rely on yourself for the
            means of a quality life — while having the ones you truly care about
            right beside you.
          </blockquote>
          <cite className="text-[11px] font-bold tracking-[0.3em] uppercase text-gold not-italic">
            — Moses Jacob Edem
          </cite>
        </div>
      </FadeUp>
    </section>
  );
}

function CtaFooter() {
  const ctaChips = [
    "Serious relationship",
    "Uyo, Nigeria",
    "Wants children",
    "Faith-driven",
    "Ambitious builder",
    // "Japan bound",
  ];

  return (
    <footer className="bg-forest-deep pt-32 pb-12 px-6 md:px-16 relative overflow-hidden">
      {/* Huge BG text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
        <span className="font-serif text-[30vw] font-black text-gold/5 leading-none tracking-tighter inline-block">
          ME
        </span>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 mb-32">
        <FadeUp>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-8">
            The final question
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-cream leading-tight mb-12">
            Are you the one <br />
            <em className="text-gold italic font-medium">
              worth building with?
            </em>
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {ctaChips.map((chip) => (
              <span
                key={chip}
                className="px-6 py-3 rounded-full bg-forest/20 border border-gold/10 text-gold text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>

          <Link
            href="/contact?intent=personal"
            className="inline-flex items-center gap-4 bg-gold text-forest-deep px-12 py-6 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(212,168,67,0.3)] transition-all"
          >
            Send a Signal
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </Link>
        </FadeUp>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-gold/10 relative z-10">
        <div className="font-serif text-2xl font-bold text-gold">
          Moses Edem
        </div>
        <div className="text-[10px] text-cream/40 tracking-widest uppercase">
          Uyo, Nigeria · Software Developer · Founder · 2026
        </div>
      </div>
    </footer>
  );
}

// --- MAIN PAGE ---

export default function AboutMePage() {
  return (
    <main className="min-h-screen bg-cream text-forest font-sans selection:bg-gold/30 selection:text-forest overflow-x-hidden">
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

      <FloatingParticles />

      <Hero />
      <About />
      <QuoteBand />
      <Building />
      <TheVision />
      <RelationshipDNA />
      <WinMyHeart />
      <CtaFooter />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes scrollLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-scroll-line {
          animation: scrollLine 2s infinite linear;
        }

        .clip-hero-diagonal {
          clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
        }

        @media (max-width: 1024px) {
          .clip-hero-diagonal {
            clip-path: none;
          }
        }
      `}</style>
    </main>
  );
}
