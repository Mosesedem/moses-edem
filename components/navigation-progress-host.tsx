"use client";

import { Suspense } from "react";
import { NavigationProgress } from "@/components/navigation-progress";

/** useSearchParams requires Suspense — isolate so the rest of the tree can render. */
export function NavigationProgressHost() {
  return (
    <Suspense fallback={null}>
      <NavigationProgress />
    </Suspense>
  );
}
