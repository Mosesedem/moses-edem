import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  AdminEmpty,
  AdminFlash,
  AdminPageHeader,
  AdminPrimaryLink,
  AdminRow,
  AdminEditLink,
} from "@/components/admin/form-controls";
import { deletePersonaAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsSnapshot } from "@/lib/queries";

type Props = {
  searchParams: Promise<{ deleted?: string; error?: string }>;
};

export default async function AdminPersonasPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const sp = await searchParams;
  const { personas } = await getCmsSnapshot();
  const sorted = [...personas].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );

  return (
    <div>
      <AdminPageHeader
        kicker="Personas"
        title="Audience lenses"
        description="These drive /employer, /investor, and the other lens routes. Labels, heroes, and CTAs are stored in the CMS — not hardcoded on the site."
        action={
          <AdminPrimaryLink href="/admin/personas/new">
            New persona
          </AdminPrimaryLink>
        }
      />
      <AdminFlash
        deleted={Boolean(sp.deleted)}
        error={sp.error ? decodeURIComponent(sp.error) : null}
      />

      {sorted.length === 0 ? (
        <AdminEmpty
          title="No personas yet"
          description="Load built-in seed from the dashboard, or create a lens (key must be employer, investor, romantic, academic, or visitor)."
          action={
            <AdminPrimaryLink href="/admin/personas/new">
              Create persona
            </AdminPrimaryLink>
          }
        />
      ) : (
        <ul className="mt-8 space-y-2">
          {sorted.map((p) => (
            <AdminRow
              key={p.id}
              title={p.label}
              meta={`/${p.key} · icon ${p.iconName} · ${
                p.isActive !== false ? "active" : "hidden"
              }`}
              actions={
                <>
                  <AdminEditLink href={`/admin/personas/${p.id}`} />
                  <form action={deletePersonaAction} className="flex flex-1 sm:flex-none">
                    <input type="hidden" name="id" value={p.id} />
                    <DeleteButton itemLabel={p.label} />
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
