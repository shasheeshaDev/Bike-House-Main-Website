export const content7Query = `
  _type == "content-7" => {
    _type,
    _key,
    padding,
    leftPanel {
      label,
      heading[]{
        ...
      },
      items
    },
    rightPanel {
      label,
      heading[]{
        ...
      },
      items
    }
  }
`;
