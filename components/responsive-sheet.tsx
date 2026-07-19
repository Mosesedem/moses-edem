"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ResponsiveSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function ResponsiveSheet({
  open,
  onClose,
  title,
  children,
}: ResponsiveSheetProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Mobile bottom sheet */}
      <div className="sheet-bottom absolute inset-x-0 bottom-0 flex max-h-[min(90dvh,40rem)] flex-col rounded-t-2xl border border-border bg-background shadow-2xl md:hidden">
        <div className="relative flex shrink-0 items-center justify-between border-b border-border px-4 pb-3 pt-5">
          <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-border" />
          <p className="section-label pt-1">{title ?? "Details"}</p>
          <button
            type="button"
            onClick={onClose}
            className="btn-icon !h-10 !w-10"
            aria-label="Close sheet"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-4 py-5">
          {children}
        </div>
      </div>

      {/* Desktop side sheet */}
      <div className="sheet-side absolute inset-y-0 right-0 hidden w-full max-w-md flex-col border-l border-border bg-background shadow-2xl md:flex">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <p className="section-label">{title ?? "Details"}</p>
          <button
            type="button"
            onClick={onClose}
            className="btn-icon !h-10 !w-10"
            aria-label="Close sheet"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-6">{children}</div>
      </div>
    </div>
  );
}
