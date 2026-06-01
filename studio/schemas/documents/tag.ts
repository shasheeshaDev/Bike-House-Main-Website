import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
