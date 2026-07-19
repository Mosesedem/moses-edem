import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function BlogPostNotFound() {
  return (
    <div className="page-shell">
      <main className="page-main flex flex-1 items-center justify-center px-[var(--page-px)] py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-border">
            <FileQuestion size={22} strokeWidth={1.75} />
          </div>
          <p className="section-label mb-3">404</p>
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Post not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            This article does not exist or is no longer published.
          </p>
          <div className="cta-row mt-8 justify-center">
            <Link href="/blog" className="btn-primary">
              <ArrowLeft size={16} strokeWidth={1.75} />
              Back to blog
            </Link>
            <Link href="/" className="btn-secondary">
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
