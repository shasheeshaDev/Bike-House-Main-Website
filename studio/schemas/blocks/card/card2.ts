import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "card-2",
  type: "object",
  title: "Feature Cards",
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
            defineField({
              name: "backgroundImage",
              type: "image",
              title: "Background Image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                },
              ],
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
        title: "Feature Cards",
        subtitle: title1 || title2 || title3 || "No content",
      };
    },
  },
});
