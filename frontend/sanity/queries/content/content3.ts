import { imageQuery } from "../shared/image";
import { columnBuilderQuery } from "../shared/column-builder";

export const content3Query = `
  _type == "content-3" => {
    _type,
    _key,
    padding,
    contentBlock[]{
      ${columnBuilderQuery}
    },
    imageBlock {
      ${imageQuery}
    }
  }
`;
