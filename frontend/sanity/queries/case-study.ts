import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { metaQuery } from "./shared/meta";
import { bodyQuery } from "./shared/body";

export const CASE_STUDIES_QUERY = groq`
  *[_type == "case-study"] | order(orderRank asc) {
    _id,
    title,
    slug,
    location,
    challenge,
    strategy,
    results,
    image { ${imageQuery} },
  }
`;

export const CASE_STUDY_QUERY = groq`
  *[_type == "case-study" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    location,
    challenge,
    strategy,
    results,
    image { ${imageQuery} },
    body[] { ${bodyQuery} },
    ${metaQuery},
  }
`;

export const CASE_STUDIES_SLUGS_QUERY = groq`*[_type == "case-study" && defined(slug)]{ slug }`;
