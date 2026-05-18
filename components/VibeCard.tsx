// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// type FAQ = {
//   id: number;
//   question: string;
//   answer: string;
//   emoji: string;
// };

// type Question = {
//   id: number;
//   text: string;
//   category: string;
//   emoji: string;
// };

// type Section = 'faq' | 'conversation';

// const faqs: FAQ[] = [
//   {
//     id: 1,
//     question: "What kind of work do you do?",
//     answer: "I build digital products — mostly web apps, tools, and interfaces. I care about clarity, honest communication, and shipping things that feel intentional.",
//     emoji: '🛠️',
//   },
//   {
//     id: 2,
//     question: "What do you value most in relationships?",
//     answer: "Depth, honesty, and intentionality. I enjoy conversations that go somewhere real, not just surface-level small talk.",
//     emoji: '💎',
//   },
//   {
//     id: 3,
//     question: "What does a meaningful conversation look like to you?",
//     answer: "One where both people are present. No performance, no scripts — just two people actually listening and responding to each other.",
//     emoji: '💬',
//   },
//   {
//     id: 4,
//     question: "How do you spend your free time?",
//     answer: "Building side projects, reading, long walks, and conversations that leave me thinking. I like moments that feel earned, not forced.",
//     emoji: '📚',
//   },
//   {
//     id: 5,
//     question: "What are you looking for right now?",
//     answer: "Genuine connection. People who think deeply, communicate clearly, and aren't afraid to be honest about who they are.",
//     emoji: '🤝',
//   },
// ];

// const questions: Question[] = [
//   { id: 1, text: "What's your favorite thing to do on a lazy weekend?", category: 'icebreaker', emoji: '🛋️' },
//   { id: 2, text: "Do you prefer coffee dates or dinner dates?", category: 'icebreaker', emoji: '☕' },
//   { id: 3, text: "What's the most spontaneous thing you've ever done?", category: 'icebreaker', emoji: '⚡' },
//   { id: 4, text: "What kind of music sets the mood for a great night?", category: 'icebreaker', emoji: '🎵' },
//   { id: 5, text: "What values are most important to you in a relationship?", category: 'deep', emoji: '💎' },
//   { id: 6, text: "How do you define success?", category: 'deep', emoji: '🎯' },
//   { id: 7, text: "What makes you feel alive — and what's on your bucket list?", category: 'deep', emoji: '🔥' },
//   { id: 8, text: "If you could have dinner with any fictional character, who would it be?", category: 'fun', emoji: '🍽️' },
//   { id: 9, text: "What's your guilty pleasure TV show or movie?", category: 'fun', emoji: '📺' },
//   { id: 10, text: "What would your perfect vacation look like?", category: 'fun', emoji: '🏖️' },
// ];

// const WHATSAPP_NUMBER = '2349030465501';
// const WHATSAPP_BASE = 'https://api.whatsapp.com/send';

// function getWhatsAppUrl(text: string): string {
//   const params = new URLSearchParams({
//     phone: WHATSAPP_NUMBER,
//     text: text,
//     type: 'phone_number',
//     app_absent: '0',
//   });
//   return `${WHATSAPP_BASE}?${params.toString()}`;
// }

// export default function VibeCard() {
//   const [activeSection, setActiveSection] = useState<Section>('faq');
//   const [faqIndex, setFaqIndex] = useState(0);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [touchStart, setTouchStart] = useState<number | null>(null);

//   const currentFaq = faqs[faqIndex];
//   const currentQuestion = questions[questionIndex];

//   const handleNext = useCallback(() => {
//     setDirection(1);
//     if (activeSection === 'faq') {
//       setFaqIndex((prev) => (prev + 1) % faqs.length);
//     } else {
//       setQuestionIndex((prev) => (prev + 1) % questions.length);
//     }
//   }, [activeSection]);

//   const handlePrev = useCallback(() => {
//     setDirection(-1);
//     if (activeSection === 'faq') {
//       setFaqIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
//     } else {
//       setQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
//     }
//   }, [activeSection]);

