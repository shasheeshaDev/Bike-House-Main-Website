import { defineField, defineType, defineArrayMember } from "sanity";
import { Settings } from "lucide-react";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "branding", title: "Branding", default: true },
    { name: "site", title: "Site Info" },
    { name: "cta", title: "Global CTA" },
  ],
  fields: [
    // ── Branding ───────────────────────────────────────────────────────────
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "branding",
      description: "Used in the browser tab, footer copyright, and metadata",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "logo",
      title: "Logo (Light)",
      description: "White / light version — used on dark backgrounds (header, hero)",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "logoDark",
      title: "Logo (Dark)",
      description: "Dark version — used on light backgrounds",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      description: "Logo displayed in the footer (light version recommended)",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description: "Square icon shown in the browser tab (min 32×32 px, PNG or SVG recommended)",
      type: "image",
      group: "branding",
      options: { hotspot: false },
    }),

    // ── Site Info ──────────────────────────────────────────────────────────
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      group: "site",
      description: 'Production URL — e.g. "https://elevatehospitality.com"',
    }),
    defineField({
      name: "siteDescription",
      title: "Default Meta Description",
      type: "text",
      group: "site",
      rows: 3,
      description: "Fallback meta description used when a page has no custom SEO description",
      validation: (Rule) => Rule.max(160).warning("Keep under 160 characters for best SEO results"),
    }),
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "social-media-links",
      group: "site",
    }),

    // ── Global Pre-footer CTA ──────────────────────────────────────────────
    defineField({
      name: "prefooterCta",
      title: "Pre-footer CTA",
      description: "Content shown in the call-to-action section above the footer on pages that enable it",
      type: "object",
      group: "cta",
      fields: [
        defineField({
          name: "eyebrowLabel",
          title: "Eyebrow Label",
          type: "string",
          description: 'e.g. "Ready to Elevate?"',
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "array",
          description: "Use Emphasis (italic) to highlight key words.",
          of: [
            defineArrayMember({
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [{ title: "Emphasis", value: "em" }],
                annotations: [],
              },
            }),
          ],
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "buttonLabel",
          title: "Button Label",
          type: "string",
          description: 'e.g. "Book a Strategy Call"',
        }),
        defineField({
          name: "buttonHref",
          title: "Button URL",
          type: "string",
          description: 'Internal path e.g. "/contact" or full URL',
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alternative Text" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "siteName", media: "logo" },
    prepare({ title, media }) {
      return { title: title || "Site Settings", media };
    },
  },
});
