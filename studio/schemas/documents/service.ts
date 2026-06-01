import { defineField, defineType } from "sanity";
import { Briefcase } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../common/meta";
import image from "../common/image";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: Briefcase,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "description",
      title: "Short Description",
      type: "text",
      description: "Shown on the services list page",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      description: "Select reusable tags from the Tags library",
    }),
    // ── Media ────────────────────────────────────────────────────────────
    {
      ...image,
      title: "Thumbnail Image",
      description: "Used on the services list (card thumbnail)",
      group: "media",
    } as ReturnType<typeof defineField>,
    defineField({
      name: "featuredImage",
      title: "Featured / Banner Image",
      description: "Hero background on the service detail page (wide landscape recommended)",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
      group: "content",
    }),
    meta,
    orderRankField({ type: "service" }),
  ],
  preview: {
    select: { title: "title", num: "number", media: "image" },
    prepare({ title, num, media }) {
      return { title, subtitle: num ? `#${num}` : "", media };
    },
  },
});
