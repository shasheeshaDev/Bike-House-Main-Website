export const stats2Query = `
  _type == "stats-2" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    body,
    stats[]{
      _key,
      value,
      label
    }
  }
`;
