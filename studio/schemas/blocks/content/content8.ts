import { defineType, defineField } from "sanity";
import { Columns2 } from "lucide-react";

export default defineType({
  name: "content-8",
  type: "object",
  title: "Light Split",
  description: "Two-column layout — column-builder text on one side, image on the other.",
  icon: Columns2,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    defineField({
      name: "textContent",
      type: "column-builder",
      title: "Text Content",
      description: "Add Intro Content, Body Text, Benefit List, Button Group, etc.",
      group: "content",
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
      group: "block-settings",
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
    select: { imagePosition: "imagePosition" },
    prepare({ imagePosition }) {
      return {
        title: "Light Split",
        subtitle: `Image ${imagePosition ?? "right"}`,
      };
    },
  },
});
