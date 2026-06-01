import { imageQuery } from "../shared/image";
import { introContentQuery } from "../shared/intro-content";
import { linkQuery } from "../shared/link";

export const card1Query = `
  _type == "card-1" => {
    _type,
    _key,
    padding,
    introContent {
      ${introContentQuery}
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
    }
  }
`;
