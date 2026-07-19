import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPersonas, getProfile, getPublishedPosts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Moses Edem",
  description: "Notes on backends, products, and building from Uyo.",
};

export default async function BlogIndexPage() {
  const [posts, profile, personas] = await Promise.all([
    getPublishedPosts(),
    getProfile(),
    getAllPersonas(),
  ]);
  const lenses = personas.map((p) => ({
    key: p.key,
    label: p.label,
    iconName: p.iconName,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lenses={lenses} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          BLOG
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Writing
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Notes on shipping backends, products, and building from Uyo.
        </p>

        <div className="mt-12 space-y-4">
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            posts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-1 text-lg font-medium text-foreground">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    ) : null}
                    {Array.isArray(post.tags) && post.tags.length > 0 ? (
                      <p className="mt-3 font-mono text-xs text-muted-foreground">
                        {(post.tags as string[]).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  {post.publishedAt ? (
                    <time className="shrink-0 font-mono text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  ) : null}
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
