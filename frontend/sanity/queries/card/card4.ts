import { imageQuery } from "../shared/image";
import { introContentQuery } from "../shared/intro-content";
import { linkQuery } from "../shared/link";

export const card4Query = `
  _type == "card-4" => {
    _type,
    _key,
    padding,
    introContent {
      ${introContentQuery}
    },
    cards[]{
      _key,
      icon {
        ${imageQuery}
      },
      title,
      description,
      link {
        ${linkQuery}
      }
    }
  }
`;
