import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FooterLink = {
  _key: string;
  label: string | null;
  href: string | null;
  isExternal: boolean | null;
  target: boolean | null;
};

export type FooterNavColumn = {
  _key: string;
  title: string | null;
  links: FooterLink[] | null;
};

export type FooterContactInfo = {
  columnTitle: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
};

export type FooterSocialLink = {
  _key: string;
  platform: string;
  url: string;
};

export type FooterCredit = {
  _key: string;
  prefix: string | null;
  label: string | null;
  href: string | null;
};

export type FooterData = {
  _type: "footer";
  description: string | null;
  socialMediaLinks: FooterSocialLink[] | null;
  navColumns: FooterNavColumn[] | null;
  contactInfo: FooterContactInfo | null;
  copyrightText: string | null;
  credits: FooterCredit[] | null;
  logo: {
    alt: string | null;
    asset: { _id: string; url: string } | null;
  } | null;
} | null;

// ─── GROQ query ───────────────────────────────────────────────────────────────

export const FOOTER_QUERY = groq`
  *[_type == "footer"][0]{
    _type,
    description,
    socialMediaLinks[]{ _key, platform, url },
    navColumns[]{
      _key,
      title,
      links[]{ ${linkQuery} }
    },
    contactInfo{
      columnTitle,
      address,
      phone,
      email,
      hours
    },
    copyrightText,
    credits[]{ _key, prefix, label, href },
    "logo": *[_type == "settings"][0].footerLogo{
      alt,
      asset->{ _id, url }
    }
  }
`;
