"use client";

import { useEffect, useMemo, useState } from "react";

type CodePaneProps = {
  filename?: string;
  code: string;
  animate?: boolean;
  typingMs?: number;
};

export function CodePane({
  filename = "stack.ts",
  code,
  animate = true,
  typingMs = 14,
}: CodePaneProps) {
  const lines = useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);
  const full = useMemo(() => lines.join("\n"), [lines]);
  const [shown, setShown] = useState(animate ? "" : full);
  const [done, setDone] = useState(!animate);

  useEffect(() => {
    if (!animate) {
      setShown(full);
      setDone(true);
      return;
    }
    setShown("");
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, typingMs);
    return () => window.clearInterval(id);
  }, [full, animate, typingMs]);

  const displayLines = shown.split("\n");

  return (
    <div className="card-surface group overflow-hidden transition-colors hover:border-accent/50">
      <div className="flex items-center gap-2 border-b border-border bg-muted/35 px-3 py-2.5 sm:px-4">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/35 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/35 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/35 sm:h-2.5 sm:w-2.5" />
        <span className="ml-1.5 truncate font-mono text-[11px] text-muted-foreground sm:text-xs">
          {filename}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {done ? "ready" : "typing"}
        </span>
      </div>
      <div className="relative overflow-x-auto">
        <pre className="p-3 font-mono text-[11px] leading-relaxed sm:p-4 sm:text-xs md:text-sm">
          <code>
            {displayLines.map((line, idx) => (
              <div key={idx} className="flex min-h-[1.2rem] gap-3 sm:gap-4">
                <span className="w-5 shrink-0 select-none text-right text-muted-foreground/45 sm:w-6">
                  {idx + 1}
                </span>
                <span className="text-foreground">
                  {highlightLine(line)}
                  {!done && idx === displayLines.length - 1 ? (
                    <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-accent align-middle" />
                  ) : null}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function highlightLine(line: string) {
  if (line.trimStart().startsWith("//")) {
    return <span className="text-muted-foreground">{line}</span>;
  }
  const parts = line.split(/(".*?"|'.*?'|`.*?`)/g);
  return parts.map((part, i) => {
    if (/^["'`]/.test(part)) {
      return (
        <span key={i} className="text-accent">
          {part}
        </span>
      );
    }
    if (/\b(const|let|as|return|export|import|from|type)\b/.test(part)) {
      return part.split(/(\b(?:const|let|as|return|export|import|from|type)\b)/g).map((tok, j) =>
        /^(const|let|as|return|export|import|from|type)$/.test(tok) ? (
          <span key={`${i}-${j}`} className="text-foreground font-medium">
            {tok}
          </span>
        ) : (
          <span key={`${i}-${j}`}>{tok}</span>
        )
      );
    }
    return <span key={i}>{part}</span>;
  });
}
