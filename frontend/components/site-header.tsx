"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./icon";
import { navItems, site } from "@/lib/site";

/**
 * Fixed, blur-backed header.
 *
 * Below 1080px the nav is handed to the bottom tab bar (components/
 * mobile-tab-bar.tsx) rather than a burger and a full-screen overlay, so there
 * is no open/closed state here at all — no focus trap to manage, no body
 * scroll to lock, and navigation stays visible instead of costing a tap to
 * discover. What the header keeps at that size is the call button, which is
 * the single highest-value action for a workshop on a phone.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav">
        <Link href="/" className="nav-brand" aria-label={`${site.name} home`}>
          <Image src="/img/logo.png" alt="" width={38} height={38} priority />
          <span className="nav-brand-text">
            {site.name.toUpperCase()}
            <small>{site.brandLine.toUpperCase()}</small>
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "active" : undefined}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta">
          <a href={site.phoneHref} className="nav-phone">
            <Icon name="phone" className="size-3.5" strokeWidth={2} />
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-small">
            Book a Service <span className="arrow" />
          </Link>
          {/* The compact stand-in for the number once .nav-phone is hidden. */}
          <a
            href={site.phoneHref}
            className="nav-call"
            aria-label={`Call ${site.name} on ${site.phone}`}
          >
            <Icon name="phone" className="size-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </header>
  );
}
