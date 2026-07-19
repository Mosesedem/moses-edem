import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsSnapshot } from "@/lib/queries";

export default async function AdminPersonasPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { personas } = await getCmsSnapshot();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        PERSONAS
      </p>
      <h1 className="mt-2 text-2xl font-medium">Edit audience lenses</h1>
      <ul className="mt-8 space-y-2">
        {personas
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/personas/${p.id}`}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:border-accent"
              >
                <div>
                  <p className="font-medium">{p.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">{p.key}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.isActive ? "active" : "off"}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
