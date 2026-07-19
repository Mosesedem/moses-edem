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

          <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              posts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card-surface-interactive block p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-1 text-base font-medium leading-snug tracking-tight text-foreground sm:text-lg">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      ) : null}
                      {Array.isArray(post.tags) && post.tags.length > 0 ? (
                        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                          {(post.tags as string[]).join(" · ")}
                        </p>
                      ) : null}
                    </div>
                    {post.publishedAt ? (
                      <time className="shrink-0 font-mono text-[11px] text-muted-foreground">
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
        </div>
      </main>
      <SiteFooter profile={profile} lenses={lenses} />
    </div>
  );
}
