"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./icon";
import { navItems, site } from "@/lib/site";

/** Fixed, blur-backed header with a full-screen mobile menu. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on navigation. Adjusted during render rather than in an effect so
  // back/forward navigation never flashes the open menu.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
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
            <button
              type="button"
              className="nav-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={menuOpen ? "is-open" : undefined} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={isActive(item.href) ? "active" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a href={site.phoneHref} className="mobile-phone">
          {site.phone}
        </a>
      </div>
    </>
  );
}
