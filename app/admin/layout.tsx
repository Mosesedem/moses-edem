import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAction } from "@/lib/admin-actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="font-mono text-sm font-medium hover:text-accent"
            >
              admin
            </Link>
            {authed ? (
              <nav className="hidden items-center gap-3 text-sm text-muted-foreground sm:flex">
                <Link href="/admin/personas" className="hover:text-accent">
                  Personas
                </Link>
                <Link href="/admin/blocks" className="hover:text-accent">
                  Blocks
                </Link>
                <Link href="/admin/projects" className="hover:text-accent">
                  Projects
                </Link>
                <Link href="/admin/blog" className="hover:text-accent">
                  Blog
                </Link>
                <Link href="/admin/profile" className="hover:text-accent">
                  Profile
                </Link>
                <Link href="/" className="hover:text-accent">
                  Site
                </Link>
              </nav>
            ) : null}
          </div>
          {authed ? (
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-foreground"
              >
                Log out
              </button>
            </form>
          ) : null}
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
