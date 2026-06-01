"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HeaderData } from "@/sanity/queries/header";

// ─── Icons ────────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

// Arrow used inside the CTA button, matching design's .btn .arrow
function Arrow() {
  return (
    <span aria-hidden="true" className="inline-flex items-center shrink-0">
      <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
        <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1" />
        <polyline points="10,1 14,4 10,7" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface NavbarProps {
  navigation: HeaderData;
}

export default function Navbar({ navigation }: NavbarProps) {
  const pathname  = usePathname();
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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = () => setMenuOpen(false);

  const links   = navigation?.links   ?? [];
  const ctaLink = navigation?.ctaLinks?.[0] ?? null;
  const phone   = navigation?.phone   ?? null;
  const phoneHref = phone ? `tel:+${phone.replace(/\D/g, "")}` : null;

  return (
    <>
      {/* ── Fixed header bar ──────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 py-4.5",
          "border-b border-line-soft",
          "transition-[background] duration-300",
          scrolled
            ? "bg-[rgba(8,8,9,0.85)] backdrop-blur-[14px] backdrop-saturate-150"
            : "bg-[rgba(10,10,11,0.6)] backdrop-blur-[14px] backdrop-saturate-140"
        )}
      >
        {/* .container .nav — flex, space-between, gap 32px */}
        <div className="container flex items-center justify-between gap-8">

          {/* .nav-brand */}
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-3 shrink-0"
            aria-label="Bike House home"
          >
            {navigation?.logo?.asset?.url ? (
              <Image
                src={navigation.logo.asset.url}
                alt={navigation.logo.alt ?? "Bike House"}
                width={38}
                height={38}
                className="w-9.5 h-9.5 object-contain"
                priority
              />
            ) : (
              /* Static fallback until logo is uploaded to Sanity */
              <Image
                src="/logo/logo.png"
                alt="Bike House"
                width={38}
                height={38}
                className="w-9.5 h-9.5 object-contain"
                priority
              />
            )}
            <div>
              {/* .nav-brand-text */}
              <div className="font-display text-[22px] leading-none tracking-[0.04em] text-ink uppercase">
                BIKE HOUSE
              </div>
              {/* .nav-brand-text small */}
              <div className="font-mono text-[9px] tracking-[0.25em] text-brand mt-0.5 uppercase">
                PILIYANDALA · EST 2014
              </div>
            </div>
          </Link>

          {/* .nav-links — hidden below 1080px */}
          {links.length > 0 && (
            <nav className="hidden min-[1080px]:flex" aria-label="Main navigation">
              <ul className="flex gap-1 list-none m-0 p-0">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link._key}>
                      <Link
                        href={link.href ?? "#"}
                        target={link.isExternal && link.target ? "_blank" : undefined}
                        className={cn(
                          "relative block px-3.5 py-2.5",
                          "font-condensed text-[14px] font-medium tracking-[0.15em] uppercase",
                          "transition-colors duration-200",
                          isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-3.5 right-3.5 h-px bg-brand"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* .nav-cta — phone + CTA button + burger */}
          <div className="flex items-center gap-[14px]">

            {/* .nav-phone — desktop only */}
            {phone && phoneHref && (
              <a
                href={phoneHref}
                className="hidden min-[1080px]:flex items-center gap-2 font-mono text-[13px] text-ink hover:text-brand transition-colors duration-200"
              >
                <span className="text-brand"><PhoneIcon /></span>
                {phone}
              </a>
            )}

            {/* .btn .btn-small — desktop only */}
            {ctaLink && (
              <Link
                href={ctaLink.href ?? "#"}
                className="hidden min-[1080px]:inline-flex items-center gap-3 px-4 py-[10px] font-condensed text-[12px] font-semibold tracking-[0.15em] uppercase bg-brand text-white border border-brand rounded-sm hover:-translate-y-px hover:shadow-[0_12px_32px_-12px_var(--red)] transition-all duration-300 whitespace-nowrap"
              >
                {ctaLink.label}
                <Arrow />
              </Link>
            )}

            {/* .nav-burger — visible below 1080px */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex min-[1080px]:hidden items-center justify-center w-11 h-11 border border-line rounded-sm bg-transparent cursor-pointer"
            >
              <div className="flex flex-col gap-[6px]">
                <span className={cn("block w-[18px] h-px bg-ink transition-all duration-300 origin-center", menuOpen && "translate-y-[7px] rotate-45")} />
                <span className={cn("block w-[18px] h-px bg-ink transition-all duration-300",                menuOpen && "opacity-0 scale-x-0")} />
                <span className={cn("block w-[18px] h-px bg-ink transition-all duration-300 origin-center", menuOpen && "-translate-y-[7px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile menu ─────────────────────────────────────────
          Design: fixed inset-0, bg var(--bg), z-200
          padding: 100px var(--gutter) 40px
          transform: translateY(-100%) closed → translateY(0) open
          transition: .5s cubic-bezier(.16,1,.3,1)                          */}
      <div
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-[200] min-[1080px]:hidden",
          "flex flex-col gap-2 bg-background",
          "transition-transform duration-500",
          menuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        style={{
          padding: "100px clamp(20px,4vw,56px) 40px",
          transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* .mobile-close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="absolute top-6 flex items-center justify-center w-11 h-11 border border-line bg-transparent text-ink rounded-sm hover:bg-brand hover:border-brand transition-colors duration-200 text-lg"
          style={{ right: "clamp(20px,4vw,56px)" }}
        >
          ×
        </button>

        {/* Nav links — Anton, clamp(42px,9vw,72px), ink-dim → red */}
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link._key}
              href={link.href ?? "#"}
              onClick={close}
              className={cn(
                "font-display text-[clamp(42px,9vw,72px)] uppercase tracking-[0.01em]",
                "py-[10px] border-b border-line-soft",
                "transition-colors duration-200",
                isActive ? "text-brand" : "text-ink-dim hover:text-brand"
              )}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Phone — Anton 24px, red, at the bottom */}
        {phone && phoneHref && (
          <div className="mt-8 font-mono text-[12px] text-ink-mute tracking-[0.18em]">
            <a
              href={phoneHref}
              className="font-display text-[24px] text-brand tracking-[0.04em] hover:text-brand-deep transition-colors duration-200"
              style={{ textTransform: "none" }}
            >
              {phone}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
