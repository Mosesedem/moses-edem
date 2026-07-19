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
    <div className="flex min-h-screen flex-col">
      <SiteHeader lenses={lenses} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Blog
        </Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          POST
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        {post.publishedAt ? (
          <time className="mt-3 block font-mono text-xs text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}

        <article className="mt-10 space-y-5">
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
                      className="text-base leading-relaxed text-muted-foreground"
                    >
                      {renderInline(line)}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {renderInline(para)}
              </p>
            );
          })}
        </article>
      </main>
      <SiteFooter profile={profile} />
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
