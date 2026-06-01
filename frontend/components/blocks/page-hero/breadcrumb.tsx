"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// Maps URL segments to human-readable labels for the breadcrumb.
// Extend this as new pages are added.
const SEGMENT_LABELS: Record<string, string> = {
  services:  "Services",
  about:     "About",
  bikes:     "Bikes for Sale",
  shop:      "Shop",
  contact:   "Contact",
  blog:      "Journal",
  // dynamic slugs fall back to capitalised segment text
};

function toLabel(segment: string): string {
  return SEGMENT_LABELS[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div
      className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute mb-6"
    >
      <Link href="/" className="hover:text-ink transition-colors duration-200">
        Home
      </Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const label = toLabel(seg);
        const isLast = i === segments.length - 1;
        return (
          <span key={href}>
            {/* Design: .crumbs span { color: var(--red); margin: 0 8px; } */}
            <span className="text-brand mx-2">/</span>
            {isLast ? (
              <span className="text-ink-dim">{label}</span>
            ) : (
              <Link href={href} className="hover:text-ink transition-colors duration-200">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
