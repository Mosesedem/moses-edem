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
import { savePersonaAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsSnapshot } from "@/lib/queries";
import { PERSONA_KEYS } from "@/lib/schema";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminPersonaEditPage({
  params,
  searchParams,
}: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const sp = await searchParams;
  const isNew = id === "new";
  const { personas } = await getCmsSnapshot();
  const usedKeys = new Set(personas.map((p) => p.key));

  const persona = isNew
    ? {
        id: "new",
        key: PERSONA_KEYS.find((k) => !usedKeys.has(k)) ?? "visitor",
        label: "",
        tagline: "",
        heroHeading: "",
        heroBody: "",
        ctaLabel: "",
        ctaHref: "",
        iconName: "User",
        sortOrder: personas.length + 1,
        isActive: true,
      }
    : personas.find((p) => p.id === id);

  if (!persona) notFound();

  const keyOptions = isNew
    ? PERSONA_KEYS.filter((k) => !usedKeys.has(k)).map((k) => ({
        value: k,
        label: k,
      }))
    : [{ value: persona.key, label: persona.key }];

  if (isNew && keyOptions.length === 0) {
    return (
      <div className="max-w-xl">
        <AdminBackLink href="/admin/personas" label="All personas" />
        <AdminPageHeader
          kicker="Personas"
          title="All lens keys are in use"
          description="The site routes only five keys (employer, investor, romantic, academic, visitor). Edit an existing persona instead of creating another."
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <AdminBackLink href="/admin/personas" label="All personas" />
      <AdminPageHeader
        kicker={isNew ? "New persona" : "Edit persona"}
        title={isNew ? "Create audience lens" : persona.label}
        description={
          isNew
            ? "Key is fixed after save and maps to a public URL like /employer."
            : `Public URL: /${persona.key}`
        }
      />
      <AdminFlash
        saved={Boolean(sp.saved)}
        error={sp.error ? decodeURIComponent(sp.error) : null}
      />

      <form action={savePersonaAction} className="mt-8 space-y-4">
        <input type="hidden" name="id" value={persona.id} />
        {isNew ? (
          <AdminSelect
            name="key"
            label="Key (URL segment)"
            defaultValue={persona.key}
            options={keyOptions}
            hint="Must be unique. Only these five keys power public routes."
          />
        ) : (
          <input type="hidden" name="key" value={persona.key} />
        )}
        <AdminField
          name="label"
          label="Label"
          defaultValue={persona.label}
          required
          hint="Shown on the home picker and nav"
        />
        <AdminField
          name="tagline"
          label="Tagline"
          defaultValue={persona.tagline ?? ""}
        />
        <AdminField
          name="heroHeading"
          label="Hero heading"
          defaultValue={persona.heroHeading ?? ""}
        />
        <AdminTextArea
          name="heroBody"
          label="Hero body"
          rows={4}
          defaultValue={persona.heroBody ?? ""}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            name="ctaLabel"
            label="CTA label"
            defaultValue={persona.ctaLabel ?? ""}
          />
          <AdminField
            name="ctaHref"
            label="CTA href"
            defaultValue={persona.ctaHref ?? ""}
            placeholder="/cv/moses.pdf"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            name="iconName"
            label="Icon (Lucide name)"
            defaultValue={persona.iconName}
            hint="e.g. Briefcase, Heart, TrendingUp"
          />
          <AdminField
            name="sortOrder"
            label="Sort order"
            type="number"
            defaultValue={String(persona.sortOrder ?? 0)}
          />
        </div>
        <AdminCheckbox
          name="isActive"
          label="Active on the public site"
          defaultChecked={persona.isActive !== false}
          hint="Inactive personas are hidden from the home picker"
        />
        <AdminSubmit>{isNew ? "Create persona" : "Save persona"}</AdminSubmit>
      </form>
    </div>
  );
}
