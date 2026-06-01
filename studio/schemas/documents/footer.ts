import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: LayoutTemplate,
  groups: [
    { name: "brand",   title: "Brand",   default: true },
    { name: "nav",     title: "Navigation" },
    { name: "contact", title: "Contact" },
    { name: "bottom",  title: "Bottom Bar" },
  ],
  fields: [
    // ── Brand column ───────────────────────────────────────────────────────
    defineField({
      name: "description",
      title: "Brand Description",
      type: "text",
      rows: 3,
      group: "brand",
      description: "Short tagline shown below the logo.",
    }),
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "social-media-links",
      group: "brand",
    }),

    // ── Navigation columns ─────────────────────────────────────────────────
    defineField({
      name: "navColumns",
      title: "Navigation Columns",
      type: "array",
      group: "nav",
      description: "Each entry is one column (e.g. Workshop, Marketplace). Max 2.",
      of: [{ type: "link-group" }],
      validation: (Rule) => Rule.max(2),
    }),

    // ── Contact column ─────────────────────────────────────────────────────
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "columnTitle", title: "Column Heading", type: "string", initialValue: "Contact" }),
        defineField({ name: "address",     title: "Address",         type: "string" }),
        defineField({ name: "phone",       title: "Phone (display)", type: "string", description: "e.g. +94 77 123 4567" }),
        defineField({ name: "email",       title: "Email Address",   type: "string" }),
        defineField({ name: "hours",       title: "Opening Hours",   type: "string", description: "e.g. Mon–Sat · 08:30 – 19:00" }),
      ],
    }),

    // ── Bottom bar ─────────────────────────────────────────────────────────
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      group: "bottom",
      description: 'Shown left — year is prepended automatically. e.g. "BIKE HOUSE LK — All rights reserved."',
      initialValue: "BIKE HOUSE LK — All rights reserved.",
    }),
    defineField({
      name: "credits",
      title: "Credits",
      type: "array",
      group: "bottom",
      description: 'Each entry renders as "{Prefix text} {Link label}" separated by ·  e.g. "Web Solution by Enrol Solutions"',
      of: [
        {
          type: "object",
          name: "credit",
          fields: [
            defineField({ name: "prefix", title: "Prefix Text", type: "string", description: 'e.g. "Web Solution by"' }),
            defineField({ name: "label",  title: "Link Label",  type: "string", description: 'e.g. "Enrol Solutions"' }),
            defineField({ name: "href",   title: "URL",          type: "url" }),
          ],
          preview: {
            select: { prefix: "prefix", label: "label" },
            prepare({ prefix, label }: { prefix?: string; label?: string }) {
              return { title: [prefix, label].filter(Boolean).join(" ") };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
