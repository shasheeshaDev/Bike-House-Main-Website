import { imageQuery } from "../shared/image";

export const content5Query = `
  _type == "content-5" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    body,
    image {
      ${imageQuery}
    },
    imagePosition
  }
`;
