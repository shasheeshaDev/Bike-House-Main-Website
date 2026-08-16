import { defineField, defineType } from "sanity";

/** A Journal article. */
export const post = defineType({
  name: "post",
  title: "Journal Article",
  type: "document",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Card summary and meta-description fallback.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'e.g. "Diagnostics", "Builds", "Touring"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published On",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "7 min read"',
    }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Tie-breaker when two articles share a date.",
      initialValue: 100,
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      description: "16:9 works best — used on cards and as the social preview.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "featured",
      title: "Feature at top of Journal",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: { title: "title", category: "category", publishedAt: "publishedAt", media: "image" },
    prepare({ title, category, publishedAt, media }) {
      return {
        title,
        subtitle: [category, publishedAt].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
