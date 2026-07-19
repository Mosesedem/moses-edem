export default function ContactLoading() {
  return (
    <div className="page-shell">
      <div className="h-14 border-b border-border" />
      <main className="page-main">
        <div className="page-container py-10 sm:py-14">
          <div className="mb-3 h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="mb-4 h-10 w-48 animate-pulse rounded bg-muted sm:w-64" />
          <div className="mb-10 h-4 max-w-md animate-pulse rounded bg-muted" />
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-2 lg:col-span-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-[var(--radius)] border border-border bg-muted/40"
                />
              ))}
            </div>
            <div className="h-96 animate-pulse rounded-[var(--radius)] border border-border bg-muted/40 lg:col-span-3" />
          </div>
        </div>
      </main>
    </div>
  );
}
