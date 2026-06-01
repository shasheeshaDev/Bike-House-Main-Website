export const content1Query = `
  _type == "content-1" => {
    _type,
    _key,
    padding,
    eyebrowHeading,
    heading[]{
      ...
    },
    description
  }
`;
