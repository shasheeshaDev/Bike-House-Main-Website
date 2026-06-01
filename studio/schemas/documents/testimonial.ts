import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { COLOR_VARIANTS } from "../common/color-variants";
import image from "../common/image";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name"
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title"
    }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: "quote",
      type: "text",
      title: "Quote"
    }),
    orderRankField({ type: "testimonial" }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "title",
    },
  },
});
