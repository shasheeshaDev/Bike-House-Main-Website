import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "content-4",
  type: "object",
  title: "Image + Panel",
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
      name: "contentBlock",
      type: "column-builder",
      title: "Content Block",
      description: "",
      group: "content",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Image + Panel",
      };
    },
  },
});
