import { backgroundQuery } from "../shared/background";
import { buttonQuery } from "../shared/button";

export const banner2Query = `
  _type == "banner-2" => {
    _type,
    _key,
    padding,
    eyebrowHeading,
    heading,
    description,
    buttons[]{
      ${buttonQuery}
    },
    background {
      ${backgroundQuery}
    }
  }
`;
