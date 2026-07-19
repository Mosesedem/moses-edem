"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ResponsiveSheet } from "@/components/responsive-sheet";
import { resolveIcon } from "@/lib/icons";
import {
  getProjectLensCopy,
  isPersonaKey,
  type PersonaKey,
  type PortfolioProject,
} from "@/lib/schema";
import type { ProjectDTO } from "@/lib/project-dto";

export type { ProjectDTO } from "@/lib/project-dto";

type ProjectsBrowserProps = {
  projects: ProjectDTO[];
  /** Active audience lens for copy */
  lens: PersonaKey;
  /** Show lens filter chips */
  showLensFilter?: boolean;
  /** Controlled open slug (optional) */
  initialSlug?: string | null;
  /** Compact grid for embedding on persona pages */
  compact?: boolean;
};

const LENS_LABELS: Record<PersonaKey, string> = {
  employer: "Employer",
  investor: "Investor",
  romantic: "Romantic",
  academic: "Academic",
  visitor: "Visitor",
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
  showLensFilter = true,
  initialSlug = null,
  compact = false,
}: ProjectsBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lensFromUrl = searchParams.get("lens");
  const projectFromUrl = searchParams.get("project");

  const lens: PersonaKey =
    lensFromUrl && isPersonaKey(lensFromUrl) ? lensFromUrl : initialLens;

  const openSlug = projectFromUrl ?? initialSlug;
  const openProject = useMemo(
    () => projects.find((p) => p.slug === openSlug) ?? null,
    [projects, openSlug]
  );

  const [localLens, setLocalLens] = useState<PersonaKey>(lens);
  const activeLens = showLensFilter ? lens : localLens;

  const setParams = useCallback(
    (next: { project?: string | null; lens?: PersonaKey }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.project === null) params.delete("project");
      else if (next.project) params.set("project", next.project);
      if (next.lens) params.set("lens", next.lens);
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const open = (slug: string) => {
    setParams({ project: slug, lens: activeLens });
  };

  const close = () => {
    setParams({ project: null });
  };

  const switchLens = (key: PersonaKey) => {
    if (showLensFilter) {
      setParams({ lens: key, project: openSlug ?? undefined });
    } else {
      setLocalLens(key);
    }
  };

  const detail = openProject
    ? getProjectLensCopy(asProject(openProject), activeLens)
    : null;

  return (
    <>
      {showLensFilter ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {(Object.keys(LENS_LABELS) as PersonaKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => switchLens(key)}
              className={`rounded-md border px-3 py-1.5 text-xs font-mono transition-colors ${
                activeLens === key
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-accent"
              }`}
            >
              {LENS_LABELS[key]}
            </button>
          ))}
        </div>
      ) : null}

      <div
        className={
          compact
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {projects.map((project, index) => {
          const copy = getProjectLensCopy(asProject(project), activeLens);
          const Icon = resolveIcon(project.iconName);
          const num = String(index + 1).padStart(2, "0");
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => open(project.slug)}
              className="group flex flex-col rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-accent"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {num}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-border text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                </div>
                {copy.metric ? (
                  <span className="font-mono text-xs text-muted-foreground">
                    {copy.metric}
                  </span>
                ) : null}
              </div>
              <h3 className="text-sm font-medium tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {copy.summary}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.category ?? "Project"}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-accent">
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
          <ProjectSheetBody
            project={openProject}
            detail={detail}
            lens={activeLens}
            onLensChange={switchLens}
          />
        ) : null}
      </ResponsiveSheet>
    </>
  );
}

function ProjectSheetBody({
  project,
  detail,
  lens,
  onLensChange,
}: {
  project: ProjectDTO;
  detail: { summary: string; body: string; metric?: string };
  lens: PersonaKey;
  onLensChange: (k: PersonaKey) => void;
}) {
  const Icon = resolveIcon(project.iconName);
  const tech = Array.isArray(project.tech) ? project.tech : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border">
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-medium tracking-tight text-foreground">
            {project.title}
          </h2>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {project.category ?? "Project"}
            {detail.metric ? ` · ${detail.metric}` : ""}
          </p>
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          View as
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(LENS_LABELS) as PersonaKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onLensChange(key)}
              className={`rounded border px-2 py-1 text-[11px] font-mono transition-colors ${
                lens === key
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent"
              }`}
            >
              {LENS_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Summary
        </p>
        <p className="text-sm font-medium leading-relaxed text-foreground">
          {detail.summary}
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {detail.body}
        </p>
      </div>

      {tech.length > 0 ? (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Open live site
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
      ) : null}

      <p className="font-mono text-[10px] text-muted-foreground">
        Lens copy changes with audience. Live link is optional context, not the
        only way to learn about the work.
      </p>
    </div>
  );
}
