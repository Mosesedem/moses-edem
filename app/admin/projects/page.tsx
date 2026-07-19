import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  AdminEmpty,
  AdminEditLink,
  AdminFlash,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRow,
} from "@/components/admin/form-controls";
import { deleteProjectAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllProjectsAdmin } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminProjectsPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved, deleted } = await searchParams;
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <AdminPageHeader
        kicker="Projects"
        title="Portfolio projects"
        description="Canonical project records. Per-lens summary, body, and metric power the public project sheet — edit those fields on each project."
        action={
          <AdminPrimaryLink href="/admin/projects/new">
            New project
          </AdminPrimaryLink>
        }
      />
      <AdminFlash saved={Boolean(saved)} deleted={Boolean(deleted)} />

      {projects.length === 0 ? (
        <AdminEmpty
          title="No projects"
          description="Add portfolio work here, or load the built-in seed from the dashboard."
          action={
            <AdminPrimaryLink href="/admin/projects/new">
              Create project
            </AdminPrimaryLink>
          }
        />
      ) : (
        <ul className="mt-8 space-y-2">
          {projects.map((p) => (
            <AdminRow
              key={p.id}
              title={p.title}
              meta={`slug ${p.slug} · ${p.category ?? "—"} · ${
                p.featured ? "featured · " : ""
              }${p.isActive !== false ? "active" : "off"}`}
              actions={
                <>
                  <AdminEditLink href={`/admin/projects/${p.id}`} />
                  <form action={deleteProjectAction} className="flex flex-1 sm:flex-none">
                    <input type="hidden" name="id" value={p.id} />
                    <DeleteButton itemLabel={p.title} />
                  </form>
                </>
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
