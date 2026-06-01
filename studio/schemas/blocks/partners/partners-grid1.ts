import { defineType, defineField, defineArrayMember } from "sanity";
import { Grid3x3 } from "lucide-react";

export default defineType({
  name: "partners-grid-1",
  type: "object",
  title: "Partners Grid",
  description: "Partner cards — choose which category to display, with optional heading and body.",
  icon: Grid3x3,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({
      name: "category",
      title: "Category to Display",
      description: "Choose a specific category to filter partners, or leave blank to show all.",
      type: "reference",
      to: [{ type: "partner-category" }],
      group: "content",
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Eyebrow Label",
      description: 'Small label above the heading e.g. "Popular Picks"',
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
      name: "body",
      type: "text",
      title: "Body Text",
      rows: 3,
      group: "content",
    }),
  ],
  preview: {
    select: { heading: "heading.0.children.0.text", label: "label", catTitle: "category.title" },
    prepare({ heading, label, catTitle }) {
      return { title: "Partners Grid", subtitle: heading || label || catTitle || "All Partners" };
    },
  },
});
