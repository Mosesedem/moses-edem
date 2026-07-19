import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { AdminShell, type AdminNavItem } from "@/components/admin/shell";
import { Toaster } from "sonner";

/** Admin always reads fresh CMS data (no ISR). */
export const dynamic = "force-dynamic";

const NAV: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "Counts, storage, maintenance",
    exact: true,
  },
  {
    href: "/admin/personas",
    label: "Personas",
    description: "Audience lenses and heroes",
  },
  {
    href: "/admin/blocks",
    label: "Blocks",
    description: "Stats, text, timeline, links",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    description: "Portfolio and lens copy",
  },
  {
    href: "/admin/blog",
    label: "Blog",
    description: "Drafts and published posts",
  },
  {
    href: "/admin/profile",
    label: "Profile",
    description: "Name, contact, social links",
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();
  const dbOn = isDatabaseConfigured();

  // Login page: simple centered shell without sidebar
  if (!authed) {
    return (
      <div className="min-h-dvh bg-background text-foreground">
        <div
          className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-16"
          style={{ paddingTop: "max(2.5rem, var(--safe-top))" }}
        >
          {children}
        </div>
        <Toaster richColors position="top-center" />
      </div>
    );
  }

  return (
    <>
      <AdminShell nav={NAV} dbOn={dbOn}>
        {children}
      </AdminShell>
      <Toaster richColors position="top-center" closeButton />
    </>
  );
}
