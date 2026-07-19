"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Trash2, User } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey — I am AI Moses. Ask about projects I have shipped, my stack, experience, or anything else. No emoji, plenty of sarcasm if you want it.",
};

type AiChatProps = {
  persona: string;
};

export function AiChat({ persona }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    setMessages([WELCOME]);
    setError(null);
  }, [persona]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const history = next
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: history.slice(0, -1),
          persona,
        }),
      });
      const data = (await res.json()) as { response?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Chat failed");
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.response || "No response.",
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-surface flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border">
            <Bot size={18} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">AI Moses</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              lens · {persona}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setMessages([WELCOME]);
            setError(null);
          }}
          className="btn-icon !h-10 !w-10"
          aria-label="Clear chat"
        >
          <Trash2 size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex h-[min(52vh,22rem)] flex-col gap-3.5 overflow-y-auto overscroll-contain p-4 sm:h-[26rem]"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border">
              {m.role === "assistant" ? (
                <Bot size={14} strokeWidth={1.75} />
              ) : (
                <User size={14} strokeWidth={1.75} />
              )}
            </div>
            <div
              className={`max-w-[min(85%,20rem)] rounded-xl border px-3.5 py-2.5 text-[0.875rem] leading-relaxed sm:max-w-[78%] ${
                m.role === "user"
                  ? "border-accent/35 bg-accent/10 text-foreground"
                  : "border-border bg-muted/35 text-foreground"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{m.content}</p>
            </div>
          </div>
        ))}
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 size={14} className="animate-spin" />
            Thinking...
          </div>
        ) : null}
        {error ? (
          <p className="font-mono text-xs text-red-500">{error}</p>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form
        className="flex items-stretch gap-2 border-t border-border p-3 safe-pb sm:safe-pb-0"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Moses anything..."
          className="min-h-11 flex-1 rounded-[var(--radius)] border border-border bg-background px-3.5 text-sm outline-none ring-accent placeholder:text-muted-foreground focus:ring-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary !min-h-11 shrink-0 px-3.5 disabled:opacity-50"
          aria-label="Send"
        >
          <Send size={16} strokeWidth={1.75} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
