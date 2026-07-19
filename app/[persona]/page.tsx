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

export const revalidate = 45;

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
          .join("\n")}\n] as const;`
      : `// mosesedem.me\nconst focus = [\n  "backend",\n  "apis",\n  "systems",\n] as const;`;

  const experienceSnippet = `// experience.ts\nexport const moses = {\n  role: "Backend Engineer",\n  years: "2+",\n  location: "Uyo, NG",\n  available: true,\n} as const;`;

  return (
    <div className="page-shell">
      <SiteHeader
        showBack
        personaLabel={persona.key}
        lenses={lenses}
        currentKey={persona.key}
      />
      <main className="page-main">
        {/* Hero */}
        <section className="section-block">
          <div className="section-inner !pb-10 sm:!pb-14">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p className="section-label min-w-0 truncate">{persona.label}</p>
            </div>

            <h1 className="hero-title max-w-3xl">{persona.heroHeading}</h1>
            {persona.heroBody ? (
              <p className="section-lead max-w-2xl sm:text-lg">
                {persona.heroBody}
              </p>
            ) : null}

            <div className="meta-row mt-6">
              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={1.75} className="shrink-0" />
                  <span className="text-[0.875rem]">{profile.location}</span>
                </span>
              ) : null}
              <span className="font-mono text-[11px] text-muted-foreground">
                Available for projects
              </span>
            </div>

            <div className="cta-row mt-7">
              {persona.ctaLabel && persona.ctaHref ? (
                <a href={persona.ctaHref} className="btn-primary">
                  {persona.ctaLabel}
                  <ArrowRight size={16} strokeWidth={1.75} />
                </a>
              ) : null}
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className="btn-secondary">
                  <Mail size={16} strokeWidth={1.75} />
                  Contact
                </a>
              ) : null}
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} className="btn-secondary">
                  <FileText size={16} strokeWidth={1.75} />
                  Resume
                </a>
              ) : null}
              <Link href="#ai-chat" className="btn-secondary">
                AI Chat
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
                    className="btn-icon"
                  >
                    <SocialIcon size={16} strokeWidth={1.75} />
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* Stats — always 3-up, balanced */}
        {stats.length > 0 ? (
          <section className="section-block">
            <div className="section-inner">
              <p className="section-label mb-4">STATS</p>
              <div className="stat-grid">
                {stats.slice(0, 3).map((block) => (
                  <div key={block.id} className="stat-cell">
                    <p className="stat-value">{block.title}</p>
                    <p className="stat-label">{block.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* About */}
        {texts.length > 0 || timeline.length > 0 ? (
          <section className="section-block">
            <div className="section-inner">
              <p className="section-label mb-5">ABOUT</p>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-6">
                  {texts.map((block) => (
                    <div key={block.id}>
                      {block.title ? (
                        <h2 className="mb-2 text-lg font-medium tracking-tight text-foreground">
                          {block.title}
                        </h2>
                      ) : null}
                      {block.body ? (
                        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                          {block.body}
                        </p>
                      ) : null}
                    </div>
                  ))}
                  {timeline.length > 0 ? (
                    <div className="space-y-3 pt-1">
                      <p className="section-label">EXPERIENCE</p>
                      {timeline.map((item) => (
                        <div key={item.id} className="card-surface p-4">
                          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            <h3 className="text-sm font-medium leading-snug text-foreground">
                              {item.title}
                            </h3>
                            {metaString(item.metadata, "period") ? (
                              <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                                {metaString(item.metadata, "period")}
                              </span>
                            ) : null}
                          </div>
                          {item.body ? (
                            <p className="text-[0.8125rem] leading-relaxed text-muted-foreground sm:text-sm">
                              {item.body}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="space-y-3">
                  <CodePane filename="focus.ts" code={stackSnippet} animate />
                  <div className="hidden sm:block">
                    <CodePane
                      filename="experience.ts"
                      code={experienceSnippet}
                      animate
                      typingMs={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Focus */}
        {sections.length > 0 ? (
          <section id="blocks" className="section-block">
            <div className="section-inner">
              <p className="section-label mb-5">FOCUS</p>
              <div className="content-grid">
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
        {projectDtos.length > 0 ? (
          <section id="projects" className="section-block">
            <div className="section-inner">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="section-label">PROJECTS</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Tap for details
                  </p>
                </div>
                <Link
                  href={`/projects?lens=${persona.key as PersonaKey}`}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  View all
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
              <Suspense
                fallback={
                  <div className="content-grid">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-36 animate-pulse rounded-[var(--radius)] border border-border bg-muted/40"
                      />
                    ))}
                  </div>
                }
              >
                <ProjectsBrowser
                  projects={projectDtos}
                  lens={persona.key as PersonaKey}
                  compact
                />
              </Suspense>
            </div>
          </section>
        ) : null}

        {/* Resources */}
        {links.length > 0 ? (
          <section className="section-block">
            <div className="section-inner">
              <p className="section-label mb-5">RESOURCES</p>
              <div className="content-grid">
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

        {/* AI Chat */}
        <section id="ai-chat" className="section-block">
          <div className="section-inner">
            <p className="section-label">AI CHAT</p>
            <h2 className="mt-2 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              Talk to AI Moses
            </h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-5 lg:gap-6">
              <div className="lg:col-span-3">
                <AiChat persona={persona.key} />
              </div>
              <div className="hidden lg:col-span-2 lg:block">
                <CodePane
                  filename="chat-agent.ts"
                  code={`// persona-aware agent\nconst lens = "${persona.key}";\n\nexport async function askMoses(q: string) {\n  return chat({ persona: lens, message: q });\n}`}
                  animate
                  typingMs={12}
                />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Responses follow the active lens from the header or footer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter
        profile={profile}
        lenses={lenses}
        currentKey={persona.key}
      />
    </div>
  );
}