//   // Touch swipe handlers
//   const onTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchEnd = (e: React.TouchEvent) => {
//     if (touchStart === null) return;
//     const diff = touchStart - e.changedTouches[0].clientX;
//     const threshold = 50;
//     if (Math.abs(diff) > threshold) {
//       if (diff > 0) handleNext();
//       else handlePrev();
//     }
//     setTouchStart(null);
//   };

//   // Reset indices when switching sections
//   useEffect(() => {
//     setDirection(0);
//   }, [activeSection]);

//   const variants = {
//     enter: (dir: number) => ({
//       x: dir > 0 ? 120 : dir < 0 ? -120 : 0,
//       opacity: 0,
//       scale: 0.96,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//     },
//     exit: (dir: number) => ({
//       x: dir > 0 ? -120 : dir < 0 ? 120 : 0,
//       opacity: 0,
//       scale: 0.96,
//     }),
//   };

//   const isFaq = activeSection === 'faq';
//   const currentItem = isFaq ? currentFaq : currentQuestion;
//   const currentIndex = isFaq ? faqIndex : questionIndex;
//   const totalItems = isFaq ? faqs.length : questions.length;
//   const whatsappText = isFaq
//     ? `Hi, I read your FAQ about "${currentFaq.question}" and wanted to discuss it with you.`
//     : `Hi, I saw your conversation starter: "${currentQuestion.text}" — I'd love to talk about this.`;
//   const whatsappUrl = getWhatsAppUrl(whatsappText);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 0.2 }}
//       className="rounded-2xl p-5 sm:p-7 w-full max-w-md mx-auto select-none"
//       style={{
//         background: 'var(--surface-elevated)',
//         border: '1px solid var(--border-light)',
//         boxShadow: 'var(--shadow-lg)',
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-5">
//         <div
//           className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
//           style={{ background: 'rgba(212, 168, 67, 0.1)' }}
//         >
//           <span className="text-lg">{isFaq ? '❓' : '💬'}</span>
//         </div>
//         <div className="min-w-0">
//           <h3 className="font-sans font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
//             {isFaq ? 'Quick Answers' : 'Conversation Starters'}
//           </h3>
//           <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
//             {isFaq ? 'Swipe or tap to explore' : 'Questions that spark real connection'}
//           </p>
//         </div>
//       </div>

//       {/* Section Tabs */}
//       <div className="flex gap-2 mb-5">
//         {[
//           { key: 'faq' as Section, label: 'FAQs', emoji: '📋' },
//           { key: 'conversation' as Section, label: 'Starters', emoji: '🔥' },
//         ].map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveSection(tab.key)}
//             className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95"
//             style={{
//               background: activeSection === tab.key ? 'var(--forest)' : 'var(--surface-secondary)',
//               color: activeSection === tab.key ? '#fff' : 'var(--text-muted)',
//               border: '1px solid var(--border-light)',
//             }}
//           >
//             <span>{tab.emoji}</span>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Card Content */}
//       <div
//         className="relative min-h-[200px] mb-5 overflow-hidden rounded-xl touch-pan-y"
//         style={{ background: 'var(--surface-secondary)' }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <AnimatePresence mode="wait" custom={direction}>
//           <motion.div
//             key={`${activeSection}-${currentItem.id}`}
//             custom={direction}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.3, ease: 'easeInOut' }}
//             className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center"
//           >
//             <span className="text-3xl mb-3 block">{currentItem.emoji}</span>

//             {isFaq ? (
//               <>
//                 <p className="font-sans font-bold text-base leading-snug mb-3" style={{ color: 'var(--text-primary)' }}>
//                   {(currentItem as FAQ).question}
//                 </p>
//                 <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
//                   {(currentItem as FAQ).answer}
//                 </p>
//               </>
//             ) : (
//               <p className="font-sans font-semibold text-base leading-snug" style={{ color: 'var(--text-primary)' }}>
//                 {(currentItem as Question).text}
//               </p>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Navigation Controls */}
//       <div className="flex items-center justify-between mb-5 px-1">
//         <button
//           onClick={handlePrev}
//           className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
//           style={{
//             background: 'var(--surface-secondary)',
//             border: '1px solid var(--border-light)',
//             color: 'var(--text-primary)'
//           }}
//           aria-label="Previous"
//         >
//           ←
//         </button>

