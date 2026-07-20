import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPersonas, getProfile } from "@/lib/queries";
import type { Profile } from "@/lib/schema";

const FALLBACK_PROFILE: Profile = {
  id: "default",
  fullName: "Moses Jacob Edem",
  location: null,
  email: null,
  githubUrl: null,
  linkedinUrl: null,
  resumeUrl: null,
  phone: null,
  updatedAt: null,
};

export default async function NotFound() {
  const [personas, profile] = await Promise.all([
    getAllPersonas().catch(() => []),
    getProfile().catch(() => FALLBACK_PROFILE),
  ]);

  const lenses = personas.map((persona) => ({
    key: persona.key,
    label: persona.label,
    iconName: persona.iconName,
  }));

  return (
    <div className="page-shell">
      <SiteHeader lenses={lenses} />
      <main className="page-main flex flex-1 items-center justify-center">
        <div className="page-container max-w-md py-16 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-border">
            <Compass size={22} strokeWidth={1.75} />
          </div>
          <p className="section-label mb-3">404</p>
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            That route doesn&apos;t exist — or the content was unpublished.
            Check the URL, or pick a path below.
          </p>
          <div className="cta-row mt-8 justify-center">
            <Link href="/" className="btn-primary">
              <Home size={16} strokeWidth={1.75} />
              Home
            </Link>
            <Link href="/blog" className="btn-secondary">
              <ArrowLeft size={16} strokeWidth={1.75} />
              Blog
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter profile={profile} lenses={lenses} />
    </div>
  );
}
