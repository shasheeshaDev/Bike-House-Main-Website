import { imageQuery } from "../shared/image";

export const insightsGrid1Query = `
  _type == "insights-grid-1" => {
    _type,
    _key,
    postsPerPage,
    "insights": *[_type == "insight"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category->{ _id, title },
      image {
        ${imageQuery}
      }
    }
  }
`;
