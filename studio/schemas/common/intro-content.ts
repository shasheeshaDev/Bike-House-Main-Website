import { defineField, defineType } from "sanity";

export default defineType({
  name: "intro-content",
  type: "object",
  title: "Intro Content",
  fields: [
    defineField({
      name: "isIntroContent",
      type: "boolean",
      title: "Enable Intro Content",
      description: "Toggle to show intro content section",
      initialValue: false,
    }),

    defineField({
      name: "eyebrowHeading",
      type: "string",
      title: "Eyebrow Heading",
      description: "Small text displayed above the main heading",
      hidden: ({ parent }) => !parent?.isIntroContent,
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
      hidden: ({ parent }) => !parent?.isIntroContent,
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
      hidden: ({ parent }) => !parent?.isIntroContent,
      validation: (Rule) => Rule.max(500).warning("Description should be 500 characters or less."),
    }),
  ],
});