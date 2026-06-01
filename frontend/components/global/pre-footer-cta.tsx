import Link from "next/link";
import { fetchSanitySettings } from "@/sanity/lib/fetch";
import type { PrefooterCtaData } from "@/sanity/queries/settings";

// ─── Arrow decoration (matches design .btn .arrow) ────────────────────────────

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
/*
  Design spec (.cta-banner in design/assets/css/main.css):
  - border: 1px solid var(--line)
  - padding: clamp(40px, 6vw, 80px)
  - background: linear-gradient(135deg, rgba(225,6,0,.08), transparent 50%), var(--bg-elev)
  - grid-template-columns: 1.5fr auto  |  ≤800px → 1fr
  - gap: 32px
  - ::before  radial red glow (decorative, pointer-events: none)
  - h3: clamp(36px, 5vw, 72px)

  Wrapped in .section  →  padding-block: clamp(80px, 11vh, 160px)
*/

export default async function PreFooterCta() {
  const settings = await fetchSanitySettings();
  // Cast to PrefooterCtaData — the auto-generated SETTINGS_QUERYResult type is
  // stale until `pnpm typegen` is re-run after connecting Sanity.
  const cta = settings?.prefooterCta as PrefooterCtaData;

  // Require at least a heading or primary button to render
  if (!cta?.heading && !cta?.primaryButtonLabel) return null;

  const eyebrow            = cta.eyebrowLabel;
  const heading            = cta.heading;
  const description        = cta.description;
  const primaryLabel       = cta.primaryButtonLabel;
  const primaryHref        = cta.primaryButtonHref;
  const secondaryLabel     = cta.secondaryButtonLabel;
  const secondaryHref      = cta.secondaryButtonHref;

  return (
    <section className="section">
      <div className="container">

        {/*
          .cta-banner
          overflow-hidden so the ::before glow pseudo stays contained
        */}
        <div
          className="relative overflow-hidden border border-line grid max-[800px]:grid-cols-1 items-center gap-8"
          style={{
            gridTemplateColumns: "1.5fr auto",
            padding: "clamp(40px, 6vw, 80px)",
            background:
              "linear-gradient(135deg, rgba(225,6,0,.08), transparent 50%), var(--bg-elev)",
          }}
        >
          {/* Radial red glow — design's ::before */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-100 h-100"
            style={{
              background:
                "radial-gradient(circle, rgba(225,6,0,.15), transparent 60%)",
            }}
          />

          {/* Left: text content */}
          <div className="relative">
            {eyebrow && (
              <span className="kicker">{eyebrow}</span>
            )}

            {heading && (
              <h3
                className="text-ink mt-4 font-display uppercase tracking-[0.005em]"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: "0.92" }}
              >
                {heading}
              </h3>
            )}

            {description && (
              <p className="mt-5 max-w-[48ch] text-ink-dim">
                {description}
              </p>
            )}
          </div>

          {/* Right: CTA buttons */}
          <div className="relative flex flex-wrap gap-3 max-[800px]:mt-2">
            {primaryLabel && primaryHref && (
              <Link
                href={primaryHref}
                className="
                  inline-flex items-center gap-3
                  px-6 py-4
                  font-condensed text-[15px] font-semibold tracking-[0.15em] uppercase
                  bg-brand text-white border border-brand rounded-sm
                  hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_var(--red)]
                  transition-all duration-350 whitespace-nowrap
                "
              >
                {primaryLabel}
                <Arrow />
              </Link>
            )}

            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="
                  inline-flex items-center gap-3
                  px-6 py-4
                  font-condensed text-[15px] font-semibold tracking-[0.15em] uppercase
                  bg-transparent text-ink border border-line rounded-sm
                  hover:border-brand hover:text-white
                  transition-all duration-350 whitespace-nowrap
                "
              >
                {secondaryLabel}
                <Arrow />
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
