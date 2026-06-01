import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

// ─── Bike House prefooter CTA type ───────────────────────────────────────────
// Manually typed to match the updated settings schema.
// Run `pnpm typegen` after connecting Sanity to regenerate.

export type PrefooterCtaData = {
  eyebrowLabel:        string | null;
  heading:             string | null;
  description:         string | null;
  primaryButtonLabel:  string | null;
  primaryButtonHref:   string | null;
  secondaryButtonLabel: string | null;
  secondaryButtonHref: string | null;
} | null;

// ─── GROQ query ───────────────────────────────────────────────────────────────

export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  _type,
  siteName,
  siteUrl,
  siteDescription,
  logo{
    ${imageQuery}
  },
  logoDark{
    ${imageQuery}
  },
  footerLogo{
    ${imageQuery}
  },
  favicon{
    asset->{ _id, url }
  },
  socialMediaLinks[]{
    _key,
    platform,
    url
  },
  prefooterCta{
    eyebrowLabel,
    heading,
    description,
    primaryButtonLabel,
    primaryButtonHref,
    secondaryButtonLabel,
    secondaryButtonHref
  }
}`;
