import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "map-1",
  type: "object",
  title: "Map Embed",
  description: "",
  icon: Images,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "block-settings",
      title: "Block Settings",
    },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    defineField({
      name: "mapEmbedLink",
      type: "url",
      title: "Map Embed Link",
      group: "content",
      description:
        "Get the embed link from Google Maps by clicking on 'Share' and then 'Embed a map'.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Map Embed",
      };
    },
  },
});
