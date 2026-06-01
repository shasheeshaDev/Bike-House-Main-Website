import { defineField, defineType, defineArrayMember } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../common/meta";

export default defineType({
  name: "page",
  type: "document",
  title: "Page",
  icon: Files,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "globalBanner",
      title: "Global Banner",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "isGlobalBanner",
      type: "boolean",
      title: "Enable Global Banner",
      description:
        "Toggle to display a promotional banner at the top of this page. When enabled, the banner will be visible to all visitors.",
      group: "globalBanner",
      initialValue: false,
    }),
    defineField({
      name: "bannerImage",
      type: "image",
      title: "Banner Image",
      description:
        "Background image for the global banner. Recommended size: 1920x200px. Use high-contrast images for better text readability.",
      group: "globalBanner",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description:
            "Describe the image for screen readers and SEO. Required for accessibility.",
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: { _ref?: string } };
              if (parent?.asset?._ref && !alt) {
                return "Alternative text is required when an image is uploaded";
              }
              return true;
            }),
        },
      ],
      hidden: ({ parent }) => !parent?.isGlobalBanner,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isGlobalBanner?: boolean };
          if (parent?.isGlobalBanner && !value?.asset) {
            return "Banner image is required when global banner is enabled";
          }
          return true;
        }),
    }),
    defineField({
      name: "bannerContent",
      type: "object",
      title: "Banner Content",
      description:
        "Add a heading and description for the banner. Keep the content concise for better user experience.",
      group: "globalBanner",
      fields: [
        defineField({
          name: "eyebrowHeading",
          type: "string",
          title: "Eyebrow Heading",
          description: "Small text displayed above the main heading",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context?.parent as any;
              if (parent?.isIntroContent && value && value.length > 50) {
                return "Eyebrow heading should be 50 characters or less.";
              }
              return true;
            }),
        }),

        defineField({
          name: "heading",
          type: "array",
          title: "Heading",
          description: "Main heading text. Use Emphasis (italic) to highlight key words.",
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
          type: "text",
          title: "Description",
          description: "Supporting description text",
          validation: (Rule) =>
            Rule.max(500).warning(
              "Description should be 500 characters or less.",
            ),
        }),
      ],
      hidden: ({ parent }) => !parent?.isGlobalBanner,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isGlobalBanner?: boolean };
          if (parent?.isGlobalBanner && !value) {
            return "Banner content is required when global banner is enabled";
          }
          return true;
        }),
    }),
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPrefooterCta",
      title: "Pre-footer CTA",
      description: "Visibility of Pre-footer Call to Action Content",
      type: "boolean",
      group: "settings",
    }),
    defineField({
      name: "blocks",
      type: "array",
      group: "content",
      of: [
        // Bike House blocks
        { type: "page-hero" },
        // Legacy template blocks
        { type: "banner-1" },
        { type: "banner-2" },
        { type: "banner-3" },

        { type: "video-1" },

        { type: "content-1" },
        { type: "content-2" },
        { type: "content-3" },
        { type: "content-4" },
        { type: "content-5" },
        { type: "content-6" },
        { type: "content-7" },
        { type: "content-8" },
        { type: "content-9" },
        { type: "content-10" },

        { type: "stats-1" },
        { type: "stats-2" },

        { type: "card-1" },
        { type: "card-2" },
        { type: "card-3" },
        { type: "card-4" },
        { type: "card-5" },
        { type: "card-6" },

        { type: "form-1" },

        { type: "testimonial-1" },

        { type: "collection-1" },

        { type: "services-list-1" },
        { type: "partners-grid-1" },
        { type: "case-studies-1" },
        { type: "careers-list-1" },
        { type: "insights-grid-1" },
        { type: "team-members-1" },
        { type: "team-members-2" },
        { type: "contact-1" },
        { type: "map-1" },
      ],
      options: {
        insertMenu: {
          groups: [
            {
              name: "banner",
              title: "Banners & Heroes",
              of: ["banner-1", "banner-2", "banner-3"],
            },
            {
              name: "content",
              title: "Content",
              of: ["content-1", "content-2", "content-3", "content-4", "content-5", "content-6", "content-7", "content-8", "content-9", "content-10"],
            },
            {
              name: "card",
              title: "Cards",
              of: ["card-1", "card-2", "card-3", "card-4", "card-5", "card-6"],
            },
            {
              name: "stats",
              title: "Stats",
              of: ["stats-1", "stats-2"],
            },
            {
              name: "listings",
              title: "EH Listings",
              of: ["services-list-1", "partners-grid-1", "case-studies-1", "careers-list-1", "insights-grid-1", "team-members-1", "team-members-2"],
            },
            {
              name: "form",
              title: "Forms & Contact",
              of: ["form-1", "contact-1"],
            },
            {
              name: "map",
              title: "Map",
              of: ["map-1"],
            },
            {
              name: "video",
              title: "Video",
              of: ["video-1"],
            },
            {
              name: "testimonial",
              title: "Testimonials",
              of: ["testimonial-1"],
            },
            {
              name: "collection",
              title: "Collection",
              of: ["collection-1"],
            },
          ],
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/static/images/preview/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
    }),
    meta,
    orderRankField({ type: "page" }),
  ],
});
