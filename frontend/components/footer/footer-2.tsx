import Image from "next/image";
import Link from "next/link";
import { fetchSanitySettings, fetchSanityFooter } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Icon from "@/components/blocks/shared/icon";
import type { FOOTER_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";

export default async function Footer2() {
  const settings: SETTINGS_QUERYResult = await fetchSanitySettings();
  const footer: FOOTER_QUERYResult = await fetchSanityFooter();

  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName ?? "Elevate Hospitality";

  const columns = footer?.links?.filter(
    (l) => l._type === "link-group" || l._type === "footerColumn"
  ) ?? [];

  return (
    <footer className="bg-eh-navy pt-20">
      <div className="px-5 md:px-10 lg:px-20">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-16 pb-16 border-b border-white/[0.08]">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            {footer?.footerLogo?.asset && (
              <Link href="/">
                <Image
                  src={urlFor(footer.footerLogo).url()}
                  alt={footer.footerLogo.alt ?? siteName}
                  width={180}
                  height={52}
                  className="h-[52px] w-auto object-contain"
                />
              </Link>
            )}

            {footer?.description && (
              <p className="font-dmSans text-[13px] font-light text-white/50 leading-[1.7] max-w-[280px]">
                {footer.description}
              </p>
            )}

            {footer?.socialMediaLinks && footer.socialMediaLinks.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {footer.socialMediaLinks.map((social) => (
                  <a
                    key={social._key}
                    href={social.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform ?? "social link"}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/50 hover:border-eh-gold hover:text-eh-gold transition-colors duration-200"
                  >
                    {social.platform && (
                      <Icon className="w-4 h-4" iconVariant={social.platform} />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns — link-group (single section) or footerColumn (multi-section) */}
          {columns.map((col) => {
            // Single-section column
            if (col._type === "link-group") {
              return (
                <div key={col._key} className="flex flex-col gap-5">
                  <h4 className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold">
                    {col.title}
                  </h4>
                  {col.links && col.links.length > 0 && (
                    <ul className="flex flex-col gap-[10px] list-none m-0 p-0">
                      {col.links.map((link) => (
                        <li key={link._key}>
                          <Link
                            href={link.href ?? "#"}
                            target={link.target ? "_blank" : undefined}
                            className="font-dmSans text-[13px] font-light text-white/55 hover:text-eh-gold transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            // Multi-section column (e.g. Partners + Contact in one column)
            if (col._type === "footerColumn" && (col as any).groups?.length > 0) {
              return (
                <div key={col._key} className="flex flex-col gap-8">
                  {(col as any).groups.map((group: any) => (
                    <div key={group._key} className="flex flex-col gap-5">
                      <h4 className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold">
                        {group.title}
                      </h4>
                      {group.links && group.links.length > 0 && (
                        <ul className="flex flex-col gap-[10px] list-none m-0 p-0">
                          {group.links.map((link: any) => (
                            <li key={link._key}>
                              <Link
                                href={link.href ?? "#"}
                                target={link.target ? "_blank" : undefined}
                                className="font-dmSans text-[13px] font-light text-white/55 hover:text-eh-gold transition-colors duration-200"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* ── Footer bottom ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8">
          <p className="font-dmSans text-[12px] text-white/30">
            © {currentYear} {siteName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {footer?.bottomLinks && footer.bottomLinks.length > 0 && (
              <>
                {footer.bottomLinks.map((link) => (
                  <Link
                    key={link._key}
                    href={link.href ?? "#"}
                    target={link.target ? "_blank" : undefined}
                    className="font-dmSans text-[12px] text-white/30 hover:text-eh-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <span className="text-white/15 select-none">·</span>
              </>
            )}
            <span className="font-dmSans text-[12px] text-white/30">
              Web Solution by{" "}
              <Link
                href="https://www.shashathink.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-eh-gold hover:underline"
              >
                ShashaThink
              </Link>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
