import { defineType, defineField, defineArrayMember } from "sanity";
import { Columns2 } from "lucide-react";

export default defineType({
  name: "content-5",
  type: "object",
  title: "Dark Split",
  description: "Two-column layout — navy dark panel on one side, image on the other.",
  icon: Columns2,
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
      description: 'Small eyebrow label e.g. "The Challenge"',
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
      group: "content",
      rows: 5,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      title: "Image Position",
      group: "content",
      initialValue: "right",
      options: {
        list: [
          { title: "Image Right", value: "right" },
          { title: "Image Left", value: "left" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { heading: "heading", label: "label" },
    prepare({ heading, label }) {
      const text = heading?.flatMap((b: any) =>
        b._type === "block" ? b.children?.map((c: any) => c.text).join("") ?? "" : ""
      ).join(" ");
      return { title: "Dark Split", subtitle: text || label || "Two-col text + image" };
    },
  },
});
