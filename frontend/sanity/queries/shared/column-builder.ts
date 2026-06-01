import { imageQuery } from "./image";
import { linkQuery } from "./link";

export const columnBuilderQuery = `
  _type,
  _key,
  _type == "headingBlock" => {
    headingLevel,
    headingText
  },
  _type == "introContentBlock" => {
    eyebrowHeading,
    heading[]{
      ...
    },
    description
  },
  _type == "bodyBlock" => {
    content[]{ ... }
  },
  _type == "benefitListBlock" => {
    items[]{ _key, title, description }
  },
  _type == "unorderedList" => {
    listItems
  },
  _type == "orderedList" => {
    listItems
  },
  _type == "buttonGroupBlock" => {
    buttons[]{
      _key,
      isExternal,
      label,
      description,
      buttonVariant,
      target,
      ${linkQuery}
    }
  },
  _type == "tagBlock" => {
    tags[]{
      _key,
      label
    }
  },
  _type == "contactLinkBlock" => {
    links[]{
      _key,
      iconVariant,
      label,
      isExternal,
      target,
      ${linkQuery}
    }
  }
`;
