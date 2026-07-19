import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { saveProjectAction } from "@/lib/admin-actions";
import { getAllProjectsAdmin } from "@/lib/queries";
import {
  PERSONA_KEYS,
  type PersonaKey,
  type ProjectLensMap,
} from "@/lib/schema";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminProjectEditPage({
  params,
  searchParams,
}: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const projects = await getAllProjectsAdmin();
  const project = isNew
    ? {
        id: "new",
        slug: "",
        title: "",
        category: "",
        iconName: "Code2",
        href: "",
        tech: [] as string[],
        featured: false,
        sortOrder: 0,
        isActive: true,
        lens: {} as ProjectLensMap,
      }
    : projects.find((p) => p.id === id);
  if (!project) notFound();

  const lens = (project.lens ?? {}) as ProjectLensMap;
  const tech = Array.isArray(project.tech)
    ? (project.tech as string[]).join(", ")
    : "";

  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {isNew ? "NEW PROJECT" : "EDIT PROJECT"}
      </p>
      <h1 className="mt-2 text-2xl font-medium">
        {isNew ? "Add project" : project.title}
      </h1>
      {saved ? (
        <p className="mt-2 font-mono text-xs text-accent">Saved</p>
      ) : null}

      <form action={saveProjectAction} className="mt-8 space-y-6">
        <input type="hidden" name="id" value={project.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="title" label="Title" defaultValue={project.title} required />
          <Field name="slug" label="Slug" defaultValue={project.slug} />
          <Field
            name="category"
            label="Category"
            defaultValue={project.category ?? ""}
          />
          <Field
            name="iconName"
            label="Icon (Lucide)"
            defaultValue={project.iconName ?? "Code2"}
          />
          <Field name="href" label="Live URL" defaultValue={project.href ?? ""} />
          <Field
            name="sortOrder"
            label="Sort order"
            defaultValue={String(project.sortOrder ?? 0)}
          />
        </div>
        <Field name="tech" label="Tech (comma-separated)" defaultValue={tech} />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project.featured === true}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={project.isActive !== false}
          />
          Active
        </label>

        <div className="space-y-6 border-t border-border pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Lens copy
          </p>
          {PERSONA_KEYS.map((key) => (
            <LensFields
              key={key}
              personaKey={key}
              summary={lens[key]?.summary ?? ""}
              body={lens[key]?.body ?? ""}
              metric={lens[key]?.metric ?? ""}
            />
          ))}
        </div>

        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Save project
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  defaultValue: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-mono text-muted-foreground">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}

function LensFields({
  personaKey,
  summary,
  body,
  metric,
}: {
  personaKey: PersonaKey;
  summary: string;
  body: string;
  metric: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-foreground">
        {personaKey}
      </p>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Summary (brief)
          </label>
          <input
            name={`lens_${personaKey}_summary`}
            defaultValue={summary}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Body (sheet detail)
          </label>
          <textarea
            name={`lens_${personaKey}_body`}
            rows={3}
            defaultValue={body}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Metric
          </label>
          <input
            name={`lens_${personaKey}_metric`}
            defaultValue={metric}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
}
