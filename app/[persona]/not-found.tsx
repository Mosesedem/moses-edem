import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function PersonaNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center px-4 py-24 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-foreground">
          Unknown persona
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          That lens does not exist. Head back to the picker and choose a valid
          audience.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
        >
          Back to picker
        </Link>
      </main>
    </div>
  );
}
