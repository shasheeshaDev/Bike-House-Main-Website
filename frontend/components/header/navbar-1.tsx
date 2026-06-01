"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { HEADER_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";

interface Navbar1Props {
  settings: SETTINGS_QUERYResult;
  navigation: HEADER_QUERYResult;
  className?: string;
}

// Pages where the nav starts transparent (full-screen hero behind it)
const HERO_PATHS = ["/"];

export default function Navbar1({ settings, navigation, className }: Navbar1Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHeroPage = HERO_PATHS.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // "light" = non-hero page AND not yet scrolled → cream bg, dark text
  const isLight = !isHeroPage && !scrolled;

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[72px]",
          "px-5 md:px-10 lg:px-[60px]",
          "transition-[background,box-shadow] duration-[400ms] ease-in-out",
          scrolled
            ? "bg-[#0A1628] shadow-[0_1px_0_rgba(184,151,90,0.2)]"
            : isLight
              ? "bg-[#FDFBF8] shadow-[0_1px_0_rgba(0,0,0,0.08)]"
              : "bg-transparent",
          className
        )}
      >
        {/* Logo — show logoDark on cream nav, logo on transparent/navy */}
        <Link href="/" onClick={close} className="flex items-center shrink-0">
          {isLight && settings?.logoDark?.asset ? (
            <Image
              src={urlFor(settings.logoDark).url()}
              alt={settings.logoDark.alt ?? "Elevate Hospitality"}
              width={160}
              height={44}
              className="h-[44px] w-auto object-contain transition-opacity duration-300"
              priority
            />
          ) : settings?.logo?.asset ? (
            <Image
              src={urlFor(settings.logo).url()}
              alt={settings.logo.alt ?? "Elevate Hospitality"}
              width={160}
              height={44}
              className="h-[44px] w-auto object-contain transition-opacity duration-300"
              priority
            />
          ) : null}
        </Link>

        <div className="flex items-center justify-end gap-8">
          {/* Desktop links */}
          {navigation?.links && navigation.links.length > 0 && (
            <ul className="hidden lg:flex items-center gap-9 list-none m-0 p-0">
              {navigation.links.map((item) => {
                const linkClass = cn(
                  "font-dmSans text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-200",
                  isLight ? "text-eh-charcoal hover:text-eh-gold" : "text-white/80 hover:text-eh-gold"
                );

                if (item._type === "link-group") {
                  return (
                    <li key={item._key} className="relative group">
                      <button
                        type="button"
                        className={cn(linkClass, "flex items-center gap-1 border-none bg-transparent p-0 cursor-pointer")}
                      >
                        {item.title}
                        <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {item.links && item.links.length > 0 && (
                        <div className="absolute top-full left-0 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                          <ul className="bg-[#0A1628] border border-[#B8975A]/20 min-w-[180px] py-2 flex flex-col">
                            {item.links.map((sub) => (
                              <li key={sub._key}>
                                <Link
                                  href={sub.href ?? "#"}
                                  target={sub.target ? "_blank" : undefined}
                                  className="block px-5 py-3 font-dmSans text-[12px] font-medium tracking-[0.08em] uppercase text-white/70 hover:text-eh-gold hover:bg-white/5 transition-colors duration-200"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item._key}>
                    <Link
                      href={item.href ?? "#"}
                      target={item.target ? "_blank" : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* CTA button — desktop only */}
            {navigation?.ctaLinks && navigation.ctaLinks.length > 0 && (
              <div className="hidden lg:flex items-center">
                {navigation.ctaLinks.map((cta) => (
                  <Link
                    key={cta._key}
                    href={cta.href ?? "#"}
                    target={cta.target ? "_blank" : undefined}
                    className="font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy px-6 py-[10px] hover:bg-eh-goldLight transition-colors duration-200"
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="flex lg:hidden flex-col gap-[5px] p-2 -mr-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block w-6 h-[2px] transition-all duration-300 origin-center",
                  isLight ? "bg-eh-charcoal" : "bg-white",
                  i === 0 && menuOpen && "translate-y-[7px] rotate-45",
                  i === 1 && menuOpen && "opacity-0 scale-x-0",
                  i === 2 && menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          "fixed top-[72px] left-0 right-0 z-40 lg:hidden",
          "bg-[#0A1628]/98 backdrop-blur-md border-t border-[#B8975A]/20",
          "flex flex-col px-8 pt-6 pb-8",
          "transition-all duration-300 ease-in-out",
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        {navigation?.links?.map((item) => {
          if (item._type === "link-group") {
            return (
              <div key={item._key}>
                <span className="block font-dmSans text-[15px] font-medium tracking-[0.08em] uppercase text-white/50 py-4 border-b border-white/[0.07]">
                  {item.title}
                </span>
                {item.links?.map((sub) => (
                  <Link
                    key={sub._key}
                    href={sub.href ?? "#"}
                    onClick={close}
                    className="block font-dmSans text-[13px] font-medium tracking-[0.08em] uppercase text-white/70 hover:text-eh-gold pl-4 py-3 border-b border-white/[0.05] transition-colors duration-200"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <Link
              key={item._key}
              href={item.href ?? "#"}
              target={item.target ? "_blank" : undefined}
              onClick={close}
              className="font-dmSans text-[15px] font-medium tracking-[0.08em] uppercase text-white/80 hover:text-eh-gold py-4 border-b border-white/[0.07] transition-colors duration-200"
            >
              {item.label}
            </Link>
          );
        })}

        {/* CTA in mobile menu */}
        {navigation?.ctaLinks?.map((cta) => (
          <Link
            key={cta._key}
            href={cta.href ?? "#"}
            onClick={close}
            className="mt-4 font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy text-center py-4 px-6 hover:bg-eh-goldLight transition-colors duration-200"
          >
            {cta.label}
          </Link>
        ))}
      </div>
    </>
  );
}
