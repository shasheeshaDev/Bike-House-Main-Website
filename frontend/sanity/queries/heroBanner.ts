import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";

export const HERO_BANNER_QUERY = groq`
  *[_type == "heroBanner"]{
    _type,
    _key,
    title,
    description,
    link{
      ${linkQuery},
    }
  }
`;
