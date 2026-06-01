import { defineType, defineField, defineArrayMember } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "content-9",
  type: "object",
  title: "Values Grid",
  description: "Grid of up to 4 value or feature cards on a cream background with hover accent.",
  icon: LayoutGrid,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: 'Optional eyebrow label above the grid',
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "array",
      title: "Heading",
      description: "Optional section heading. Use Emphasis (italic) to highlight key words.",
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
      name: "items",
      type: "array",
      title: "Value Cards",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueItem",
          fields: [
            defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
            defineField({ name: "body", type: "text", title: "Description", rows: 3 }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { label: "label", items: "items" },
    prepare({ label, items }) {
      return { title: "Values Grid", subtitle: label || `${items?.length ?? 0} value cards` };
    },
  },
});
