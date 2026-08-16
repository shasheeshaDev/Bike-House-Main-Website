import { defineField, defineType } from "sanity";

/** A customer review. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'Surname initial is fine — e.g. "Dilshan W."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Bike",
      type: "string",
      description: 'Shown under the name — e.g. "Owner · BMW S1000RR"',
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Out of 5. Leave empty to hide the stars.",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
