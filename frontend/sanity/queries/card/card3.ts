import { imageQuery } from "../shared/image";
import { backgroundQuery } from "../shared/background";
import { buttonQuery } from "../shared/button";
import { linkQuery } from "../shared/link";

export const card3Query = `
  _type == "card-3" => {
    _type,
    _key,
    padding,
    eyebrowHeading,
    heading,
    description,
    buttons[]{
      ${buttonQuery}
    },
    cards[]{
      _key,
      title,
      description,
      link {
        ${linkQuery}
      },
      backgroundImage {
        ${imageQuery}
      }
    },
    background {
      ${backgroundQuery}
    }
  }
`;
