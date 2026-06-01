import { defineType, defineField, defineArrayMember } from "sanity";
import { BarChart2 } from "lucide-react";

export default defineType({
  name: "stats-2",
  type: "object",
  title: "Stats with Text",
  description: "Navy two-column layout — heading + body text on the left, stats grid on the right.",
  icon: BarChart2,
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
      description: 'Small eyebrow label e.g. "Why Work With Us"',
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
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      description: "Add up to 4 stats for the right-side grid.",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "statItem",
          fields: [
            defineField({ name: "value", type: "string", title: "Value", description: 'e.g. "20+", "Global", "100%"', validation: (Rule) => Rule.required() }),
            defineField({ name: "label", type: "string", title: "Label", description: 'e.g. "Partner Hotels"', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare({ value, label }) {
              return { title: value, subtitle: label };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: { label: "label", heading: "heading" },
    prepare({ label, heading }) {
      const text = heading
        ?.flatMap((b: any) =>
          b._type === "block" ? b.children?.map((c: any) => c.text).join("") ?? "" : ""
        )
        .join(" ");
      return { title: "Stats with Text", subtitle: text || label || "Navy stats + text" };
    },
  },
});
