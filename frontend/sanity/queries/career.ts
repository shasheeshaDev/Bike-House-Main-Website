import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { bodyQuery } from "./shared/body";
import { imageQuery } from "./shared/image";

export const CAREERS_QUERY = groq`
  *[_type == "career" && isActive == true] | order(orderRank asc) {
    _id,
    title,
    slug,
    department,
    employmentType,
    location,
  }
`;

export const CAREER_QUERY = groq`
  *[_type == "career" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    department,
    employmentType,
    location,
    bannerImage { ${imageQuery} },
    intro[] { ${bodyQuery} },
    responsibilities,
    requirements,
    niceToHave,
    benefits[] {
      _key,
      title,
      description
    },
    specialNote[]{
      ...,
      _type == "introContentBlock" => {
        eyebrowHeading,
        heading[]{ ... },
        description
      },
      _type == "bodyBlock" => {
        content[]{ ... }
      },
      _type == "buttonGroupBlock" => {
        buttons[]{ _key, label, href, isExternal, target, buttonVariant }
      }
    },
    enquiryForm {
      selectedFormConfig->{ ... },
      selectedFormSheet->{ ... }
    },
    ${metaQuery},
  }
`;

export const CAREERS_SLUGS_QUERY = groq`*[_type == "career" && defined(slug)]{ slug }`;
