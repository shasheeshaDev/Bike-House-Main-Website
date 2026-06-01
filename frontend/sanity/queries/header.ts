import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { imageQuery } from "./shared/image";

// ─── TypeScript type ──────────────────────────────────────────────────────────
// Manually typed to match the Bike House header schema.
// Run `pnpm typegen` after connecting Sanity to regenerate from the schema.

export type HeaderNavLink = {
  _key: string;
  _type: "link-with-label";
  label: string | null;
  href: string | null;
  isExternal: boolean | null;
  target: boolean | null;
};

export type HeaderData = {
  _type: "header";
  phone: string | null;
  whatsappHref: string | null;
  links: HeaderNavLink[] | null;
  ctaLinks: HeaderNavLink[] | null;
  logo: {
    alt: string | null;
    asset: { _id: string; url: string } | null;
  } | null;
} | null;

// ─── GROQ query ───────────────────────────────────────────────────────────────

export const HEADER_QUERY = groq`
  *[_type == "header"][0]{
    _type,
    phone,
    whatsappHref,
    links[]{
      ${linkQuery}
    },
    ctaLinks[]{
      ${linkQuery}
    },
    "logo": *[_type == "settings"][0].logo{
      ${imageQuery}
    }
  }
`;