//         {/* Progress Dots */}
//         <div className="flex items-center gap-1.5">
//           {Array.from({ length: Math.min(totalItems, 6) }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setDirection(idx > currentIndex ? 1 : -1);
//                 if (isFaq) setFaqIndex(idx);
//                 else setQuestionIndex(idx);
//               }}
//               className="w-2 h-2 rounded-full transition-all duration-300"
//               style={{
//                 background: idx === currentIndex ? 'var(--forest)' : 'var(--border-light)',
//                 transform: idx === currentIndex ? 'scale(1.4)' : 'scale(1)',
//               }}
//               aria-label={`Go to item ${idx + 1}`}
//             />
//           ))}
//           {totalItems > 6 && (
//             <span className="text-[10px] ml-1" style={{ color: 'var(--text-muted)' }}>
//               +{totalItems - 6}
//             </span>
//           )}
//         </div>

//         <button
//           onClick={handleNext}
//           className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
//           style={{
//             background: 'var(--forest)',
//             color: '#fff',
//             border: '1px solid var(--forest)'
//           }}
//           aria-label="Next"
//         >
//           →
//         </button>
//       </div>

//       {/* WhatsApp CTA */}
//       <a
//         href={whatsappUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 mb-4"
//         style={{
//           background: '#25D366',
//           color: '#fff',
//         }}
//       >
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//         </svg>
//         Send a DM about this
//       </a>

//       {/* Bottom Tip */}
//       <div className="pt-4 text-center" style={{ borderTop: '1px solid var(--border-light)' }}>
//         <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
//           {isFaq
//             ? "Swipe or tap the arrows to browse. Tap a dot to jump."
//             : "Don't fire them off like a job interview — weave them in naturally."}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";

type ConvItem = { cat: string; q: string };
type FaqItem = { q: string; a: string };
type Tab = "conv" | "faq";
type Category = "all" | "icebreaker" | "deep" | "fun";

const WA_BASE = "https://api.whatsapp.com/send/?phone=2349030465501&text=";

const conv: ConvItem[] = [
  {
    cat: "icebreaker",
    q: "What's your favorite thing to do on a lazy weekend?",
  },
  { cat: "icebreaker", q: "Do you prefer coffee dates or dinner dates?" },
  {
    cat: "icebreaker",
    q: "What's the most spontaneous thing you've ever done?",
  },
  {
    cat: "icebreaker",
    q: "What kind of music sets the mood for a great night?",
  },
  { cat: "icebreaker", q: "What does a typical weekend look like for you?" },
  {
    cat: "icebreaker",
    q: "If you could take a day trip anywhere tomorrow, where would you go?",
  },
  {
    cat: "deep",
    q: "What values are most important to you in a relationship?",
  },
  { cat: "deep", q: "How do you define success?" },
  {
    cat: "deep",
    q: "What makes you feel alive — and what's on your bucket list?",
  },
  { cat: "deep", q: "What's something you're proud of?" },
  { cat: "deep", q: "What helps you feel loved, safe, and protected?" },
  {
    cat: "deep",
    q: "What assumption do people make about you that is totally wrong?",
  },
  {
    cat: "deep",
    q: "What's the most important lesson you've learned in life?",
  },
  {
    cat: "fun",
    q: "If you could have dinner with any fictional character, who would it be?",
  },
  { cat: "fun", q: "What's your guilty pleasure TV show or movie?" },
  { cat: "fun", q: "If you were an animal, what would you be and why?" },
  { cat: "fun", q: "What would your perfect vacation look like?" },
  {
    cat: "fun",
    q: "Would you rather have an incredibly fast car or incredibly fast internet?",
  },
];

