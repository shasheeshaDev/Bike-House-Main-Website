import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { metaQuery } from "./shared/meta";
import { bodyQuery } from "./shared/body";

export const PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(orderRank asc) {
    _id,
    name,
    slug,
    location,
    "category": category->{ _id, title, slug },
    image { ${imageQuery} },
  }
`;

export const PARTNER_QUERY = groq`
  *[_type == "partner" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    "category": category->{ _id, title, slug },
    partnerSince,
    excerpt[] { ${bodyQuery} },
    website,
    image { ${imageQuery} },
    featuredImage { ${imageQuery} },
    factSheet {
      title,
      asset->{ _id, url, originalFilename }
    },
    servicesProvided[]->{ _id, title, slug },
    body[] { ${bodyQuery} },
    enquiryForm {
      selectedFormConfig->{ ... },
      selectedFormSheet->{ ... }
    },
    ${metaQuery},
  }
`;

export const PARTNERS_SLUGS_QUERY = groq`*[_type == "partner" && defined(slug)]{ slug }`;
