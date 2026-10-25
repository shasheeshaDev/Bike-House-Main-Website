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
          { title: "Disc (brake / sprocket)", value: "disc" },
          { title: "Bolt (electrical)", value: "bolt" },
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
      name: "background",
      title: "Card Background",
      type: "object",
      description:
        "Optional image or video behind the card on the services grid. Dimmed by " +
        "an overlay at rest; the overlay lifts on hover (desktop) or when the " +
        "card scrolls into view (mobile), and a video plays only while active.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "kind",
          title: "Media Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
            layout: "radio",
          },
          initialValue: "image",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "image",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
          description: "Rendered with object-fit: cover, so favour a landscape crop.",
          hidden: ({ parent }) => parent?.kind !== "image",
        }),
        defineField({
          name: "video",
          title: "Background Video",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
          description:
            "Keep it short, silent and small — a few seconds, under ~2 MB. It is " +
            "muted and looped, and only loads its metadata until the card is active.",
          hidden: ({ parent }) => parent?.kind !== "video",
        }),
        defineField({
          name: "poster",
          title: "Video Poster",
          type: "image",
          options: { hotspot: true },
          description:
            "Frame shown while the video is paused. Without one the card shows the " +
            "first decodable frame, which browsers render inconsistently.",
          hidden: ({ parent }) => parent?.kind !== "video",
        }),
      ],
      // The chosen type has to carry its asset, or the card renders an empty
      // overlay — the same "a field added here must exist everywhere" rule the
      // fallback contract applies to the data shape.
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          const bg = value as { kind?: string; image?: unknown; video?: unknown };
          if (!bg.kind) return true;
          if (bg.kind === "image" && !bg.image) return "Add a background image, or clear the media type.";
          if (bg.kind === "video" && !bg.video) return "Add a background video, or clear the media type.";
          return true;
        }),
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
      name: "gallery",
      title: "Gallery",
      type: "array",
      description:
        "Work from this service line, shown as a masonry wall on the service's " +
        "own page. Photo heights vary by design — a mix of portrait and " +
        "landscape reads better than a uniform set.",
      of: [
        defineField({
          name: "shot",
          title: "Photo",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "story",
              title: "Story",
              type: "text",
              rows: 3,
              description:
                "Optional. What the photo shows, or what happened on this job — " +
                "printed under the photo. Leave empty for a picture that speaks " +
                "for itself.",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description:
                "For screen readers. Optional when there is a story, which is " +
                "read in its place.",
            }),
          ],
          preview: {
            select: { media: "image", story: "story", alt: "alt" },
            prepare: ({ media, story, alt }) => ({
              title: alt || story || "Photo",
              subtitle: story ? "Has story" : "No story",
              media,
            }),
          },
        }),
      ],
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
