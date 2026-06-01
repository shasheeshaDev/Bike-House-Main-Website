export const servicesList1Query = `
  _type == "services-list-1" => {
    _type,
    _key,
    "services": *[_type == "service"] | order(orderRank asc) {
      _id,
      title,
      slug,
      description,
      tags[]->{ _id, title, slug }
    }
  }
`;
