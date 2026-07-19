import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAction } from "@/lib/admin-actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  if (await isAdminAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm py-16">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Auth
      </p>
      <h1 className="mt-2 text-2xl font-medium tracking-tight">Admin login</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Manage personas, content blocks, projects, blog, and profile. Password
        is <code className="font-mono text-xs">ADMIN_PASSWORD</code> from your
        environment.
      </p>
      {error ? (
        <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-600 dark:text-red-400">
          Invalid password
        </p>
      ) : null}
      <form action={loginAction} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="password"
            className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
