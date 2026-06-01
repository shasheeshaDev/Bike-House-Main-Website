import { defineType, defineField, defineArrayMember } from "sanity";
import { Footprints } from "lucide-react";

export default defineType({
  name: "card-6",
  type: "object",
  title: "Framework Steps",
  description: "Numbered methodology or process steps displayed on a navy background.",
  icon: Footprints,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({ name: "label", type: "string", title: "Label", group: "content" }),
    defineField({
      name: "heading",
      type: "array",
      title: "Heading",
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
      name: "steps",
      type: "array",
      title: "Steps",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", type: "string", title: "Number", description: 'e.g. "01"' }),
            defineField({ name: "stepLabel", type: "string", title: "Step Label", description: 'e.g. "Step 1"' }),
            defineField({ name: "title", type: "string", title: "Title", description: 'e.g. "Evaluate"' }),
            defineField({ name: "body", type: "text", title: "Body", rows: 3 }),
          ],
          preview: {
            select: { num: "number", title: "title" },
            prepare({ num, title }) {
              return { title: `${num} – ${title}` };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: { heading: "heading", label: "label" },
    prepare({ heading, label }) {
      const text = heading?.flatMap((b: any) =>
        b._type === "block" ? b.children?.map((c: any) => c.text).join("") ?? "" : ""
      ).join(" ");
      return { title: "Framework Steps", subtitle: text || label || "Framework steps" };
    },
  },
});
