import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPersonas, getProfile, getPublishedPosts } from "@/lib/queries";

export const revalidate = 45;

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
    <div className="page-shell">
      <SiteHeader lenses={lenses} />
      <main className="page-main">
        <div className="page-container py-10 sm:py-14 lg:py-16">
          <header className="max-w-xl">
            <p className="section-label">BLOG</p>
            <h1 className="section-title mt-3">Writing</h1>
            <p className="section-lead">
              Notes on shipping backends, products, and building from Uyo.
            </p>
          </header>

          <div className="mt-8 divide-y divide-border border-y border-border sm:mt-10">
            {posts.length === 0 ? (
              <p className="py-10 text-sm text-muted-foreground">
                No posts yet.
              </p>
            ) : (
              posts.map((post) => {
                const tags = Array.isArray(post.tags)
                  ? (post.tags as string[])
                  : [];
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block py-6 transition-colors first:pt-6 last:pb-6 sm:py-7"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                      <div className="min-w-0">
                        <h2 className="text-lg font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-xl">
                          {post.title}
                        </h2>
                        {post.excerpt ? (
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2 sm:text-[0.9375rem]">
                            {post.excerpt}
                          </p>
                        ) : null}
                        {tags.length > 0 ? (
                          <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                            {tags.join(" · ")}
                          </p>
                        ) : null}
                      </div>
                      {post.publishedAt ? (
                        <time className="shrink-0 font-mono text-[11px] text-muted-foreground sm:text-xs">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                      ) : null}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </main>
      <SiteFooter profile={profile} lenses={lenses} />
    </div>
  );
}