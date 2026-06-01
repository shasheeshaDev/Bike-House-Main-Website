import { backgroundQuery } from "../shared/background";
import { buttonQuery } from "../shared/button";

export const banner1Query = `
  _type == "banner-1" => {
    _type,
    _key,
    padding,
    eyebrowHeading,
    heading[]{
      ...
    },
    subText,
    buttons[]{
      ${buttonQuery}
    },
    scrollIndicatorText,
    background {
      ${backgroundQuery}
    }
  }
`;
