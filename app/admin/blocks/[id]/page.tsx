import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { saveBlockAction } from "@/lib/admin-actions";
import { getCmsSnapshot } from "@/lib/queries";
import { PERSONA_KEYS } from "@/lib/schema";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminBlockEditPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const isNew = id === "new";
  const { blocks } = await getCmsSnapshot();
  const block = isNew
    ? {
        id: "new",
        personaKey: "visitor",
        type: "text",
        title: "",
        body: "",
        iconName: "Circle",
        href: "",
        metadata: null as Record<string, unknown> | null,
        sortOrder: 0,
        isActive: true,
      }
    : blocks.find((b) => b.id === id);
  if (!block) notFound();

  return (
    <div className="max-w-xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {isNew ? "NEW BLOCK" : "EDIT BLOCK"}
      </p>
      <h1 className="mt-2 text-2xl font-medium">
        {isNew ? "Create content block" : block.title || block.id}
      </h1>
      <form action={saveBlockAction} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={block.id} />
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Persona
          </label>
          <select
            name="personaKey"
            defaultValue={block.personaKey}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {PERSONA_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">Type</label>
          <select
            name="type"
            defaultValue={block.type}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {["stat", "project", "text", "link", "timeline_item", "section"].map(
              (t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              )
            )}
          </select>
        </div>
        {(
          [
            ["title", "Title", block.title ?? ""],
            ["iconName", "Icon name", block.iconName ?? ""],
            ["href", "Href", block.href ?? ""],
            ["sortOrder", "Sort order", String(block.sortOrder ?? 0)],
          ] as const
        ).map(([name, label, value]) => (
          <div key={name}>
            <label className="text-xs font-mono text-muted-foreground">
              {label}
            </label>
            <input
              name={name}
              defaultValue={value}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-mono text-muted-foreground">Body</label>
          <textarea
            name="body"
            rows={5}
            defaultValue={block.body ?? ""}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Metadata (JSON)
          </label>
          <textarea
            name="metadata"
            rows={3}
            defaultValue={
              block.metadata ? JSON.stringify(block.metadata, null, 2) : ""
            }
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={block.isActive !== false}
          />
          Active
        </label>
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Save block
        </button>
      </form>
    </div>
  );
}
