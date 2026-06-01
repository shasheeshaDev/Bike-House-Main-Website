import { imageQuery } from "../shared/image";
import { buttonQuery } from "../shared/button";

export const content8Query = `
  _type == "content-8" => {
    _type,
    _key,
    padding,
    textContent[]{
      ...,
      _type == "introContentBlock" => {
        eyebrowHeading,
        heading[]{ ... },
        description
      },
      _type == "bodyBlock" => {
        content[]{ ... }
      },
      _type == "benefitListBlock" => {
        items[]{ _key, title, description }
      },
      _type == "buttonGroupBlock" => {
        buttons[]{ ${buttonQuery} }
      }
    },
    image {
      ${imageQuery}
    },
    imagePosition
  }
`;
