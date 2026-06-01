import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

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
    heading[]{
      ...
    },
    description,
    buttonLabel,
    buttonHref,
    backgroundImage{
      ${imageQuery}
    }
  }
}`;
