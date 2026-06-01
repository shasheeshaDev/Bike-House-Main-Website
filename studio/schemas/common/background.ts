

import { defineField } from "sanity";

export default defineField({
  name: "background",
  title: "Background",
  type: "object",
  fields: [
    defineField({
      name: "backgroundType",
      title: "Background Type",
      type: "string",
      initialValue: "image",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required().error("Background type is required"),
    }),

    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
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
      hidden: ({ parent }) => parent?.backgroundType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.backgroundType === "image" && !value?.asset) {
            return "Background image is required when using 'Image' as background type.";
          }
          return true;
        }),
    }),

    defineField({
      name: "videoSource",
      title: "Video Source",
      type: "string",
      initialValue: "upload",
      options: {
        list: [
          { title: "Upload", value: "upload" },
          { title: "YouTube URL", value: "youtube" },
          { title: "Vimeo URL", value: "vimeo" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.backgroundType !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.backgroundType === "video" && !value) {
            return "Video source is required when using 'Video' as background type.";
          }
          return true;
        }),
    }),

    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      description: "Thumbnail shown before the video plays",
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
      hidden: ({ parent }) =>
        parent?.backgroundType !== "video" || !parent?.videoSource,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.backgroundType === "video" && !value?.asset) {
            return "Thumbnail image is required for video backgrounds.";
          }
          return true;
        }),
    }),

    defineField({
      name: "uploadedVideo",
      title: "Uploaded Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) =>
        parent?.backgroundType !== "video" || parent?.videoSource !== "upload",
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const parent = context?.parent as any;
          if (
            parent?.backgroundType === "video" &&
            parent?.videoSource === "upload" &&
            !file?.asset
          ) {
            return "Video file is required when using 'Upload' as the source.";
          }
          return true;
        }),
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Provide a valid YouTube URL. (Ex: https://www.youtube.com/watch?v=abc123 or https://youtu.be/abc123)",
      hidden: ({ parent }) =>
        parent?.backgroundType !== "video" || parent?.videoSource !== "youtube",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context?.parent as any;

          if (
            parent?.backgroundType !== "video" ||
            parent?.videoSource !== "youtube"
          ) {
            return true;
          }

          if (!url) {
            return "YouTube URL is required when using 'YouTube' as the source.";
          }

          const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
          const isValid = typeof url === "string" && youtubeRegex.test(url);

          return isValid ? true : "Must be a valid YouTube URL";
        }),
    }),

    defineField({
      name: "vimeoUrl",
      title: "Vimeo URL",
      type: "url",
      description:
        "Provide a valid Vimeo URL. (Ex: https://vimeo.com/123456789)",
      hidden: ({ parent }) =>
        parent?.backgroundType !== "video" || parent?.videoSource !== "vimeo",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context?.parent as any;

          if (
            parent?.backgroundType !== "video" ||
            parent?.videoSource !== "vimeo"
          ) {
            return true;
          }

          if (!url) {
            return "Vimeo URL is required when using 'Vimeo' as the source.";
          }

          const vimeoRegex =
            /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)(\/[\w-]+)?(\?.*)?$/;
          const isValid = typeof url === "string" && vimeoRegex.test(url);

          return isValid ? true : "Must be a valid Vimeo URL";
        }),
    }),
  ],
});
