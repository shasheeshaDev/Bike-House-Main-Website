import { imageQuery } from "../shared/image";

export const banner3Query = `
  _type == "banner-3" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    description,
    backgroundImage {
      ${imageQuery}
    }
  }
`;
