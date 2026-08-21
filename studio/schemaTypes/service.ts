import { defineField, defineType } from "sanity";

/** A workshop service line. */
export const service = defineType({
  name: "service",
  title: "Service",
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
      name: "num",
      title: "Number",
      type: "string",
      description: 'Two digits shown above the card title — "01" … "08"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Cog (engine)", value: "cog" },
          { title: "Gauge (tuning)", value: "gauge" },
          { title: "CPU (diagnostics)", value: "cpu" },
          { title: "Suspension", value: "suspension" },
          { title: "Wrench (custom)", value: "wrench" },
          { title: "Droplet (oil)", value: "droplet" },
          { title: "Alert (accident)", value: "alert" },
          { title: "Disc (tire & chain)", value: "disc" },
        ],
      },
      initialValue: "wrench",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Card copy on the services grid.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Detail Headline",
      type: "string",
      description:
        'Display heading for the band on /services. Use a line break with \\n — e.g. "Dyno-mapped\\nor it didn\'t happen."',
    }),
    defineField({
      name: "intro",
      title: "Detail Intro",
      type: "text",
      rows: 3,
      description:
        "Lead paragraph on the service's own page, and the paragraph in the /services band.",
    }),
    defineField({
      name: "image",
      title: "Detail Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown beside the copy on /services. Falls back to the icon panel.",
    }),
    defineField({
      name: "readout",
      title: "Scan-tool Readout",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Optional monospace terminal lines rendered instead of the image — used by ECU Diagnostics.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "includes",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title", num: "num", subtitle: "description" },
    prepare: ({ title, num, subtitle }) => ({
      title: `${num ? `${num} · ` : ""}${title}`,
      subtitle,
    }),
  },
});
