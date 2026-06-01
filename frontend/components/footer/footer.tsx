import Image from "next/image";
import Link from "next/link";
import { fetchSanityFooter } from "@/sanity/lib/fetch";
import type { FooterData, FooterLink } from "@/sanity/queries/footer";

// ─── Social icon map ──────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8H6v4h3v8h4v-8h3l1-4h-4V6.5C13 5.5 13.5 5 14.5 5H17V1h-3c-3 0-5 1.8-5 5v2Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 6.2c-.3-1-1-1.8-2-2.1C19.2 3.5 12 3.5 12 3.5s-7.2 0-9 .6c-1 .3-1.7 1.1-2 2.1C.5 8 .5 12 .5 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9 .6 9 .6s7.2 0 9-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6ZM2 9h4v12H2Z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType> = {
  instagram: InstagramIcon,
  facebook:  FacebookIcon,
  youtube:   YouTubeIcon,
  whatsapp:  WhatsAppIcon,
  linkedin:  LinkedInIcon,
  twitter:   TwitterIcon,
  globe:     GlobeIcon,
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-condensed text-[12px] font-medium tracking-[0.25em] uppercase text-ink-mute mb-4.5">
      {children}
    </p>
  );
}

function NavLinkItem({ link }: { link: FooterLink }) {
  const isExternal = link.isExternal && link.target;
  return (
    <li>
      <Link
        href={link.href ?? "#"}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-[14px] text-ink-dim hover:text-brand transition-colors duration-200"
      >
        {link.label}
      </Link>
    </li>
  );
}

function PlainItem({ children }: { children: React.ReactNode }) {
  return <li className="text-[14px] text-ink-mute leading-snug">{children}</li>;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default async function Footer() {
  const data: FooterData = await fetchSanityFooter();
  const year = new Date().getFullYear();

  const socials    = data?.socialMediaLinks ?? [];
  const navColumns = data?.navColumns       ?? [];
  const contact    = data?.contactInfo;
  const credits    = data?.credits          ?? [];

  const phoneHref = contact?.phone
    ? `tel:+${contact.phone.replace(/\D/g, "")}`
    : null;

  return (
    <footer
      className="mt-20 border-t border-line-soft pt-20 pb-8"
      style={{ background: "var(--footer-bg)" }}
    >
      <div className="container">

        {/* ── Main grid
            Design: 1.4fr repeat(3,1fr) | ≤880px 2-col | ≤540px 1-col
            gap: 48px row, 32px column                                       */}
        <div className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[880px]:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-8 gap-y-12">

          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit">
              {data?.logo?.asset?.url && (
                <Image
                  src={data.logo.asset.url}
                  alt={data.logo.alt ?? "Bike House"}
                  width={38}
                  height={38}
                  className="w-9.5 h-9.5 object-contain"
                />
              )}
              <div>
                <div className="font-display text-[22px] tracking-[0.04em] leading-none text-ink uppercase">
                  BIKE HOUSE
                </div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-brand mt-0.5 uppercase">
                  PILIYANDALA · EST 2014
                </div>
              </div>
            </Link>

            {data?.description && (
              <p className="text-[14px] text-ink-dim leading-relaxed max-w-[36ch]">
                {data.description}
              </p>
            )}

            {socials.length > 0 && (
              <div className="flex gap-2 mt-6 flex-wrap">
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.platform] ?? GlobeIcon;
                  return (
                    <a
                      key={s._key}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="flex items-center justify-center w-9.5 h-9.5 rounded-full shrink-0 border border-line text-ink-dim hover:border-brand hover:bg-brand/10 hover:text-ink transition-colors duration-200"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dynamic nav columns (Workshop, Marketplace…) */}
          {navColumns.map((col) => (
            <div key={col._key}>
              <ColHeading>{col.title}</ColHeading>
              <ul className="flex flex-col gap-3 list-none m-0 p-0">
                {(col.links ?? []).map((link) => (
                  <NavLinkItem key={link._key} link={link} />
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column — only rendered when contactInfo is set */}
          {contact && (
            <div>
              <ColHeading>{contact.columnTitle ?? "Contact"}</ColHeading>
              <ul className="flex flex-col gap-3 list-none m-0 p-0">
                {contact.address && <PlainItem>{contact.address}</PlainItem>}

                {contact.phone && phoneHref && (
                  <li>
                    <a
                      href={phoneHref}
                      className="text-[14px] text-ink-dim hover:text-brand transition-colors duration-200"
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}

                {contact.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[14px] text-ink-dim hover:text-brand transition-colors duration-200"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}

                {contact.hours && <PlainItem>{contact.hours}</PlainItem>}
              </ul>
            </div>
          )}
        </div>

        {/* ── Footer bottom
            Design: justify-between | mono 11px | tracking .14em | uppercase
            Right side: "{prefix} {link}" entries separated by ·             */}
        <div className="mt-14 pt-6 border-t border-line-soft flex flex-wrap justify-between items-center gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">

          <div>
            {data?.copyrightText
              ? `© ${year} ${data.copyrightText}`
              : `© ${year} BIKE HOUSE LK`}
          </div>

          {credits.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {credits.map((credit, i) => (
                <span key={credit._key} className="flex items-center gap-1">
                  {i > 0 && <span className="mx-1 text-line select-none">·</span>}
                  {credit.prefix && <span>{credit.prefix}</span>}
                  {credit.label && credit.href && (
                    <a
                      href={credit.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink border-b border-line hover:border-brand hover:text-brand transition-colors duration-200"
                    >
                      {credit.label}
                    </a>
                  )}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </footer>
  );
}
