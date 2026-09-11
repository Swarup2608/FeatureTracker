"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { AccentPicker } from "@/components/shell/AccentPicker";

const LINKS = [
  { href: "/", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/docs", label: "Changelog" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="mk-nav">
      <Link href="/" className="brand">
        <span className="brand-mark">
          <Icon name="logo" size={15} />
        </span>
        <b>FeatureTrack</b>
      </Link>
      <div className="links">
        {LINKS.map((l, i) => (
          <Link key={i} href={l.href} className={pathname === l.href && l.label !== "Changelog" ? "on" : ""}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="right">
        <AccentPicker />
        <ThemeToggle />
        <Link className="mk-btn" href="/login">
          Sign in
        </Link>
        <Link className="mk-btn solid" href="/register">
          Start free
        </Link>
      </div>
    </nav>
  );
}
