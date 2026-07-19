"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

/**
 * Replaces the root layout when it fails. Must include its own <html>/<body>
 * and cannot rely on app/layout providers.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#0a0a0a",
          color: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.25rem",
        }}
      >
        <div style={{ maxWidth: 28 * 16, width: "100%", textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              margin: "0 auto 1.5rem",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertTriangle size={22} strokeWidth={1.75} />
          </div>
          <p
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#999",
              margin: "0 0 0.75rem",
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              margin: "0 0 0.75rem",
            }}
          >
            The app failed to load
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#a3a3a3",
              margin: "0 0 1.75rem",
            }}
          >
            A low-level error prevented the page shell from rendering. Try
            reloading. If it keeps happening, check back shortly.
          </p>
          {error.digest ? (
            <p
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 11,
                color: "#737373",
                marginBottom: "1.5rem",
              }}
            >
              Ref: {error.digest}
            </p>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 44,
                padding: "0.6rem 1rem",
                borderRadius: 8,
                border: "none",
                background: "#3b82f6",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <RefreshCw size={16} strokeWidth={1.75} />
              Try again
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 44,
                padding: "0.6rem 1rem",
                borderRadius: 8,
                border: "1px solid #2a2a2a",
                background: "transparent",
                color: "#f5f5f5",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <Home size={16} strokeWidth={1.75} />
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
