import { defineType, defineField } from "sanity";
import { ListCheck } from "lucide-react";

export default defineType({
  name: "form-1",
  type: "object",
  title: "Form",
  description: "Form 1: Form with content.",
  icon: ListCheck,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "contentBlock",
      type: "column-builder",
      title: "Content Block",
      description: "",
    }),
    defineField({
      name: "form",
      type: "form",
      title: "Form",
    }),
  ],
  preview: {
    select: {
      title: "content.0.children.0.text",
    },
    prepare({ title }) {
      return {
        title: "Form",
        subtitle: title || "No Title",
      };
    },
  },
});
