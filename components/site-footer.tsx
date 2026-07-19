import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/lib/schema";
import { LensSwitcher, type LensOption } from "@/components/lens-switcher";

type SiteFooterProps = {
  profile: Profile;
  lenses?: LensOption[];
  currentKey?: string;
};

export function SiteFooter({ profile, lenses, currentKey }: SiteFooterProps) {
  const links = [
    { href: profile.githubUrl, icon: Github, label: "GitHub" },
    { href: profile.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
    {
      href: profile.email ? `mailto:${profile.email}` : null,
      icon: Mail,
      label: "Email",
    },
  ].filter(
    (l): l is { href: string; icon: typeof Github; label: string } =>
      Boolean(l.href)
  );

  return (
    <footer className="mt-auto border-t border-border">
      {lenses && lenses.length > 0 ? (
        <div className="border-b border-border">
          <div className="page-container py-8 sm:py-10">
            <p className="section-label">MORE</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Switch audience lens
            </p>

            <div className="mt-5 sm:hidden">
              <LensSwitcher
                lenses={lenses}
                currentKey={currentKey}
                variant="menu"
              />
            </div>
            <div className="mt-5 hidden sm:block">
              <LensSwitcher
                lenses={lenses}
                currentKey={currentKey}
                variant="pills"
              />
            </div>

            <nav className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-5">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-border text-center text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground sm:min-h-0 sm:justify-start sm:border-0 sm:p-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <div className="page-container flex flex-col items-center justify-between gap-5 py-7 sm:flex-row sm:gap-4 sm:py-8">
        <p className="order-2 text-center font-mono text-[11px] text-muted-foreground sm:order-1 sm:text-left sm:text-xs">
          &copy; {new Date().getFullYear()} {profile.fullName}
        </p>
        <div className="order-1 flex items-center gap-2 sm:order-2">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="btn-icon"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
