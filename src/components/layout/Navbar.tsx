"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteInfo } from "@/lib/data";
import { MobileMenu } from "./MobileMenu";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-container bg-background">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-20">
        <Link
          href="/"
          className="font-mono text-sm font-bold text-primary transition-colors hover:text-tertiary"
        >
          {siteInfo.name.split(" ")[0]}
          <span className="text-tertiary">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-l-4 px-3 py-2 font-mono text-sm transition-colors",
                pathname === item.href
                  ? "border-tertiary text-tertiary"
                  : "border-transparent text-on-surface-variant hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu navItems={NAV_ITEMS} />
      </div>
    </header>
  );
}
