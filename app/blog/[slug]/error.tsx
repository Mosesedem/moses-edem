"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/error-page";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[blog/[slug]/error]", error);
  }, [error]);

  return (
    <ErrorPage
      error={error}
      reset={reset}
      title="Could not load this post"
      description="Something failed while rendering this article. Try again, or return to the blog index."
      homeHref="/blog"
      homeLabel="All posts"
    />
  );
}
