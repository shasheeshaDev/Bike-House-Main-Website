export const card6Query = `
  _type == "card-6" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    steps[]{
      _key,
      number,
      stepLabel,
      title,
      body
    }
  }
`;
