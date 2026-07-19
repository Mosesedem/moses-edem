import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonaCard } from "@/components/persona-card";
import { getAllPersonas, getProfile, getPublishedPosts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [personas, profile, posts] = await Promise.all([
    getAllPersonas(),
    getProfile(),
    getPublishedPosts(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
          <div className="mb-12 max-w-2xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              # README
            </p>
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Who are you here as?
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              One person, five audiences. Pick a lens and this profile reshapes
              around it — same Moses Edem, different story. Switch anytime from
              the header.
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {profile.fullName} · {profile.location}
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-sm">
              <Link
                href="/projects"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                All projects
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Read the blog
              </Link>
              {posts[0] ? (
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Latest: {posts[0].title}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((persona, index) => (
              <PersonaCard
                key={persona.id}
                href={`/${persona.key}`}
                label={persona.label}
                tagline={persona.tagline}
                iconName={persona.iconName}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
