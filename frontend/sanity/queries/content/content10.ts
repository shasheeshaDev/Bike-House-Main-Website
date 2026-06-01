export const content10Query = `
  _type == "content-10" => {
    _type,
    _key,
    padding,
    background,
    label,
    heading[]{
      ...
    },
    body,
    maxWidth
  }
`;
