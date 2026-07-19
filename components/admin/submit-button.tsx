"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function AdminSubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70 sm:min-h-11 sm:w-auto sm:py-2.5"
    >
      {pending ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground"
            aria-hidden
          />
          Saving…
        </>
      ) : (
        children
      )}
    </button>
  );
}

/** Secondary/outline action with pending state (sync, reseed, etc.). */
export function PendingActionButton({
  children,
  disabled,
  variant = "default",
}: {
  children: ReactNode;
  disabled?: boolean;
  variant?: "default" | "muted";
}) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-busy={pending}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:border-accent active:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-11 sm:w-auto ${
        variant === "muted" ? "text-muted-foreground hover:text-foreground" : ""
      }`}
    >
      {pending ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground"
            aria-hidden
          />
          Working…
        </>
      ) : (
        children
      )}
    </button>
  );
}
