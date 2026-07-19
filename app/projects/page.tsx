import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectsBrowser } from "@/components/projects-browser";
import {
  getAllPersonas,
  getProfile,
  getProjects,
} from "@/lib/queries";
import { toProjectDTO } from "@/lib/project-dto";
import { isPersonaKey, type PersonaKey } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Moses Edem",
  description:
    "Portfolio of products and systems Moses Edem has built — view details by audience lens.",
};

type Props = {
  searchParams: Promise<{ lens?: string; project?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const lens: PersonaKey =
    sp.lens && isPersonaKey(sp.lens) ? sp.lens : "visitor";

  const [projects, profile, personas] = await Promise.all([
    getProjects(),
    getProfile(),
    getAllPersonas(),
  ]);

  const lenses = personas.map((p) => ({
    key: p.key,
    label: p.label,
    iconName: p.iconName,
  }));

  const dtos = projects.map(toProjectDTO);

  return (
    <div className="page-shell">
      <SiteHeader lenses={lenses} currentKey={lens} />
      <main className="page-main">
        <div className="page-container py-10 sm:py-14 lg:py-16">
          <header className="max-w-xl">
            <p className="section-label">PROJECTS</p>
            <h1 className="section-title mt-3">Work that shipped</h1>
            <p className="section-lead">
              Tap a project for a brief and detail. Mobile: bottom sheet.
              Desktop: side panel. Change lens from the header or footer.
            </p>
          </header>

          <div className="mt-8 sm:mt-10">
            <Suspense
              fallback={
                <div className="content-grid">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-36 animate-pulse rounded-[var(--radius)] border border-border bg-muted/40"
                    />
                  ))}
                </div>
              }
            >
              <ProjectsBrowser
                projects={dtos}
                lens={lens}
                initialSlug={sp.project ?? null}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter profile={profile} lenses={lenses} currentKey={lens} />
    </div>
  );
}
