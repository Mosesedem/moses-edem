import type { ComponentType } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/lib/schema";
import { LensSwitcher, type LensOption } from "@/components/lens-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const X_URL = "https://x.com/mosesedem_me";

/** X / Twitter mark — Lucide has no official X glyph. */
function XIcon({ size = 16 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

type SocialIcon = ComponentType<{ size?: number; strokeWidth?: number }>;

type SocialLink = {
  href: string;
  icon: SocialIcon;
  label: string;
  external: boolean;
};

type SiteFooterProps = {
  profile: Profile;
  lenses?: LensOption[];
  currentKey?: string;
};

export function SiteFooter({ profile, lenses, currentKey }: SiteFooterProps) {
  // const links: SocialLink[] = [
  //   profile.githubUrl
  //     ? {
  //         href: profile.githubUrl,
  //         icon: Github,
  //         label: "GitHub",
  //         external: true,
  //       }
  //     : null,
  //   profile.linkedinUrl
  //     ? {
  //         href: profile.linkedinUrl,
  //         icon: Linkedin,
  //         label: "LinkedIn",
  //         external: true,
  //       }
  //     : null,
  //   {
  //     href: X_URL,
  //     icon: XIcon,
  //     label: "X",
  //     external: true,
  //   },
  //   profile.email
  //     ? {
  //         href: `mailto:${profile.email}`,
  //         icon: Mail,
  //         label: "Email",
  //         external: false,
  //       }
  //     : null,
  // ].filter((l): l is SocialLink => l != null);

  const links: SocialLink[] = [];

  if (profile.githubUrl) {
    links.push({
      href: profile.githubUrl,
      icon: Github,
      label: "GitHub",
      external: true,
    });
  }

  if (profile.linkedinUrl) {
    links.push({
      href: profile.linkedinUrl,
      icon: Linkedin,
      label: "LinkedIn",
      external: true,
    });
  }

  links.push({
    href: X_URL,
    icon: XIcon,
    label: "X",
    external: true,
  });

  if (profile.email) {
    links.push({
      href: `mailto:${profile.email}`,
      icon: Mail,
      label: "Email",
      external: false,
    });
  }
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

            <nav className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-5">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
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

      <div className="page-container flex flex-col gap-5 py-7 sm:py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {links.map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="btn-icon"
              >
                <Icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Theme
            </p>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-5 sm:flex-row">
          <p className="text-center font-mono text-[11px] text-muted-foreground sm:text-left sm:text-xs">
            &copy; {new Date().getFullYear()} {profile.fullName}
          </p>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-accent sm:text-xs"
          >
            @mosesedem_me
          </a>
        </div>
      </div>
    </footer>
  );
}
