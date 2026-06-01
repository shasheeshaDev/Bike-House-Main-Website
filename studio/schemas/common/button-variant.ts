import { defineType } from "sanity";

export const BUTTON_VARIANTS = [
  { title: "Default", value: "default" },
  { title: "Primary", value: "primary" },
  { title: "Secondary", value: "secondary" },
  { title: "Outline", value: "outline" },
  { title: "Seccondary Outline", value: "secondary_outline" },
  { title: "Link", value: "link" },
  { title: "Seccondary Link", value: "secondary_link" },
  { title: "Ghost", value: "ghost" },
];

export const buttonVariant = defineType({
  name: "button-variant",
  title: "Button Variant",
  type: "string",
  options: {
    list: BUTTON_VARIANTS.map(({ title, value }) => ({ title, value })),
  },
  initialValue: "default",
});
