import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { metaQuery } from "./shared/meta";
import { bodyQuery } from "./shared/body";

export const INSIGHTS_QUERY = groq`
  *[_type == "insight"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    image { ${imageQuery} },
    category->{ _id, title },
  }
`;

export const INSIGHT_QUERY = groq`
  *[_type == "insight" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    image { ${imageQuery} },
    category->{ _id, title },
    author->{ name, image { ${imageQuery} } },
    body[] { ${bodyQuery} },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "relatedCategories": *[_type == "category"] | order(orderRank asc) { _id, title },
    ${metaQuery},
  }
`;

export const INSIGHTS_SLUGS_QUERY = groq`*[_type == "insight" && defined(slug)]{ slug }`;
