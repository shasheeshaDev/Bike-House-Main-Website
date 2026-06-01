import { linkQuery } from "./link";

export const buttonQuery = `
  _key,
  isExternal,
  label,
  description,
  buttonVariant,
  target,
  ${linkQuery}
`;

export const buttonGroupQuery = `
  buttons[]{
    ${buttonQuery}
  }
`;
