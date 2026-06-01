import { defineType, defineField, defineArrayMember } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "content-6",
  type: "object",
  title: "Overlapping Images + List",
  description: "Overlapping image composition with heading, body text, and bullet list.",
  icon: LayoutGrid,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "visual", title: "Visual" },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    // Text side
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
    defineField({ name: "body", type: "text", title: "Body Text", group: "content", rows: 4 }),
    defineField({
      name: "listItems",
      type: "array",
      title: "Expertise List",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "buttons", type: "button-group", title: "CTA Buttons", group: "content" }),
    // Visual side
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      group: "visual",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "accentImage",
      type: "image",
      title: "Accent Image (overlapping)",
      group: "visual",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({ name: "statValue", type: "string", title: "Stat Value", description: 'e.g. "100%"', group: "visual" }),
    defineField({ name: "statLabel", type: "string", title: "Stat Label", description: 'e.g. "Tailored Strategy"', group: "visual" }),
  ],
  preview: {
    select: { heading: "heading", label: "label" },
    prepare({ heading, label }) {
      const text = heading?.flatMap((b: any) =>
        b._type === "block" ? b.children?.map((c: any) => c.text).join("") ?? "" : ""
      ).join(" ");
      return { title: "Overlapping Images + List", subtitle: text || label || "Image grid + expertise list" };
    },
  },
});
