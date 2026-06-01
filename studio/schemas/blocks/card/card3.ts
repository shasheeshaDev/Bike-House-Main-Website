import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "card-3",
  type: "object",
  title: "Info Cards",
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
      name: "eyebrowHeading",
      type: "string",
      title: "Eyebrow Heading",
      description: "Small text displayed above the main heading",
      group: "content",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.isIntroContent && value && value.length > 50) {
            return "Eyebrow heading should be 50 characters or less.";
          }
          return true;
        }),
    }),

    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      description: "Main heading text",
      group: "content",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.isIntroContent && !value) {
            return "Heading is required when intro content is enabled.";
          }
          if (value && value.length > 150) {
            return "Heading should be 150 characters or less.";
          }
          return true;
        }),
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Supporting description text",
      group: "content",
      validation: (Rule) => Rule.max(500).warning("Description should be 500 characters or less."),
    }),
    defineField({
      name: "buttons",
      type: "button-group",
      title: "Buttons",
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
    defineField({
      name: "background",
      type: "background",
      title: "Background",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title1: "heading",
      title2: "eyebrowHeading",
      title3: "description",
    },
    prepare({ title1, title2, title3 }) {
      return {
        title: "Info Cards",
        subtitle: title1 || title2 || title3 || "No content",
      };
    },
  },
});
