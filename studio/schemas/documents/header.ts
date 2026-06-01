import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link-with-label" }, { type: "link-group" }],
    }),
    defineField({
      name: "ctaLinks",
      title: "CTA Links",
      type: "button-group",
      validation: rule => rule.max(1)
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header" };
    },
  },
});
