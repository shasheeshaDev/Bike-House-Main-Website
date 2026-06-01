import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "video-1",
  type: "object",
  title: "Video",
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
      name: "introContent",
      type: "intro-content",
      title: "Intro Content",
      group: "content",
    }),
    defineField({
      name: "videoBlock",
      type: "video",
      title: "Video Content",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title1: "heading",
      title2: "eyebrowHeading",
      title3: "description.0.children.0.text",
    },
    prepare({ title1, title2, title3 }) {
      return {
        title: "Video",
        subtitle: title1 || title2 || title3 || "No Title",
      };
    },
  },
});
