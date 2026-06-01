import { defineField, defineType } from "sanity";
import { Navigation } from "lucide-react";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: Navigation,
  groups: [
    { name: "nav",     title: "Navigation", default: true },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // ── Nav links ──────────────────────────────────────────────────────────
    defineField({
      name: "links",
      title: "Navigation Links",
      type: "array",
      group: "nav",
      description: "Flat links only — Bike House header does not use dropdown groups.",
      of: [{ type: "link-with-label" }],
    }),
    defineField({
      name: "ctaLinks",
      title: "CTA Button",
      description: "Shown as a filled red button in the top-right — e.g. "Book a Service". Maximum 1.",
      type: "button-group",
      group: "nav",
      validation: (rule) => rule.max(1),
    }),

    // ── Contact info (shown in header & mobile menu) ────────────────────────
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      group: "contact",
      description: "Display text shown next to the phone icon — e.g. +94 77 123 4567",
    }),
    defineField({
      name: "whatsappHref",
      title: "WhatsApp Link",
      type: "url",
      group: "contact",
      description: "Full WhatsApp URL — e.g. https://wa.me/94771234567",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https", "http"] }).optional(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header" };
    },
  },
});
