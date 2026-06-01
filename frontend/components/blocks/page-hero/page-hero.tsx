import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/components/blocks/shared/icon";
import { Breadcrumb } from "./breadcrumb";

// ─── Types ────────────────────────────────────────────────────────────────────

type PageHeroButton = {
  _key: string;
  label: string | null;
  href: string | null;
  buttonVariant: string | null;
  isExternal: boolean | null;
  target: boolean | null;
};

type PageHeroProps = {
  _type: "page-hero";
  _key: string;
  heading: string | null;
  headingAccent: string | null;
  description: string | null;
  buttons: PageHeroButton[] | null;
  showNotice: boolean | null;
  noticeIcon: string | null;
  noticeEyebrow: string | null;
  noticeTitle: string | null;
  noticeLink: {
    label: string | null;
    href: string | null;
    isExternal: boolean | null;
    target: boolean | null;
  } | null;
};

// ─── Button renderer ──────────────────────────────────────────────────────────
// Bike House button variants:
//   primary / default  →  .btn  (red filled)
//   ghost / outline    →  .btn .btn-ghost  (transparent, border-line)

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

function PageHeroButton({ btn }: { btn: PageHeroButton }) {
  if (!btn.href || !btn.label) return null;

  const isGhost = ["ghost", "outline", "secondary", "secondary_outline"].includes(btn.buttonVariant ?? "");
  const isExternal = btn.isExternal && btn.target;

  return (
    <Link
      href={btn.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-3 px-6 py-4",
        "font-condensed text-[15px] font-semibold tracking-[0.15em] uppercase",
        "rounded-sm border transition-all duration-300 whitespace-nowrap",
        isGhost
          ? "bg-transparent text-ink border-line hover:border-brand hover:text-white"
          : "bg-brand text-white border-brand hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_var(--red)]"
      )}
    >
      {btn.label}
      <Arrow />
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
/*
  Design spec (.page-hero in design/assets/css/main.css):
  - padding: 160px 0 80px
  - border-bottom: 1px solid var(--line-soft)
  - position: relative; overflow: hidden
  - ::before  radial red glow (absolute, right: -10%, top: 30%)
  - h1: clamp(64px, 11vw, 180px)
  - .lead: margin-top: 24px
  - .crumbs: font-mono 11px, tracking .2em, uppercase, ink-mute, margin-bottom: 24px
  - .crumbs span: color red, margin 0 8px
*/

export default function PageHero({
  heading,
  headingAccent,
  description,
  buttons,
  showNotice,
  noticeIcon,
  noticeEyebrow,
  noticeTitle,
  noticeLink,
}: PageHeroProps) {
  const hasNotice = showNotice && (noticeEyebrow || noticeTitle);

  return (
    <section
      className="relative overflow-hidden border-b border-line-soft"
      style={{ padding: "160px 0 80px" }}
    >
      {/* Radial red glow — design's .page-hero::before */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[30%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
        style={{
          background: "radial-gradient(circle, rgba(225,6,0,.08), transparent 60%)",
        }}
      />

      <div className="container relative">

        {/* Auto breadcrumb — client component reads usePathname() */}
        <Breadcrumb />

        {/* Heading — Anton, clamp(64px, 11vw, 180px) */}
        {(heading || headingAccent) && (
          <h1
            className="font-display font-[400] tracking-[0.005em] uppercase text-ink"
            style={{ fontSize: "clamp(64px, 11vw, 180px)", lineHeight: "0.92" }}
          >
            {heading && <span>{heading}</span>}
            {heading && headingAccent && <br />}
            {headingAccent && (
              <span className="text-brand">{headingAccent}</span>
            )}
          </h1>
        )}

        {/* Lead paragraph */}
        {description && (
          <p
            className="text-ink-dim leading-[1.55] mt-6"
            style={{
              fontSize: "clamp(17px, 1.4vw, 21px)",
              maxWidth: "62ch",
            }}
          >
            {description}
          </p>
        )}

        {/* Button group */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {buttons.map((btn) => (
              <PageHeroButton key={btn._key} btn={btn} />
            ))}
          </div>
        )}

        {/* Notice widget — conditional (e.g. "PHONE-INQUIRY ONLY" on Shop page) */}
        {hasNotice && (() => {
          const inner = (
            <>
              {noticeIcon && noticeIcon !== "none" && (
                <span className="shrink-0 text-brand">
                  <Icon iconVariant={noticeIcon} size={5} strokeWidth={2} />
                </span>
              )}
              <div>
                {noticeEyebrow && (
                  <p className="font-mono text-[12px] tracking-[0.12em] uppercase text-brand">
                    {noticeEyebrow}
                  </p>
                )}
                {noticeTitle && (
                  <p
                    className="font-display uppercase tracking-[0.04em] text-ink mt-1"
                    style={{ fontSize: "22px" }}
                  >
                    {noticeTitle}
                  </p>
                )}
              </div>
            </>
          );

          const wrapperClass = cn(
            "mt-8 inline-flex items-center gap-[14px] max-w-full",
            "border border-[rgba(225,6,0,0.4)] bg-[rgba(225,6,0,0.06)]",
            "px-[22px] py-[18px]",
            noticeLink?.href && "hover:border-brand transition-colors duration-200"
          );

          return noticeLink?.href ? (
            <a
              href={noticeLink.href}
              target={noticeLink.isExternal && noticeLink.target ? "_blank" : undefined}
              rel={noticeLink.isExternal && noticeLink.target ? "noopener noreferrer" : undefined}
              className={wrapperClass}
            >
              {inner}
            </a>
          ) : (
            <div className={wrapperClass}>
              {inner}
            </div>
          );
        })()}

      </div>
    </section>
  );
}
