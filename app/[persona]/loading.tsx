export default function PersonaLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="mx-auto h-14 max-w-5xl" />
      </div>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-16 sm:px-6">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-10 w-3/4 max-w-xl animate-pulse rounded bg-muted" />
        <div className="h-20 w-full max-w-2xl animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-28 animate-pulse rounded-lg border border-border bg-muted/50" />
          <div className="h-28 animate-pulse rounded-lg border border-border bg-muted/50" />
          <div className="h-28 animate-pulse rounded-lg border border-border bg-muted/50" />
        </div>
      </div>
    </div>
  );
}
