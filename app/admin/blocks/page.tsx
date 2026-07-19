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
import { deleteBlockAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsSnapshot } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string; deleted?: string }> };

export default async function AdminBlocksPage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved, deleted } = await searchParams;
  const { blocks, personas } = await getCmsSnapshot();
  const labelByKey = Object.fromEntries(
    personas.map((p) => [p.key, p.label])
  );

  const sorted = [...blocks].sort((a, b) => {
    if (a.personaKey !== b.personaKey)
      return a.personaKey.localeCompare(b.personaKey);
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });

  return (
    <div>
      <AdminPageHeader
        kicker="Blocks"
        title="Content blocks"
        description="Per-persona stats, narrative sections, timeline items, and links. Each block belongs to one audience lens."
        action={
          <AdminPrimaryLink href="/admin/blocks/new">New block</AdminPrimaryLink>
        }
      />
      <AdminFlash saved={Boolean(saved)} deleted={Boolean(deleted)} />

      {sorted.length === 0 ? (
        <AdminEmpty
          title="No content blocks"
          description="Add stats and sections for each persona, or load the built-in seed from the dashboard."
          action={
            <AdminPrimaryLink href="/admin/blocks/new">
              Create block
            </AdminPrimaryLink>
          }
        />
      ) : (
        <ul className="mt-8 space-y-2">
          {sorted.map((b) => (
            <AdminRow
              key={b.id}
              title={b.title || "(untitled)"}
              meta={`${labelByKey[b.personaKey] ?? b.personaKey} · ${b.type} · order ${b.sortOrder ?? 0}${
                b.isActive === false ? " · off" : ""
              }`}
              actions={
                <>
                  <AdminEditLink href={`/admin/blocks/${b.id}`} />
                  <form action={deleteBlockAction} className="flex flex-1 sm:flex-none">
                    <input type="hidden" name="id" value={b.id} />
                    <DeleteButton itemLabel={b.title || b.type} />
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
