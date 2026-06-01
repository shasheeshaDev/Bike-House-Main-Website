import { defineType, defineField, defineArrayMember } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "content-1",
  type: "object",
  title: "Split Content",
  description: "",
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
      description: "",
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "array",
      title: "Heading",
      description: "Use Emphasis (italic) to highlight key words.",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: "description",
      type: "block-content",
      title: "Content",
      description:
        "",
      group: "content",
    }),
  ],
  preview: {
    select: {
      heading: "heading.0.children.0.text",
      eyebrow: "eyebrowHeading",
      description: "description.0.children.0.text",
    },
    prepare({ heading, eyebrow, description }) {
      return {
        title: "Split Content",
        subtitle: heading || eyebrow || description || "No content",
      };
    },
  },
});
