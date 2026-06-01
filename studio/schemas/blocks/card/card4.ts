import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "card-4",
  type: "object",
  title: "Icon Cards",
  icon: Images,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "block-settings",
      title: "Block Settings",
    },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    defineField({
      name: "introContent",
      type: "intro-content",
      title: "Intro Content",
      group: "content",
    }),
    defineField({
      name: "cards",
      type: "array",
      description: "",
      group: "content",
      of: [
        defineField({
          name: "card",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "image",
              title: "Icon",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
            }),
            defineField({
              name: "link",
              type: "link-with-label",
              title: "Link",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title1: "introContent.heading",
      title2: "introContent.eyebrowHeading",
      title3: "introContent.description",
    },
    prepare({ title1, title2, title3 }) {
      return {
        title: "Icon Cards",
        subtitle: title1 || title2 || title3 || "No content",
      };
    },
  },
});
