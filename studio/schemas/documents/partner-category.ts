import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "partner-category",
  title: "Partner Category",
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    orderRankField({ type: "partner-category" }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title };
    },
  },
});
