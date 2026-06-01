import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "testimonial-1",
  type: "object",
  title: "Testimonials",
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
      name: "testimonials",
      type: "array",
      description: "",
      group: "content",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
    }),
    defineField({
      name: "imageBlock",
      type: "image",
      title: "Image Block",
      description: "",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
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
        title: "Testimonials",
        subtitle: iteems?.length
        ? `${iteems.length} item${iteems.length > 1 ? "s" : ""}`
        : "No items",
      };
    },
  },
});
