import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonaCard } from "@/components/persona-card";
import { defaultSnapshot } from "@/lib/cms-store";
import { getAllPersonas, getProfile, getPublishedPosts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let personas;
  let profile;
  let posts;
  try {
    [personas, profile, posts] = await Promise.all([
      getAllPersonas(),
      getProfile(),
      getPublishedPosts(),
    ]);
  } catch (err) {
    console.error("[home] data load failed, using seed:", err);
    const snap = defaultSnapshot();
    personas = snap.personas.filter((p) => p.isActive !== false);
    profile = snap.profile;
    posts = snap.blogPosts.filter((p) => p.published);
  }

  const lenses = personas.map((p) => ({
    key: p.key,
    label: p.label,
    iconName: p.iconName,
  }));

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        <section className="page-container flex flex-1 flex-col justify-center py-10 sm:py-16 lg:py-20">
          <header className="mb-8 max-w-xl sm:mb-12">
            <p className="section-label"># README</p>
            <h1 className="hero-title mt-3">Who are you here as?</h1>
            <p className="section-lead">
              One person, five audiences. Pick a lens — same Moses Edem,
              different story.
            </p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
              {profile.fullName}
              <span className="mx-1.5 text-border">·</span>
              {profile.location}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="/projects"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Blog
              </Link>
              {posts[0] ? (
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="max-w-full truncate text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Latest: {posts[0].title}
                </Link>
              ) : null}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
      <SiteFooter profile={profile} lenses={lenses} />
    </div>
  );
}
