import { defineType, defineField } from "sanity";
import { Trophy } from "lucide-react";

export default defineType({
  name: "case-studies-1",
  type: "object",
  title: "Case Studies Grid",
  description: "Case study cards — auto-fetches all Case Study documents.",
  icon: Trophy,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: "Optional section eyebrow label",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Case Studies Grid", subtitle: "Fetches all case study documents" };
    },
  },
});
