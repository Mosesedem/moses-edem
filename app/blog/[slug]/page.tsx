import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  getAllPersonas,
  getPostBySlug,
  getProfile,
} from "@/lib/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Moses Edem`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, profile, personas] = await Promise.all([
    getPostBySlug(slug),
    getProfile(),
    getAllPersonas(),
  ]);
  if (!post) notFound();

  const lenses = personas.map((p) => ({
    key: p.key,
    label: p.label,
    iconName: p.iconName,
  }));

  const paragraphs = post.body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="page-shell">
      <SiteHeader lenses={lenses} />
      <main className="page-main">
        <article className="page-container max-w-3xl py-10 sm:py-14 lg:py-16">
          <Link
            href="/blog"
            className="inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            Blog
          </Link>
          <p className="section-label mt-8">POST</p>
          <h1 className="hero-title mt-3">{post.title}</h1>
          {post.publishedAt ? (
            <time className="mt-3 block font-mono text-[11px] text-muted-foreground sm:text-xs">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          ) : null}

          <div className="mt-8 space-y-5 sm:mt-10">
            {paragraphs.map((para, i) => {
              if (/^#{1,3}\s/.test(para.trim())) {
                const text = para.replace(/^#{1,3}\s+/, "");
                return (
                  <h2
                    key={i}
                    className="pt-2 text-lg font-medium tracking-tight text-foreground"
                  >
                    {text}
                  </h2>
                );
              }
              if (/^\d+\.\s/.test(para.trim()) || para.includes("\n")) {
                const lines = para.split("\n");
                return (
                  <div key={i} className="space-y-2">
                    {lines.map((line, j) => (
                      <p
                        key={j}
                        className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base"
                      >
                        {renderInline(line)}
                      </p>
                    ))}
                  </div>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base"
                >
                  {renderInline(para)}
                </p>
              );
            })}
          </div>
        </article>
      </main>
      <SiteFooter profile={profile} lenses={lenses} />
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-xs text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
