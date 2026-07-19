"use client";

type DeleteButtonProps = {
  /** Shown in the confirm dialog */
  itemLabel: string;
  className?: string;
};

/**
 * Submit button with a confirm step so accidental deletes are harder.
 * Parent must be a <form action={deleteAction}> with hidden id field.
 */
export function DeleteButton({ itemLabel, className }: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className={
        className ??
        "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-border px-3 text-sm text-muted-foreground transition-colors hover:border-red-500 hover:text-red-600 active:bg-muted sm:min-h-9 sm:flex-none sm:px-2.5 sm:text-xs"
      }
      onClick={(e) => {
        const ok = window.confirm(
          `Delete “${itemLabel}”? This cannot be undone from the dashboard.`
        );
        if (!ok) e.preventDefault();
      }}
    >
      Delete
    </button>
  );
}
