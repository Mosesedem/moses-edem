import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionCard } from "@/components/section-card";
import { CodePane } from "@/components/code-pane";
import { getPersona, getProfile } from "@/lib/queries";
import { isPersonaKey, PERSONA_KEYS } from "@/lib/schema";
import { resolveIcon } from "@/lib/icons";

type PageProps = {
  params: Promise<{ persona: string }>;
};

export function generateStaticParams() {
  return PERSONA_KEYS.map((persona) => ({ persona }));
}

export async function generateMetadata({ params }: PageProps) {
  const { persona: key } = await params;
  if (!isPersonaKey(key)) return { title: "Not found" };
  const data = await getPersona(key);
  if (!data) return { title: "Not found" };
  return {
    title: `${data.persona.label} — Moses Edem`,
    description: data.persona.tagline ?? data.persona.heroBody ?? undefined,
  };
}

function metaString(
  metadata: unknown,
  key: string
): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

function metaTech(metadata: unknown): string[] {
  if (!metadata || typeof metadata !== "object") return [];
  const tech = (metadata as Record<string, unknown>).tech;
  return Array.isArray(tech) ? tech.filter((t): t is string => typeof t === "string") : [];
}

export default async function PersonaPage({ params }: PageProps) {
  const { persona: key } = await params;
  if (!isPersonaKey(key)) notFound();

  const [data, profile] = await Promise.all([getPersona(key), getProfile()]);
  if (!data) notFound();

  const { persona, blocks } = data;
  const Icon = resolveIcon(persona.iconName);

  const stats = blocks.filter((b) => b.type === "stat");
  const texts = blocks.filter((b) => b.type === "text");
  const sections = blocks.filter((b) => b.type === "section");
  const projects = blocks.filter((b) => b.type === "project");
  const links = blocks.filter((b) => b.type === "link");

  const firstProjectTech = projects.length > 0 ? metaTech(projects[0].metadata) : [];
  const stackSnippet =
    firstProjectTech.length > 0
      ? `// ${projects[0].title ?? "stack"}\nconst stack = [\n${firstProjectTech.map((t) => `  "${t}",`).join("\n")}\n] as const;`
      : `// mosesedem.me\nconst focus = [\n  "backend",\n  "apis",\n  "systems",\n] as const;`;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showBack personaLabel={persona.key} />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {persona.label}
              </p>
            </div>

            <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {persona.heroHeading}
            </h1>
            {persona.heroBody ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {persona.heroBody}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={1.75} />
                  {profile.location}
                </span>
              ) : null}
              <span className="font-mono text-xs">Available for projects</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {persona.ctaLabel && persona.ctaHref ? (
                <a
                  href={persona.ctaHref}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  {persona.ctaLabel}
                  <ArrowRight size={16} strokeWidth={1.75} />
                </a>
              ) : null}
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent"
                >
                  <Mail size={16} strokeWidth={1.75} />
                  Contact
                </a>
              ) : null}
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent"
                >
                  <FileText size={16} strokeWidth={1.75} />
                  Resume
                </a>
              ) : null}
            </div>

            <div className="mt-6 flex gap-2">
              {[
                { href: profile.githubUrl, icon: Github, label: "GitHub" },
                { href: profile.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
                {
                  href: profile.email ? `mailto:${profile.email}` : null,
                  icon: Mail,
                  label: "Email",
                },
              ]
                .filter((l): l is { href: string; icon: typeof Github; label: string } =>
                  Boolean(l.href)
                )
                .map(({ href, icon: SocialIcon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                  >
                    <SocialIcon size={16} strokeWidth={1.75} />
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        {stats.length > 0 ? (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                STATS
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((block, i) => (
                  <SectionCard
                    key={block.id}
                    title={block.title}
                    body={block.body}
                    iconName={block.iconName}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* About text */}
        {texts.length > 0 ? (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                ABOUT
              </p>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  {texts.map((block) => (
                    <div key={block.id}>
                      {block.title ? (
                        <h2 className="mb-2 text-lg font-medium tracking-tight text-foreground">
                          {block.title}
                        </h2>
                      ) : null}
                      {block.body ? (
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {block.body}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
                <CodePane filename="focus.ts" code={stackSnippet} />
              </div>
            </div>
          </section>
        ) : null}

        {/* Sections / skills */}
        {sections.length > 0 ? (
          <section id="blocks" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                FOCUS
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((block, i) => (
                  <SectionCard
                    key={block.id}
                    title={block.title}
                    body={block.body}
                    iconName={block.iconName}
                    index={i}
                    metric={metaString(block.metadata, "metric")}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Projects */}
        {projects.length > 0 ? (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                PROJECTS
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {projects.map((block, i) => {
                  const tech = metaTech(block.metadata);
                  return (
                    <SectionCard
                      key={block.id}
                      title={block.title}
                      body={block.body}
                      iconName={block.iconName}
                      href={block.href}
                      index={i}
                      metric={
                        metaString(block.metadata, "metric") ??
                        metaString(block.metadata, "status")
                      }
                      metaLine={tech.length > 0 ? tech.join(" · ") : null}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* Links */}
        {links.length > 0 ? (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                RESOURCES
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((block, i) => (
                  <SectionCard
                    key={block.id}
                    title={block.title}
                    body={block.body}
                    iconName={block.iconName}
                    href={block.href}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Switch persona */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              SWITCH LENS
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              Back to persona picker
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
