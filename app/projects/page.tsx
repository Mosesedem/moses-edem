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
    <div className="flex min-h-screen flex-col">
      <SiteHeader lenses={lenses} currentKey={lens} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          PROJECTS
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Work that shipped
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Tap a project for a short brief and lens-specific detail. Mobile opens
          a bottom sheet; desktop opens a side panel. Switch the audience lens
          to see how the same product is framed.
        </p>

        <div className="mt-10">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-36 animate-pulse rounded-lg border border-border bg-muted/40"
                  />
                ))}
              </div>
            }
          >
            <ProjectsBrowser
              projects={dtos}
              lens={lens}
              showLensFilter
              initialSlug={sp.project ?? null}
            />
          </Suspense>
        </div>
      </main>
      <SiteFooter profile={profile} />
    </div>
  );
}
