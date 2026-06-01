import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";

export const HEADER_QUERY = groq`
  *[_type == "header"][0]{
    _type,
    links[]{
      ${linkQuery},
      _type == "link-group" => {
        links[]{
          ${linkQuery}
        }
      }
    },
    ctaLinks[]{
      ${linkQuery}
    },
  }
`;
