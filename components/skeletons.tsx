/** Shared loading skeletons — public + admin */

export function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      aria-hidden
    />
  );
}

export function PublicPageSkeleton({
  variant = "default",
}: {
  variant?: "home" | "default" | "list" | "article";
}) {
  if (variant === "home") {
    return (
      <div className="page-shell" aria-busy="true" aria-label="Loading">
        <div className="h-14 border-b border-border" />
        <main className="page-main">
          <section className="page-container flex flex-1 flex-col justify-center py-10 sm:py-16">
            <SkeletonPulse className="h-3 w-20" />
            <SkeletonPulse className="mt-4 h-9 w-72 max-w-full" />
            <SkeletonPulse className="mt-3 h-16 w-full max-w-md" />
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonPulse key={i} className="h-28 sm:h-36" />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="page-shell" aria-busy="true" aria-label="Loading">
        <div className="h-14 border-b border-border" />
        <main className="page-main">
          <div className="page-container py-10 sm:py-14">
            <SkeletonPulse className="h-3 w-16" />
            <SkeletonPulse className="mt-3 h-8 w-48" />
            <SkeletonPulse className="mt-3 h-12 w-full max-w-md" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonPulse key={i} className="h-24" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (variant === "article") {
    return (
      <div className="page-shell" aria-busy="true" aria-label="Loading">
        <div className="h-14 border-b border-border" />
        <main className="page-main">
          <article className="page-container max-w-3xl py-10 sm:py-14">
            <SkeletonPulse className="h-4 w-20" />
            <SkeletonPulse className="mt-6 h-3 w-12" />
            <SkeletonPulse className="mt-3 h-10 w-full max-w-lg" />
            <SkeletonPulse className="mt-3 h-3 w-28" />
            <div className="mt-10 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonPulse key={i} className="h-4 w-full" />
              ))}
            </div>
          </article>
        </main>
      </div>
    );
  }

  // persona / default
  return (
    <div className="page-shell" aria-busy="true" aria-label="Loading">
      <div className="h-14 border-b border-border" />
      <main className="page-main">
        <section className="border-b border-border">
          <div className="page-container py-10 sm:py-14">
            <div className="mb-5 flex items-center gap-3">
              <SkeletonPulse className="h-11 w-11 rounded-lg" />
              <SkeletonPulse className="h-3 w-32" />
            </div>
            <SkeletonPulse className="h-10 w-full max-w-xl" />
            <SkeletonPulse className="mt-4 h-20 w-full max-w-2xl" />
            <div className="mt-6 flex flex-wrap gap-2">
              <SkeletonPulse className="h-11 w-32" />
              <SkeletonPulse className="h-11 w-28" />
            </div>
          </div>
        </section>
        <section className="border-b border-border">
          <div className="page-container py-10">
            <SkeletonPulse className="mb-4 h-3 w-16" />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonPulse key={i} className="h-24" />
              ))}
            </div>
          </div>
        </section>
        <section className="border-b border-border">
          <div className="page-container py-10">
            <SkeletonPulse className="mb-4 h-3 w-20" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonPulse key={i} className="h-36" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function AdminPageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading admin">
      <div>
        <SkeletonPulse className="h-3 w-20" />
        <SkeletonPulse className="mt-3 h-8 w-48" />
        <SkeletonPulse className="mt-2 h-12 w-full max-w-md" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonPulse key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <div className="max-w-xl space-y-4" aria-busy="true" aria-label="Loading form">
      <SkeletonPulse className="h-4 w-24" />
      <SkeletonPulse className="h-8 w-56" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonPulse className="h-3 w-20" />
          <SkeletonPulse className="h-11 w-full" />
        </div>
      ))}
      <SkeletonPulse className="h-12 w-full sm:w-32" />
    </div>
  );
}
