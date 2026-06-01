import { imageQuery } from "../shared/image";
import { columnBuilderQuery } from "../shared/column-builder";

export const content2Query = `
  _type == "content-2" => {
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
