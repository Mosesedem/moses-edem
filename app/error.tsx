"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/error-page";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <ErrorPage
      error={error}
      reset={reset}
      title="Something went wrong"
      description="We hit a snag rendering this page. Try again, or go back home."
    />
  );
}
