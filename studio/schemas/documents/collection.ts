import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import image from "../common/image";

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "slug",
    //   title: "Slug",
    //   type: "slug",
    //   options: {
    //     source: "name",
    //     maxLength: 96,
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    image,
    defineField({
      name: "contentBlock",
      type: "column-builder",
      title: "Content Block",
      description: "",
    }),
    orderRankField({ type: "collection" }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
