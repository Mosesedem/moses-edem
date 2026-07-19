"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Thin top progress bar for App Router navigations.
 * Starts on internal link clicks; completes when the URL settles.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (hideRef.current) {
      clearTimeout(hideRef.current);
      hideRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    clearTimers();
    setVisible(true);
    setWidth(12);
    timerRef.current = setInterval(() => {
      setWidth((w) => {
        if (w >= 88) return w;
        // Ease toward ~90% while waiting for the server
        return w + Math.max(0.6, (90 - w) * 0.04);
      });
    }, 120);
  }, [clearTimers]);

  const done = useCallback(() => {
    if (!activeRef.current) return;
    clearTimers();
    setWidth(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
      activeRef.current = false;
    }, 220);
  }, [clearTimers]);

  // Complete when route changes
  useEffect(() => {
    done();
  }, [pathname, searchParams, done]);

  // Start when user clicks an internal link
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const el = (e.target as HTMLElement | null)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (el.getAttribute("target") === "_blank") return;
      if (el.hasAttribute("download")) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        const next = url.pathname + url.search;
        const cur = window.location.pathname + window.location.search;
        if (next === cur) return;
        start();
      } catch {
        /* ignore invalid href */
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  if (!visible && width === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[2px]"
      role="progressbar"
      aria-hidden={!visible}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
    >
      <div
        className="h-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.55)] transition-[width] duration-150 ease-out"
        style={{
          width: `${width}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
