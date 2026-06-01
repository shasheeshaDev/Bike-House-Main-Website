import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "collection-1",
  type: "object",
  title: "Collection",
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
      name: "collections",
      type: "array",
      description: "",
      group: "content",
      of: [
        {
          type: "reference",
          to: [{ type: "collection" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      iteems: "testimonials",
    },
    prepare({ iteems }) {
      return {
        title: "Collection",
        subtitle: iteems?.length
        ? `${iteems.length} item${iteems.length > 1 ? "s" : ""}`
        : "No items",
      };
    },
  },
});