const faqs: FaqItem[] = [
  {
    q: "What do you actually build?",
    a: "Products and ideas — from digital tools to experiences that solve real problems. I'm drawn to things that require both technical thinking and a clear human vision.",
  },
  {
    q: "What kind of conversations do you find most valuable?",
    a: "The ones that go somewhere. I value depth over small talk — conversations where both people leave thinking differently than when they started.",
  },
  {
    q: "What does 'intentional' mean to you?",
    a: "Choosing how you show up, instead of just reacting. Whether it's a message, a meeting, or a moment — I'd rather it mean something than just happen.",
  },
  {
    q: "How do you think about clarity?",
    a: "Clarity is a form of respect. When you're clear — about what you want, what you mean, who you are — you make it easier for others to show up honestly too.",
  },
  {
    q: "What does honesty look like in how you operate?",
    a: "Saying what I actually think, even when it's uncomfortable. Not brutal, but real. I'd rather have a harder conversation early than a polite misunderstanding later.",
  },
  {
    q: "What are you working on right now?",
    a: "A few things at once — the way ideas tend to move. If you're curious about any of it, send a DM. I'd rather talk about it in conversation than summarize it here.",
  },
  {
    q: "Are you open to collaborating?",
    a: "Depends on the fit. I work best with people who think deeply, move with purpose, and don't need hand-holding. If that sounds like you, let's talk.",
  },
  {
    q: "What do you look for in people you connect with?",
    a: "Curiosity. Directness. A sense that they're building something — not just filling time. Someone who takes ideas seriously without taking themselves too seriously.",
  },
];

const cats: Category[] = ["all", "icebreaker", "deep", "fun"];

function Dots({ total, active }: { total: number; active: number }) {
  const max = Math.min(total, 7);
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            width: i === active % max ? 16 : 4,
            borderRadius: i === active % max ? 2 : "50%",
            background:
              i === active % max
                ? "var(--color-text-primary, #111)"
                : "var(--color-border-tertiary, #ddd)",
            transition: "all 0.25s",
          }}
        />
      ))}
    </div>
  );
}

function NavBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "0.5px solid var(--color-border-secondary, #ccc)",
        background: "var(--color-background-primary, #fff)",
        color: "var(--color-text-primary, #111)",
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function WaIcon() {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 24 24"
      fill="white"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function VibeCard() {
  const [tab, setTab] = useState<Tab>("conv");
  const [convCat, setConvCat] = useState<Category>("all");
  const [convIdx, setConvIdx] = useState(0);
  const [faqIdx, setFaqIdx] = useState(0);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [convFading, setConvFading] = useState(false);
  const [faqFading, setFaqFading] = useState(false);

  const filtered =
    convCat === "all" ? conv : conv.filter((d) => d.cat === convCat);
  const convItem = filtered[convIdx % filtered.length];
  const faqItem = faqs[faqIdx];

  const convDmHref =
    WA_BASE +
    encodeURIComponent(
      `Hey! I saw your conversation starter: "${convItem.q}" — I'd love to chat about this.`,
    ) +
    "&type=phone_number&app_absent=0";

  const faqDmHref =
    WA_BASE +
    encodeURIComponent(
      `Hey! I saw your FAQ: "${faqItem.q}" — I'd love to discuss this with you.`,
    ) +
    "&type=phone_number&app_absent=0";

  function fadeNav(setFading: (v: boolean) => void, fn: () => void) {
    setFading(true);
    setTimeout(() => {
      fn();
      setFading(false);
    }, 160);
  }

  function convNav(dir: number) {
    fadeNav(setConvFading, () =>
      setConvIdx((prev) => (prev + dir + filtered.length) % filtered.length),
    );
  }

  function faqNav(dir: number) {
    fadeNav(setFaqFading, () => {
      setFaqIdx((prev) => (prev + dir + faqs.length) % faqs.length);
      setAnswerOpen(false);
    });
  }

  function setCat(cat: Category) {
    setConvCat(cat);
    setConvIdx(0);
  }

  // Swipe support
  const convTouchX = useRef(0);
  const faqTouchX = useRef(0);

  const cardStyle = (fading: boolean): React.CSSProperties => ({
    minHeight: 148,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1.5rem 0 1rem",
    transition: "opacity 0.18s",
    opacity: fading ? 0 : 1,
  });

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: "1.25rem 1.25rem 1rem",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
          marginBottom: "1.5rem",
        }}
      >
        {(["conv", "faq"] as Tab[]).map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "0 0 10px",
              background: "none",
              border: "none",
              borderBottom:
                tab === t
                  ? "2px solid var(--color-text-primary, #111)"
                  : "2px solid transparent",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 500,
              color:
                tab === t
                  ? "var(--color-text-primary, #111)"
                  : "var(--color-text-secondary, #888)",
              cursor: "pointer",
              marginBottom: -0.5,
              letterSpacing: "0.01em",
              transition: "all 0.2s",
            }}
          >
            {i === 0 ? "Conversation starters" : "FAQs"}
          </button>
        ))}
      </div>

      {/* CONV PANEL */}
      {tab === "conv" && (
        <div>
          {/* Category pills */}
          <div
            style={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  fontSize: 11.5,
                  fontFamily: "inherit",
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "0.5px solid var(--color-border-tertiary, #e5e5e5)",
                  background:
                    convCat === c ? "var(--color-text-primary, #111)" : "none",
                  color:
                    convCat === c
                      ? "var(--color-background-primary, #fff)"
                      : "var(--color-text-secondary, #888)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  letterSpacing: "0.02em",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Card */}
          <div
            style={cardStyle(convFading)}
            onTouchStart={(e) => {
              convTouchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - convTouchX.current;
              if (Math.abs(dx) > 40) convNav(dx < 0 ? 1 : -1);
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--color-text-primary, #111)",
                lineHeight: 1.4,
              }}
            >
              {convItem.q}
            </p>
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "0.75rem",
            }}
          >
            <Dots total={filtered.length} active={convIdx % filtered.length} />
            <div style={{ display: "flex", gap: 6 }}>
              <NavBtn onClick={() => convNav(-1)}>←</NavBtn>
              <NavBtn onClick={() => convNav(1)}>→</NavBtn>
            </div>
          </div>

          <div
            style={{
              height: "0.5px",
              background: "var(--color-border-tertiary, #e5e5e5)",
              margin: "1.25rem 0",
            }}
          />

          <a
            href={convDmHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:translate-x-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: 13,
              borderRadius: 50,
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            <WaIcon />
            Discuss this with me
          </a>
        </div>
      )}

      {/* FAQ PANEL */}
      {tab === "faq" && (
        <div>
          {/* Card */}
          <div
            style={cardStyle(faqFading)}
            onTouchStart={(e) => {
              faqTouchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - faqTouchX.current;
              if (Math.abs(dx) > 40) faqNav(dx < 0 ? 1 : -1);
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--color-text-primary, #111)",
                lineHeight: 1.4,
              }}
            >
              {faqItem.q}
            </p>
            {answerOpen && (
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--color-text-secondary, #888)",
                  lineHeight: 1.65,
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop:
                    "0.5px solid var(--color-border-tertiary, #e5e5e5)",
                }}
              >
                {faqItem.a}
              </p>
            )}
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "0.75rem",
            }}
          >
            <Dots total={faqs.length} active={faqIdx} />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => setAnswerOpen((v) => !v)}
                style={{
                  fontSize: 12,
                  fontFamily: "inherit",
                  color: "var(--color-text-secondary, #888)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationColor: "var(--color-border-tertiary, #e5e5e5)",
                  transition: "color 0.15s",
                }}
              >
                {answerOpen ? "hide answer" : "show answer"}
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                <NavBtn onClick={() => faqNav(-1)}>←</NavBtn>
                <NavBtn onClick={() => faqNav(1)}>→</NavBtn>
              </div>
            </div>
          </div>

          <div
            style={{
              height: "0.5px",
              background: "var(--color-border-tertiary, #e5e5e5)",
              margin: "1.25rem 0",
            }}
          />

          <a
            href={faqDmHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: 13,
              borderRadius: 12,
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            <WaIcon />
            Ask me about this
          </a>
        </div>
      )}
    </div>
  );
}
