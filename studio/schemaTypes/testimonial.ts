import { defineField, defineType } from "sanity";

/**
 * A customer review.
 *
 * Two origins share this type. Hand-written testimonials are authored here;
 * Google ones are written by frontend/scripts/sync-google-reviews.mjs from the
 * workshop's own Business Profile. The sync owns only the fields Google is
 * authoritative for — quote, rating, author, date — and never touches `order`,
 * `role` or `featured`, so curation done in the Studio survives a re-sync.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Written here", value: "manual" },
          { title: "Google review", value: "google" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
      validation: (Rule) => Rule.required(),
    }),
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
      description: "A Google review is stored in full; the card clamps it visually.",
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (context.document?.source === "google") return true;
          return (value ?? "").length <= 600
            ? true
            : "Keep a written testimonial under 600 characters.";
        }),
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
      description: "Never overwritten by the Google sync — this stays your call.",
      initialValue: true,
    }),

    defineField({
      name: "publishedAt",
      title: "Reviewed On",
      type: "datetime",
      description: "When the review was left. Set from Google on synced reviews.",
    }),
    defineField({
      name: "authorPhoto",
      title: "Author Photo URL",
      type: "url",
      description: "Reviewer's Google profile picture. Credited on the card.",
      hidden: ({ document }) => document?.source !== "google",
    }),
    defineField({
      name: "reviewUrl",
      title: "Review URL",
      type: "url",
      description: "Link to the review on Google, so the quote can be checked.",
      hidden: ({ document }) => document?.source !== "google",
    }),
    defineField({
      name: "googleReviewId",
      title: "Google Review ID",
      type: "string",
      description:
        "Set by the sync and used to match the review on the next run. Do not edit.",
      readOnly: true,
      hidden: ({ document }) => document?.source !== "google",
    }),
  ],
  preview: {
    select: { title: "name", role: "role", source: "source", rating: "rating" },
    prepare: ({ title, role, source, rating }) => ({
      title,
      subtitle: [
        source === "google" ? "Google" : null,
        typeof rating === "number" ? `${rating}★` : null,
        role,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
