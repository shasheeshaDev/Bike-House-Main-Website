import { defineType, defineField, defineArrayMember } from "sanity";
import { PanelLeftClose } from "lucide-react";

const panelFields = [
  defineField({ name: "label", type: "string", title: "Label" }),
  defineField({
    name: "heading",
    type: "array",
    title: "Heading",
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
    title: "Bullet Items",
    of: [defineArrayMember({ type: "string" })],
  }),
];

export default defineType({
  name: "content-7",
  type: "object",
  title: "Comparison Panels",
  description: "Side-by-side comparison — navy dark panel and cream light panel, each with label, heading, and list.",
  icon: PanelLeftClose,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({
      name: "leftPanel",
      type: "object",
      title: "Left Panel (Dark)",
      group: "content",
      fields: panelFields,
    }),
    defineField({
      name: "rightPanel",
      type: "object",
      title: "Right Panel (Light)",
      group: "content",
      fields: panelFields,
    }),
  ],
  preview: {
    select: { left: "leftPanel.label", right: "rightPanel.label" },
    prepare({ left, right }) {
      return { title: "Comparison Panels", subtitle: [left, right].filter(Boolean).join(" vs ") || "Split comparison" };
    },
  },
});
