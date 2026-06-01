import { defineType, defineField, defineArrayMember } from "sanity";
import { AlignCenter } from "lucide-react";

export default defineType({
  name: "content-10",
  type: "object",
  title: "Centered Text Section",
  description: "Centered label, heading, and body text — choose cream, white, or navy background.",
  icon: AlignCenter,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({
      name: "background",
      type: "string",
      title: "Background",
      group: "block-settings",
      initialValue: "cream",
      options: {
        list: [
          { title: "Cream", value: "cream" },
          { title: "White", value: "white" },
          { title: "Navy", value: "navy" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: 'Small eyebrow label e.g. "Our Vision"',
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
      name: "maxWidth",
      type: "string",
      title: "Content Max Width",
      group: "block-settings",
      initialValue: "760px",
      options: {
        list: [
          { title: "Narrow (600px)", value: "600px" },
          { title: "Default (760px)", value: "760px" },
          { title: "Wide (900px)", value: "900px" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { heading: "heading", label: "label", background: "background" },
    prepare({ heading, label, background }) {
      const text = heading
        ?.flatMap((b: any) =>
          b._type === "block" ? b.children?.map((c: any) => c.text).join("") ?? "" : ""
        )
        .join(" ");
      return {
        title: "Centered Text Section",
        subtitle: text || label || `${background ?? "cream"} bg`,
      };
    },
  },
});
