import { redirect } from "next/navigation";
import {
  AdminField,
  AdminFlash,
  AdminPageHeader,
  AdminSubmit,
} from "@/components/admin/form-controls";
import { saveProfileAction } from "@/lib/admin-actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProfile } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function AdminProfilePage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved } = await searchParams;
  const profile = await getProfile();

  return (
    <div className="max-w-xl">
      <AdminPageHeader
        kicker="Profile"
        title="Site profile"
        description="Footer, contact links, and header identity on the public site read these fields from the CMS."
      />
      <AdminFlash saved={Boolean(saved)} />

      <form action={saveProfileAction} className="mt-8 space-y-4">
        <AdminField
          name="fullName"
          label="Full name"
          defaultValue={profile.fullName}
          required
        />
        <AdminField
          name="location"
          label="Location"
          defaultValue={profile.location ?? ""}
        />
        <AdminField
          name="email"
          label="Email"
          type="email"
          defaultValue={profile.email ?? ""}
        />
        <AdminField
          name="phone"
          label="Phone"
          defaultValue={profile.phone ?? ""}
        />
        <AdminField
          name="githubUrl"
          label="GitHub URL"
          defaultValue={profile.githubUrl ?? ""}
        />
        <AdminField
          name="linkedinUrl"
          label="LinkedIn URL"
          defaultValue={profile.linkedinUrl ?? ""}
        />
        <AdminField
          name="resumeUrl"
          label="Resume URL"
          defaultValue={profile.resumeUrl ?? ""}
          hint="e.g. /cv/moses.pdf"
        />
        <AdminSubmit>Save profile</AdminSubmit>
      </form>
    </div>
  );
}
