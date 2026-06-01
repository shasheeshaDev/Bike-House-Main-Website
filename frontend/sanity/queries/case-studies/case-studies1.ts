import { imageQuery } from "../shared/image";

export const caseStudies1Query = `
  _type == "case-studies-1" => {
    _type,
    _key,
    label,
    heading,
    "caseStudies": *[_type == "case-study"] | order(orderRank asc) {
      _id,
      title,
      slug,
      location,
      challenge,
      strategy,
      results,
      image {
        ${imageQuery}
      }
    }
  }
`;
