import { imageQuery } from "../shared/image";

export const teamMembers2Query = `
  _type == "team-members-2" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    description,
    "members": *[_type == "team-member" && (isFeatured != true)] | order(orderRank asc) {
      _id,
      name,
      initials,
      role,
      bio,
      expertise,
      avatar {
        ${imageQuery}
      }
    }
  }
`;
