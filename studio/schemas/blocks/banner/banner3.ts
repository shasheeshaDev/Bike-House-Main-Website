import { defineType, defineField, defineArrayMember } from "sanity";
import { Flag } from "lucide-react";

export default defineType({
  name: "banner-3",
  type: "object",
  title: "Page Hero",
  description: "Banner 3: Interior Page Hero — shorter hero for inner pages",
  icon: Flag,
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
      description: 'Small eyebrow label e.g. "What We Do"',
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
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: "content",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { heading: "heading", label: "label" },
    prepare({ heading, label }) {
      const text = heading?.flatMap((b: any) =>
        b._type === "block" ? b.children?.map((c: any) => c.text).join("") ?? "" : ""
      ).join(" ");
      return { title: "Page Hero", subtitle: text || label || "Page Hero" };
    },
  },
});
