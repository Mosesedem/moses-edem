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
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        AUTH
      </p>
      <h1 className="mt-2 text-2xl font-medium">Admin login</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage personas, content blocks, and blog posts.
      </p>
      {error ? (
        <p className="mt-4 font-mono text-xs text-red-500">Invalid password</p>
      ) : null}
      <form action={loginAction} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="text-xs font-mono text-muted-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
