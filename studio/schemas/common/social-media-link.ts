import { defineField } from "sanity";

export default defineField({
  name: "social-media-links",
  type: "array",
  title: "Social Media Links",
  description: "Social media links",
  of: [
    {
      type: "object",
      fields: [
        defineField({
          name: "platform",
          type: "string",
          title: "Platform",
          description: "Select the social media platform icon",
          options: {
            list: [
              { title: "Facebook", value: "facebook" },
              { title: "Twitter (X)", value: "twitter" },
              { title: "Instagram", value: "instagram" },
              { title: "LinkedIn", value: "linkedin" },
              { title: "YouTube", value: "youtube" },
              { title: "GitHub", value: "github" },
              { title: "Dribbble", value: "dribbble" },
              { title: "Globe (Other)", value: "globe" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "url",
          type: "url",
          title: "URL",
          description: "Full URL to your social media profile",
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ["http", "https"],
            }),
        }),
      ],
      preview: {
        select: {
          platform: "platform",
          url: "url",
        },
        prepare({ platform, url }) {
          return {
            title: platform
              ? platform.charAt(0).toUpperCase() + platform.slice(1)
              : "Social Media",
            subtitle: url || "No URL",
          };
        },
      },
    },
  ],
});
