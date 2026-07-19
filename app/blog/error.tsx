"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/error-page";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[blog/error]", error);
  }, [error]);

  return (
    <ErrorPage
      error={error}
      reset={reset}
      title="Blog unavailable"
      description="We could not load the blog right now. Try again in a moment."
      homeHref="/blog"
      homeLabel="Retry index"
    />
  );
}
