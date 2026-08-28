"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const icon = (path: ReactNode) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="square"
    aria-hidden="true"
  >
    {path}
  </svg>
);

/**
 * Five tabs — deliberately not the seven-item desktop nav. About and Journal
 * are reading, not doing; on a phone the job is to find a service, look at the
 * stock, or get in touch. Both remain one tap away in the footer.
 */
const TABS = [
  { label: "Home", href: "/", icon: icon(<path d="M3 10.5 12 3l9 7.5V21H3z" />) },
  {
    label: "Services",
    href: "/services",
    icon: icon(<path d="M4 5h16M4 12h16M4 19h10" />),
  },
  {
    label: "Bikes",
    href: "/bikes",
    icon: icon(
      <>
        <circle cx="5.5" cy="17" r="3.5" />
        <circle cx="18.5" cy="17" r="3.5" />
        <path d="M5.5 17h4l4.5-7h4" />
      </>,
    ),
  },
  { label: "Shop", href: "/shop", icon: icon(<path d="M3 7h18v13H3zM8 7V4h8v3" />) },
  {
    label: "Contact",
    href: "/contact",
    icon: icon(<path d="M4 5h16v11H9l-5 4z" />),
  },
] as const;

/**
 * Native-style bottom tab bar, shown under 1080px in place of the desktop nav.
 *
 * Replaces a burger and a full-screen overlay: navigation is visible at all
 * times rather than costing a tap to discover, nothing traps focus, and the
 * page never has to lock body scroll to show it.
 */
export default function MobileTabBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="tabbar" aria-label="Primary, mobile">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="tabbar-tab"
          aria-current={isActive(tab.href) ? "page" : undefined}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
