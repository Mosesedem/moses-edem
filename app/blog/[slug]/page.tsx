import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogContent } from "@/components/blog-content";
import {
  getAllPersonas,
  getPostBySlug,
  getProfile,
} from "@/lib/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 45;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Moses Edem`,
    description: post.excerpt ?? undefined,
  };
}

function readingTimeFromHtml(body: string): number {
  const words = body
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
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

  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];
  const minutes = readingTimeFromHtml(post.body);

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

          <header className="mt-8 border-b border-border pb-8 sm:mt-10 sm:pb-10">
            <p className="section-label">POST</p>
            <h1 className="hero-title mt-3 max-w-2xl">{post.title}</h1>
            {post.excerpt ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted-foreground sm:text-xs">
              {post.publishedAt ? (
                <time dateTime={new Date(post.publishedAt).toISOString()}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              ) : null}
              <span className="text-border">·</span>
              <span>{minutes} min read</span>
              {tags.length > 0 ? (
                <>
                  <span className="text-border">·</span>
                  <span className="line-clamp-1">{tags.join(" · ")}</span>
                </>
              ) : null}
            </div>
          </header>

          {post.coverImage ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border sm:mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8 sm:mt-10">
            <BlogContent body={post.body} />
          </div>

          <footer className="mt-12 border-t border-border pt-8 sm:mt-14">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} strokeWidth={1.75} />
              Back to all posts
            </Link>
          </footer>
        </article>
      </main>
      <SiteFooter profile={profile} lenses={lenses} />
    </div>
  );
}
