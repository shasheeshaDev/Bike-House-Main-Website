import { imageQuery } from "../shared/image";

export const partnersGrid1Query = `
  _type == "partners-grid-1" => {
    _type,
    _key,
    "category": category->{ _id, title, slug },
    label,
    heading[]{
      ...
    },
    body,
    "partners": *[
      _type == "partner" &&
      (!defined(^.category) || category._ref == ^.category._ref)
    ] | order(orderRank asc) {
      _id,
      name,
      slug,
      location,
      "category": category->{ _id, title, slug },
      image {
        ${imageQuery}
      }
    }
  }
`;
