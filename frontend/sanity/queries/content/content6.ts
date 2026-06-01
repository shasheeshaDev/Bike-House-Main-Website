import { imageQuery } from "../shared/image";
import { buttonQuery } from "../shared/button";

export const content6Query = `
  _type == "content-6" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    body,
    listItems,
    buttons[]{ ${buttonQuery} },
    mainImage {
      ${imageQuery}
    },
    accentImage {
      ${imageQuery}
    },
    statValue,
    statLabel
  }
`;
