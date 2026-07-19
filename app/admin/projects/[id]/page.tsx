import { notFound, redirect } from "next/navigation";
import {
  AdminBackLink,
  AdminCheckbox,
  AdminField,
  AdminFlash,
  AdminPageHeader,
  AdminSubmit,
  AdminTextArea,
} from "@/components/admin/form-controls";
import { saveProjectAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllProjectsAdmin, getCmsSnapshot } from "@/lib/queries";
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
  const [projects, { personas }] = await Promise.all([
    getAllProjectsAdmin(),
    getCmsSnapshot(),
  ]);

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

  const personaLabel = (key: string) =>
    personas.find((p) => p.key === key)?.label ?? key;

  return (
    <div className="max-w-2xl">
      <AdminBackLink href="/admin/projects" label="All projects" />
      <AdminPageHeader
        kicker={isNew ? "New project" : "Edit project"}
        title={isNew ? "Add project" : project.title}
        description="Lens copy is what visitors see when they open this project under each audience. Leave a lens blank to fall back to visitor / first available copy."
      />
      <AdminFlash saved={Boolean(saved)} />

      <form action={saveProjectAction} className="mt-8 space-y-6">
        <input type="hidden" name="id" value={project.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            name="title"
            label="Title"
            defaultValue={project.title}
            required
          />
          <AdminField
            name="slug"
            label="Slug"
            defaultValue={project.slug}
            hint="URL: /projects?project=slug"
          />
          <AdminField
            name="category"
            label="Category"
            defaultValue={project.category ?? ""}
          />
          <AdminField
            name="iconName"
            label="Icon (Lucide)"
            defaultValue={project.iconName ?? "Code2"}
          />
          <AdminField
            name="href"
            label="Live URL"
            defaultValue={project.href ?? ""}
          />
          <AdminField
            name="sortOrder"
            label="Sort order"
            type="number"
            defaultValue={String(project.sortOrder ?? 0)}
          />
        </div>
        <AdminField
          name="tech"
          label="Tech (comma-separated)"
          defaultValue={tech}
        />
        <AdminCheckbox
          name="featured"
          label="Featured on persona pages"
          defaultChecked={project.featured === true}
        />
        <AdminCheckbox
          name="isActive"
          label="Active on the public site"
          defaultChecked={project.isActive !== false}
        />

        <div className="space-y-4 border-t border-border pt-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Lens copy
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              One section per audience. Data comes from the CMS, not hardcoded
              components.
            </p>
          </div>
          {PERSONA_KEYS.map((key) => (
            <div key={key} className="rounded-lg border border-border p-4">
              <p className="mb-3 text-sm font-medium text-foreground">
                {personaLabel(key)}
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  {key}
                </span>
              </p>
              <div className="space-y-3">
                <AdminField
                  name={`lens_${key}_summary`}
                  label="Summary (card)"
                  defaultValue={lens[key as PersonaKey]?.summary ?? ""}
                />
                <AdminTextArea
                  name={`lens_${key}_body`}
                  label="Body (detail sheet)"
                  rows={3}
                  defaultValue={lens[key as PersonaKey]?.body ?? ""}
                />
                <AdminField
                  name={`lens_${key}_metric`}
                  label="Metric"
                  defaultValue={lens[key as PersonaKey]?.metric ?? ""}
                />
              </div>
            </div>
          ))}
        </div>

        <AdminSubmit>{isNew ? "Create project" : "Save project"}</AdminSubmit>
      </form>
    </div>
  );
}
