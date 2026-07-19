"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ResponsiveSheet } from "@/components/responsive-sheet";
import { resolveIcon } from "@/lib/icons";
import type { ProjectDTO } from "@/lib/project-dto";
import {
  getProjectLensCopy,
  isPersonaKey,
  type PersonaKey,
  type PortfolioProject,
} from "@/lib/schema";

export type { ProjectDTO } from "@/lib/project-dto";

type ProjectsBrowserProps = {
  projects: ProjectDTO[];
  /** Active audience lens for copy */
  lens: PersonaKey;
  /** Controlled open slug (optional) */
  initialSlug?: string | null;
  /** Compact grid for embedding on persona pages */
  compact?: boolean;
};

function asProject(p: ProjectDTO): PortfolioProject {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    iconName: p.iconName,
    href: p.href,
    tech: p.tech,
    featured: p.featured,
    sortOrder: p.sortOrder,
    isActive: p.isActive,
    lens: p.lens,
  };
}

export function ProjectsBrowser({
  projects,
  lens: initialLens,
  initialSlug = null,
  compact = false,
}: ProjectsBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lensFromUrl = searchParams.get("lens");
  const projectFromUrl = searchParams.get("project");

  const activeLens: PersonaKey =
    lensFromUrl && isPersonaKey(lensFromUrl) ? lensFromUrl : initialLens;

  const openSlug = projectFromUrl ?? initialSlug;
  const openProject = useMemo(
    () => projects.find((p) => p.slug === openSlug) ?? null,
    [projects, openSlug]
  );

  const setParams = useCallback(
    (next: { project?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.project === null) params.delete("project");
      else if (next.project) params.set("project", next.project);
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const open = (slug: string) => setParams({ project: slug });
  const close = () => setParams({ project: null });

  const detail = openProject
    ? getProjectLensCopy(asProject(openProject), activeLens)
    : null;

  return (
    <>
      <div className={compact ? "content-grid lg:grid-cols-2" : "content-grid"}>
        {projects.map((project, index) => {
          const copy = getProjectLensCopy(asProject(project), activeLens);
          const Icon = resolveIcon(project.iconName);
          const num = String(index + 1).padStart(2, "0");
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => open(project.slug)}
              className="card-surface-interactive group flex h-full flex-col p-4 text-left"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 font-mono text-[11px] tabular-nums text-muted-foreground">
                    {num}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                </div>
                {copy.metric ? (
                  <span className="max-w-[40%] text-right font-mono text-[10px] leading-snug text-muted-foreground sm:max-w-none sm:text-xs">
                    {copy.metric}
                  </span>
                ) : null}
              </div>
              <h3 className="text-[0.9rem] font-medium leading-snug tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-muted-foreground line-clamp-2 sm:text-sm">
                {copy.summary}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/70 pt-3">
                <span className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.category ?? "Project"}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-accent">
                  Details
                  <ArrowUpRight size={12} strokeWidth={1.75} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <ResponsiveSheet
        open={Boolean(openProject && detail)}
        onClose={close}
        title="Project"
      >
        {openProject && detail ? (
          <ProjectSheetBody project={openProject} detail={detail} />
        ) : null}
      </ResponsiveSheet>
    </>
  );
}

function ProjectSheetBody({
  project,
  detail,
}: {
  project: ProjectDTO;
  detail: { summary: string; body: string; metric?: string };
}) {
  const Icon = resolveIcon(project.iconName);
  const tech = Array.isArray(project.tech) ? project.tech : [];

  return (
    <div className="space-y-6 safe-pb">
      <div className="flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className="text-xl font-medium leading-snug tracking-tight text-foreground">
            {project.title}
          </h2>
          <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
            {project.category ?? "Project"}
            {detail.metric ? ` · ${detail.metric}` : ""}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="section-label">Summary</p>
        <p className="text-[0.9375rem] font-medium leading-relaxed text-foreground">
          {detail.summary}
        </p>
      </div>

      <div className="space-y-2">
        <p className="section-label">About</p>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {detail.body}
        </p>
      </div>

      {tech.length > 0 ? (
        <div className="space-y-2.5">
          <p className="section-label">Stack</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {project.href ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
          Open live site
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
      ) : null}
    </div>
  );
}
