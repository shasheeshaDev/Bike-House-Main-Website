export const careersList1Query = `
  _type == "careers-list-1" => {
    _type,
    _key,
    label,
    heading[]{
      ...
    },
    description,
    bottomNote,
    speculativeEmail,
    "careers": *[_type == "career" && isActive == true] | order(orderRank asc) {
      _id,
      title,
      slug,
      department,
      employmentType,
      location
    }
  }
`;
