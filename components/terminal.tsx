"use client";

import { useState, useEffect } from "react";

export default function Terminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayText, setDisplayText] = useState<string[]>([]);

  const terminalLines = [
    "$ whoami",
    "moses_edem",
    "$ cat skills.txt",
    "Backend Development: ████████████ 95%",
    "Node.js/Express:     ████████████ 90%",
    "PHP/Laravel:         ██████████░░ 80%",
    "Database Design:     ████████████ 95%",
    "Prisma + PostgreSQL: ████████████ 95%",
    "API Development:     ████████████ 95%",
    "$ ls projects/",
    "InstantOTP/  Etegram/  MonieCheap/  BrixVPN/",
    "TunnelDeck/  ProtonMedicare/",
    "$ echo 'Ready to build amazing things!'",
    "Ready to build amazing things!",
    "$ _",
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      if (currentChar < line.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => {
            const newText = [...prev];
            if (!newText[currentLine]) {
              newText[currentLine] = "";
            }
            newText[currentLine] = line.substring(0, currentChar + 1);
            return newText;
          });
          setCurrentChar(currentChar + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLine, currentChar, terminalLines]);

  return (
    <div
      className="rounded-2xl p-6 font-mono text-sm overflow-hidden"
      style={{
        background: 'var(--forest-deep)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-3 text-xs" style={{ color: 'var(--text-on-dark-muted)' }}>
          moses@portfolio:~
        </span>
      </div>

      {/* Terminal lines */}
      <div className="space-y-1">
        {displayText.map((line, index) => (
          <div
            key={index}
            style={{
              color: line.startsWith("$")
                ? 'var(--gold-light)'
                : line.includes("%")
                ? 'rgba(250, 248, 245, 0.8)'
                : line.includes("/")
                ? 'var(--gold)'
                : 'var(--text-on-dark-muted)',
            }}
          >
            {line}
            {index === currentLine && (
              <span className="animate-pulse" style={{ color: 'var(--gold)' }}>|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
