import { imageQuery } from "../shared/image";
import { columnBuilderQuery } from "../shared/column-builder";

export const collection1Query = `
  _type == "collection-1" => {
    _type,
    _key,
    padding,
    collections[]->{
      _id,
      name,
      location,
      image {
        ${imageQuery}
      },
      contentBlock[]{
        ${columnBuilderQuery}
      }
    }
  }
`;
