import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionCard } from "@/components/section-card";
import { CodePane } from "@/components/code-pane";
import { AiChat } from "@/components/ai-chat";
import { LensSwitcher } from "@/components/lens-switcher";
import { ProjectsBrowser } from "@/components/projects-browser";
import {
  getAllPersonas,
  getPersona,
  getProfile,
  getProjects,
} from "@/lib/queries";
import { toProjectDTO } from "@/lib/project-dto";
import { isPersonaKey, type PersonaKey } from "@/lib/schema";
import { resolveIcon } from "@/lib/icons";

type PageProps = {
  params: Promise<{ persona: string }>;
};

export const dynamic = "force-dynamic";

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

function metaString(metadata: unknown, key: string): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

export default async function PersonaPage({ params }: PageProps) {
  const { persona: key } = await params;
  if (!isPersonaKey(key)) notFound();

  const [data, profile, allPersonas, allProjects] = await Promise.all([
    getPersona(key),
    getProfile(),
    getAllPersonas(),
    getProjects(),
  ]);
  if (!data) notFound();

  const { persona, blocks } = data;
  const Icon = resolveIcon(persona.iconName);
  const lenses = allPersonas.map((p) => ({
    key: p.key,
    label: p.label,
    iconName: p.iconName,
  }));

  const stats = blocks.filter((b) => b.type === "stat");
  const texts = blocks.filter((b) => b.type === "text");
  const timeline = blocks.filter((b) => b.type === "timeline_item");
  const sections = blocks.filter((b) => b.type === "section");
  const links = blocks.filter((b) => b.type === "link");

  // Prefer featured projects on persona pages; fall back to all
  const featured = allProjects.filter((p) => p.featured);
  const personaProjects = (featured.length > 0 ? featured : allProjects).slice(
    0,
    8
  );
  const projectDtos = personaProjects.map(toProjectDTO);

  const firstTech =
    personaProjects[0] && Array.isArray(personaProjects[0].tech)
      ? (personaProjects[0].tech as string[])
      : [];
  const stackSnippet =
    firstTech.length > 0
      ? `// ${personaProjects[0].title}\nconst stack = [\n${firstTech
          .map((t) => `  "${t}",`)
          .join("\n")}\n] as const;\n\nexport type Stack = typeof stack[number];`
      : `// mosesedem.me\nconst focus = [\n  "backend",\n  "apis",\n  "systems",\n] as const;`;

  const experienceSnippet = `// experience.ts\nexport const moses = {\n  role: "Backend Engineer",\n  years: "2+",\n  location: "Uyo, NG",\n  stack: ["Node.js", "PHP", "PostgreSQL", "Redis"],\n  available: true,\n} as const;`;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        showBack
        personaLabel={persona.key}
        lenses={lenses}
        currentKey={persona.key}
      />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="mb-6 flex flex-wrap items-center gap-3">
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
              <Link
                href="#ai-chat"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent"
              >
                Chat with AI Moses
              </Link>
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
                .filter(
                  (l): l is { href: string; icon: typeof Github; label: string } =>
                    Boolean(l.href)
                )
                .map(({ href, icon: SocialIcon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    aria-label={label}
                    className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                  >
                    <SocialIcon size={16} strokeWidth={1.75} />
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* Switch lens */}
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              SWITCH LENS
            </p>
            <LensSwitcher lenses={lenses} currentKey={persona.key} />
          </div>
        </section>

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

        {texts.length > 0 || timeline.length > 0 ? (
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
                  {timeline.length > 0 ? (
                    <div className="space-y-4 pt-2">
                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        EXPERIENCE
                      </p>
                      {timeline.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-lg border border-border p-4 transition-colors hover:border-accent/50"
                        >
                          <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-sm font-medium text-foreground">
                              {item.title}
                            </h3>
                            {metaString(item.metadata, "period") ? (
                              <span className="font-mono text-xs text-muted-foreground">
                                {metaString(item.metadata, "period")}
                              </span>
                            ) : null}
                          </div>
                          {item.body ? (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {item.body}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="space-y-4">
                  <CodePane filename="focus.ts" code={stackSnippet} animate />
                  <CodePane
                    filename="experience.ts"
                    code={experienceSnippet}
                    animate
                    typingMs={10}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

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

        {projectDtos.length > 0 ? (
          <section id="projects" className="border-b border-border">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    PROJECTS
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tap for details — copy is framed for the{" "}
                    <span className="font-mono text-foreground">
                      {persona.key}
                    </span>{" "}
                    lens. Mobile: bottom sheet. Desktop: side sheet.
                  </p>
                </div>
                <Link
                  href={`/projects?lens=${persona.key as PersonaKey}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  View all
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-32 animate-pulse rounded-lg border border-border bg-muted/40"
                      />
                    ))}
                  </div>
                }
              >
                <ProjectsBrowser
                  projects={projectDtos}
                  lens={persona.key as PersonaKey}
                  showLensFilter={false}
                  compact
                />
              </Suspense>
            </div>
          </section>
        ) : null}

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

        <section id="ai-chat" className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              AI CHAT
            </p>
            <h2 className="mb-6 text-xl font-medium tracking-tight text-foreground">
              Talk to AI Moses
            </h2>
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <AiChat persona={persona.key} />
              </div>
              <div className="lg:col-span-2">
                <CodePane
                  filename="chat-agent.ts"
                  code={`// persona-aware agent\nconst lens = "${persona.key}";\n\nexport async function askMoses(q: string) {\n  return chat({\n    persona: lens,\n    message: q,\n  });\n}`}
                  animate
                  typingMs={12}
                />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Responses adapt to the active lens. Switch personas above to
                  change tone — employer, investor, academic, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              MORE
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                Persona picker
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                Blog
                <ArrowRight size={14} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
