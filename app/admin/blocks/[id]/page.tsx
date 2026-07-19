import { notFound, redirect } from "next/navigation";
import {
  AdminBackLink,
  AdminCheckbox,
  AdminField,
  AdminFlash,
  AdminPageHeader,
  AdminSelect,
  AdminSubmit,
  AdminTextArea,
} from "@/components/admin/form-controls";
import { saveBlockAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsSnapshot } from "@/lib/queries";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

const BLOCK_TYPES = [
  { value: "stat", label: "stat — number + short label" },
  { value: "text", label: "text — long form body" },
  { value: "timeline_item", label: "timeline_item — experience step" },
  { value: "section", label: "section — titled group" },
  { value: "link", label: "link — resource with href" },
  { value: "project", label: "project — legacy project card" },
];

export default async function AdminBlockEditPage({
  params,
  searchParams,
}: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const { blocks, personas } = await getCmsSnapshot();

  const personaOptions =
    personas.length > 0
      ? [...personas]
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((p) => ({
            value: p.key,
            label: `${p.label} (${p.key})`,
          }))
      : [
          { value: "employer", label: "employer" },
          { value: "investor", label: "investor" },
          { value: "romantic", label: "romantic" },
          { value: "academic", label: "academic" },
          { value: "visitor", label: "visitor" },
        ];

  const block = isNew
    ? {
        id: "new",
        personaKey: personaOptions[0]?.value ?? "visitor",
        type: "text",
        title: "",
        body: "",
        iconName: "",
        href: "",
        metadata: null as Record<string, unknown> | null,
        sortOrder: 0,
        isActive: true,
      }
    : blocks.find((b) => b.id === id);
  if (!block) notFound();

  return (
    <div className="max-w-xl">
      <AdminBackLink href="/admin/blocks" label="All blocks" />
      <AdminPageHeader
        kicker={isNew ? "New block" : "Edit block"}
        title={isNew ? "Create content block" : block.title || block.id}
        description="Blocks render on the matching persona page. Prefer loading titles and body from here rather than hardcoding copy in components."
      />
      <AdminFlash saved={Boolean(saved)} />

      <form action={saveBlockAction} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={block.id} />
        <AdminSelect
          name="personaKey"
          label="Persona (audience lens)"
          defaultValue={block.personaKey}
          options={personaOptions}
        />
        <AdminSelect
          name="type"
          label="Type"
          defaultValue={block.type}
          options={BLOCK_TYPES}
        />
        <AdminField name="title" label="Title" defaultValue={block.title ?? ""} />
        <AdminTextArea
          name="body"
          label="Body"
          rows={5}
          defaultValue={block.body ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            name="iconName"
            label="Icon name"
            defaultValue={block.iconName ?? ""}
            hint="Lucide name, optional"
          />
          <AdminField
            name="sortOrder"
            label="Sort order"
            type="number"
            defaultValue={String(block.sortOrder ?? 0)}
          />
        </div>
        <AdminField
          name="href"
          label="Href"
          defaultValue={block.href ?? ""}
          hint="Used for link-type blocks"
        />
        <AdminTextArea
          name="metadata"
          label="Metadata (JSON)"
          rows={3}
          mono
          defaultValue={
            block.metadata ? JSON.stringify(block.metadata, null, 2) : ""
          }
          hint='Optional. Example: { "tech": ["Node.js"], "metric": "2K+" }'
        />
        <AdminCheckbox
          name="isActive"
          label="Active"
          defaultChecked={block.isActive !== false}
        />
        <AdminSubmit>{isNew ? "Create block" : "Save block"}</AdminSubmit>
      </form>
    </div>
  );
}
