import { defineField, defineType } from "sanity";
import { ICON_VARIANTS } from "./icon-variants";

export default defineType({
  name: "button",
  type: "object",
  title: "Button",
  fields: [
    // defineField({
    //   name: "iconVariant",
    //   type: "string",
    //   title: "Icon Variant",
    //   options: {
    //     list: ICON_VARIANTS.map(({ title, value }) => ({ title, value })),
    //   },
    //   initialValue: "none",
    // }),
    defineField({
      name: "buttonVariant",
      type: "button-variant",
      title: "Button Variant",
    }),
    defineField({
      name: "buttonSize",
      type: "string",
      title: "Button Size",
      initialValue: "sm",
      options: {
        list:[
        {title: "Large", value: "lg"},
        {title: "Small", value: "sm"},
      ],
      layout: "radio"
      },
      hidden: ({ parent }) => !["primary", "secondary"].includes(parent?.buttonVariant),
    }),
    defineField({
      name: "isExternal",
      type: "boolean",
      title: "Is External",
      initialValue: false,
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal Page",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: "sectionAnchor",
      title: "Section on Page",
      type: "string",
      description: 'Optional section ID — e.g. "book" for /contact#book. Do not include the #.',
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      description: "The description of the link. Used for navigation items.",
    }),
    defineField({
      name: "href",
      title: "href",
      type: "url",
      hidden: ({ parent }) => !parent?.isExternal,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "target",
      type: "boolean",
      title: "Open in new tab",
      hidden: ({ parent }) => !parent?.isExternal,
    }),
  ],
});
