import { defineField, defineType } from "sanity";

/**
 * A motorcycle on the showroom floor.
 *
 * Field set mirrors the Bike type in the frontend's lib/types.ts — the two are
 * one contract, so a page renders identically from Sanity or from the fallback
 * bundle. Brand and body type are plain strings rather than references: the
 * filter facets are derived from the returned rows, so a taxonomy document
 * would add a join without adding a capability.
 */
export const bike = defineType({
  name: "bike",
  title: "Bike",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "specs", title: "Specifications" },
    { name: "sales", title: "Pricing & Status" },
  ],
  fields: [
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      description: 'Model only, without the brand — e.g. "S1000RR M-Sport"',
      group: "overview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: {
        source: (doc) => `${doc.model ?? ""} ${doc.year ?? ""}`.trim(),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      description: 'e.g. "BMW", "Ducati"',
      group: "overview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Body Type",
      type: "string",
      description: 'e.g. "Superbike", "Supermoto", "Naked"',
      group: "overview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "overview",
      validation: (Rule) =>
        Rule.required().integer().min(1950).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      group: "overview",
      initialValue: 100,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
      description: "The story of this bike — shown under 'About this bike'.",
      group: "overview",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "overview",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      description: "First image is the card thumbnail and social preview.",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "overview",
      validation: (Rule) => Rule.min(1).error("Add at least one photo"),
    }),

    defineField({
      name: "engineCc",
      title: "Engine Capacity (cc)",
      type: "number",
      group: "specs",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "mileageKm",
      title: "Mileage (km)",
      type: "number",
      group: "specs",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "power",
      title: "Power",
      type: "string",
      description: 'e.g. "207 hp @ 13,500 rpm"',
      group: "specs",
    }),
    defineField({
      name: "torque",
      title: "Torque",
      type: "string",
      description: 'e.g. "113 Nm @ 11,000 rpm"',
      group: "specs",
    }),
    defineField({
      name: "weight",
      title: "Kerb Weight",
      type: "string",
      description: 'e.g. "197 kg"',
      group: "specs",
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
      group: "specs",
    }),
    defineField({ name: "colour", title: "Colour", type: "string", group: "specs" }),

    defineField({
      name: "price",
      title: "Price (LKR)",
      type: "number",
      description: "Whole rupees, no separators.",
      group: "sales",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "status",
      title: "Availability",
      type: "string",
      group: "sales",
      initialValue: "available",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Reserved", value: "reserved" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "registered",
      title: "Registered",
      type: "boolean",
      description: "Off means the buyer handles registration.",
      group: "sales",
      initialValue: true,
    }),
    defineField({
      name: "registrationNumber",
      title: "Registration Number",
      type: "string",
      description: 'Partially masked is fine — e.g. "CBN-XXXX"',
      group: "sales",
      hidden: ({ document }) => !document?.registered,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Corner ribbon on the card.",
      group: "sales",
      options: {
        list: ["Featured", "Just In", "Low KM", "Garage Pick", "Price Drop"],
      },
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      group: "sales",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      model: "model",
      brand: "brand",
      year: "year",
      price: "price",
      status: "status",
      media: "gallery.0",
    },
    prepare({ model, brand, year, price, status, media }) {
      const priceLabel =
        typeof price === "number" ? `LKR ${price.toLocaleString("en-LK")}` : "No price";
      return {
        title: [brand, model].filter(Boolean).join(" "),
        subtitle: `${year ?? "—"} · ${priceLabel}${
          status && status !== "available" ? ` · ${String(status).toUpperCase()}` : ""
        }`,
        media,
      };
    },
  },
});
