import Link from "next/link";
import { siteInfo } from "@/lib/data";
import { SocialLink } from "@/components/ui/SocialLink";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-container bg-surface">
      {/* Main footer row */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3 md:px-20">
        {/* Left — branding */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-base font-bold text-body-text">
            {siteInfo.name}
          </span>
          <span className="font-mono text-sm text-muted-text">
            {siteInfo.title}
          </span>
        </div>

        {/* Center — quick nav */}
        <nav aria-label="Footer navigation" className="flex flex-col gap-3 md:items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — social icons */}
        <div className="flex flex-col gap-3 md:items-end">
          <span className="font-mono text-xs font-medium text-muted-text">
            Find me on
          </span>
          <div className="flex gap-3">
            {siteInfo.socialLinks.map((link) => (
              <SocialLink
                key={link.platform}
                platform={link.platform}
                url={link.url}
                label={link.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div className="border-t border-outline-variant">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center px-4 py-4 md:px-20">
          <p className="font-mono text-xs text-muted-text">
            © {currentYear} {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
