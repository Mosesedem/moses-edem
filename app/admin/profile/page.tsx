import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { saveProfileAction } from "@/lib/admin-actions";
import { getProfile } from "@/lib/queries";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function AdminProfilePage({ searchParams }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { saved } = await searchParams;
  const profile = await getProfile();

  return (
    <div className="max-w-xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        PROFILE
      </p>
      <h1 className="mt-2 text-2xl font-medium">Site profile</h1>
      {saved ? (
        <p className="mt-2 font-mono text-xs text-accent">Saved</p>
      ) : null}
      <form action={saveProfileAction} className="mt-8 space-y-4">
        {(
          [
            ["fullName", "Full name", profile.fullName],
            ["location", "Location", profile.location ?? ""],
            ["email", "Email", profile.email ?? ""],
            ["phone", "Phone", profile.phone ?? ""],
            ["githubUrl", "GitHub URL", profile.githubUrl ?? ""],
            ["linkedinUrl", "LinkedIn URL", profile.linkedinUrl ?? ""],
            ["resumeUrl", "Resume URL", profile.resumeUrl ?? ""],
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
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Save profile
        </button>
      </form>
    </div>
  );
}
