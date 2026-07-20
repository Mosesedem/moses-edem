"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { datingProfile, getWhatsAppUrl } from "@/lib/dating-profile";
import { cn } from "@/lib/utils";

type Answers = Record<string, string>;

function scoreFromAnswers(answers: Answers): {
  points: number;
  max: number;
  percent: number;
} {
  const qs = datingProfile.compatibilityQuestions;
  let points = 0;
  let max = 0;
  for (const q of qs) {
    const best = Math.max(...q.options.map((o) => o.points));
    max += best;
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    if (chosen) points += chosen.points;
  }
  const percent = max === 0 ? 0 : Math.round((points / max) * 100);
  return { points, max, percent };
}

function resultCopy(percent: number): {
  title: string;
  body: string;
  tone: "high" | "mid" | "low";
} {
  if (percent >= 80) {
    return {
      title: "Strong match energy",
      body: "On paper, we might actually work. Values, intent, and humour line up. The only way to know for real is a conversation, preferably not over a printer emergency.",
      tone: "high",
    };
  }
  if (percent >= 55) {
    return {
      title: "Promising, with room to explore",
      body: "There is overlap worth talking through. Compatibility is not a quiz score. It is how we show up when it is not convenient. Curious enough to say hello?",
      tone: "mid",
    };
  }
  if (percent >= 30) {
    return {
      title: "Honest stretch",
      body: "We might want different things right now. That is not a failure. Clarity is a gift. If something still resonated, you are welcome to say so.",
      tone: "low",
    };
  }
  return {
    title: "Probably not the right fit",
    body: "And that is okay. I would rather we both find the right person than force a mismatch. No hard feelings. Go build something beautiful elsewhere.",
    tone: "low",
  };
}

export function CompatibilityQuiz() {
  const questions = datingProfile.compatibilityQuestions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = questions[step];
  const progress = done
    ? 100
    : Math.round((Object.keys(answers).length / questions.length) * 100);

  const result = useMemo(() => {
    if (!done) return null;
    const score = scoreFromAnswers(answers);
    return { ...score, ...resultCopy(score.percent) };
  }, [answers, done]);

  function pick(optionId: string) {
    if (!current) return;
    const next = { ...answers, [current.id]: optionId };
    setAnswers(next);
    if (step >= questions.length - 1) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  const waText = result
    ? `Hi Moses, I took your compatibility quiz and scored ${result.percent}%. ${result.title}. I would like to introduce myself.`
    : datingProfile.whatsappDefaultText;

  return (
    <div className="card-surface overflow-hidden">
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
              <Heart size={16} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Compatibility check
              </p>
              <p className="text-xs text-muted-foreground">
                Six questions. Honest answers only.
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {done ? "Done" : `${step + 1} / ${questions.length}`}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {!done && current ? (
          <>
            <p className="section-label mb-3">Question</p>
            <h3 className="mb-5 text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl">
              {current.question}
            </h3>
            <div className="space-y-2">
              {current.options.map((opt) => {
                const selected = answers[current.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => pick(opt.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-[var(--radius)] border px-3.5 py-3 text-left text-sm transition-colors",
                      selected
                        ? "border-accent bg-accent/5 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                    )}
                  >
                    <span className="leading-snug">{opt.label}</span>
                    {selected ? (
                      <Check size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
                    ) : (
                      <ArrowRight
                        size={14}
                        strokeWidth={1.75}
                        className="shrink-0 opacity-40"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ) : result ? (
          <div>
            <p className="section-label mb-2">Result</p>
            <div className="mb-4 flex items-end gap-3">
              <span className="text-4xl font-medium tracking-tight text-foreground tabular-nums sm:text-5xl">
                {result.percent}
              </span>
              <span className="mb-1 font-mono text-sm text-muted-foreground">
                / 100
              </span>
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              {result.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {result.body}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              {result.percent >= 40 ? (
                <a
                  href={getWhatsAppUrl(waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle size={16} strokeWidth={1.75} />
                  Say hello with your score
                </a>
              ) : null}
              <button type="button" onClick={reset} className="btn-secondary">
                <RotateCcw size={16} strokeWidth={1.75} />
                Retake quiz
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
