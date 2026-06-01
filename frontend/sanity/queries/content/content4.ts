import { columnBuilderQuery } from "../shared/column-builder";

export const content4Query = `
  _type == "content-4" => {
    _type,
    _key,
    padding,
    contentBlock[]{
      ${columnBuilderQuery}
    }
  }
`;
