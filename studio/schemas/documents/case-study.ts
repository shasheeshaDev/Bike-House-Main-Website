import { defineField, defineType, defineArrayMember } from "sanity";
import { BarChart } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../common/meta";
import image from "../common/image";

export default defineType({
  name: "case-study",
  title: "Case Study",
  type: "document",
  icon: BarChart,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Property Name",
      type: "string",
      description: 'e.g. "Lario Resort"',
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Sigiriya, Sri Lanka"',
      group: "content",
    }),
    image,
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "strategy",
      title: "The Strategy",
      type: "text",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "results",
      title: "Results Achieved",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Full Case Study Body",
      type: "block-content",
      group: "content",
    }),
    meta,
    orderRankField({ type: "case-study" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
