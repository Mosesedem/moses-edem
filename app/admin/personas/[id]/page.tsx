import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { savePersonaAction } from "@/lib/admin-actions";
import { getCmsSnapshot } from "@/lib/queries";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminPersonaEditPage({
  params,
  searchParams,
}: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const { saved } = await searchParams;
  const { personas } = await getCmsSnapshot();
  const persona = personas.find((p) => p.id === id);
  if (!persona) notFound();

  return (
    <div className="max-w-xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        EDIT PERSONA
      </p>
      <h1 className="mt-2 text-2xl font-medium">{persona.label}</h1>
      {saved ? (
        <p className="mt-2 font-mono text-xs text-accent">Saved</p>
      ) : null}
      <form action={savePersonaAction} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={persona.id} />
        {(
          [
            ["label", "Label", persona.label],
            ["tagline", "Tagline", persona.tagline ?? ""],
            ["heroHeading", "Hero heading", persona.heroHeading ?? ""],
            ["ctaLabel", "CTA label", persona.ctaLabel ?? ""],
            ["ctaHref", "CTA href", persona.ctaHref ?? ""],
            ["iconName", "Icon (Lucide name)", persona.iconName],
            ["sortOrder", "Sort order", String(persona.sortOrder ?? 0)],
          ] as const
        ).map(([name, label, value]) => (
          <Field key={name} name={name} label={label} defaultValue={value} />
        ))}
        <div>
          <label className="text-xs font-mono text-muted-foreground">
            Hero body
          </label>
          <textarea
            name="heroBody"
            rows={4}
            defaultValue={persona.heroBody ?? ""}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={persona.isActive !== false}
          />
          Active
        </label>
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Save persona
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-mono text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
