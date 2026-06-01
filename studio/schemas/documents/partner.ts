import { defineField, defineType } from "sanity";
import { Hotel } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../common/meta";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: Hotel,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Property Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Sigiriya, Sri Lanka"',
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "partner-category" }],
      group: "settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partnerSince",
      title: "Partner Since",
      type: "string",
      description: 'Year or period — e.g. "2022" or "Q1 2023"',
      group: "settings",
    }),

    // ── Media ─────────────────────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Thumbnail Image",
      description: "Used on the partners grid cards (aspect 4:3 recommended)",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured / Banner Image",
      description: "Hero background on the partner detail page (wide landscape recommended)",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "factSheet",
      title: "Fact Sheet (PDF)",
      description: "Downloadable property fact sheet — PDF only",
      type: "file",
      group: "media",
      options: { accept: "application/pdf" },
      fields: [
        {
          name: "title",
          type: "string",
          title: "File Title",
          description: 'e.g. "Lario Resort Fact Sheet 2026"',
        },
      ],
    }),

    // ── Content ───────────────────────────────────────────────────────────
    defineField({
      name: "excerpt",
      title: "Short Description",
      description: "Shown below the heading on the detail page — supports bold, italic, and links",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "servicesProvided",
      title: "Services We Provide",
      description: "Select the EH services delivered to this partner",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "website",
      title: "Property Website URL",
      type: "url",
      group: "content",
    }),
    defineField({
      name: "enquiryForm",
      title: "Book / Enquire Form",
      type: "object",
      description: "Select the form to display in the Book or Enquire sidebar on this partner page.",
      group: "settings",
      fields: [
        defineField({
          name: "selectedFormConfig",
          title: "Form Configuration",
          description: "Email settings — recipient, subject, from name",
          type: "reference",
          to: [{ type: "formConfig" }],
        }),
        defineField({
          name: "selectedFormSheet",
          title: "Form Fields",
          description: "The set of fields to display in the form",
          type: "reference",
          to: [{ type: "formSheet" }],
        }),
      ],
    }),
    meta,
    orderRankField({ type: "partner" }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "image" },
  },
});
