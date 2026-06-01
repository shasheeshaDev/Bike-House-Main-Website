import { defineType, defineField, defineArrayMember } from "sanity";
import { Presentation } from "lucide-react";

export default defineType({
  name: "careers-list-1",
  type: "object",
  title: "Careers List",
  description: "Active job listings on a navy background — auto-fetches active Career documents.",
  icon: Presentation,
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
      description: 'Eyebrow label e.g. "Open Positions"',
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
      type: "text",
      title: "Description",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "bottomNote",
      type: "text",
      title: "Bottom Note",
      description: "Text shown below the job listings e.g. speculative application note",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "speculativeEmail",
      type: "string",
      title: "Speculative Application Email",
      description: 'Email linked in the bottom note e.g. "careers@elevatehospitality.com"',
      group: "content",
    }),
  ],
  preview: {
    select: { heading: "heading.0.children.0.text", label: "label" },
    prepare({ heading, label }) {
      return { title: "Careers List", subtitle: heading || label || "Fetches active career documents" };
    },
  },
});
