export const content9Query = `
  _type == "content-9" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    items[]{
      _key,
      title,
      body
    }
  }
`;
