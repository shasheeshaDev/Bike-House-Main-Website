import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { metaQuery } from "./shared/meta";
import { bodyQuery } from "./shared/body";

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(orderRank asc) {
    _id,
    number,
    title,
    slug,
    description,
    tags[]->{ _id, title, slug },
    image { ${imageQuery} },
  }
`;

export const SERVICE_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    number,
    title,
    slug,
    description,
    tags[]->{ _id, title, slug },
    image { ${imageQuery} },
    featuredImage { ${imageQuery} },
    body[] { ${bodyQuery} },
    ${metaQuery},
  }
`;

export const SERVICES_SLUGS_QUERY = groq`*[_type == "service" && defined(slug)]{ slug }`;
