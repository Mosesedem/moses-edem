import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/lib/schema";

export function SiteFooter({ profile }: { profile: Profile }) {
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
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.fullName}
        </p>
        <div className="flex items-center gap-3">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
