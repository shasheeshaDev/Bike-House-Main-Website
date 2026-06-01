import { defineField } from "sanity";

export default defineField({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
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
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
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
      hidden: ({ parent }) => !parent?.videoSource,
      validation: (Rule) => [
        Rule.custom((value) => {
          if (!value) {
            return "Thumbnail image is required for constrain or fullWidth layout";
          }

          return true;
        }),
        // imageSizeValidation(1500, 1500)(Rule)
      ],
    }),
    defineField({
      name: "uploadedVideo",
      title: "Uploaded Video",
      type: "file",
      hidden: ({ parent }) => parent?.videoSource !== "upload",
      options: {
        accept: "video/*",
      },
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const parent = context?.parent as any;
          if (parent?.videoSource === "upload" && !file?.asset) {
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
        "Provide a valid YouTube URL if using YouTube as the video source. (Ex: https://www.youtube.com/watch?v=abc123)",
      hidden: ({ parent }) => parent?.videoSource !== "youtube",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context?.parent as any;

          if (parent?.videoSource !== "youtube") return true;

          if (!url) {
            return "YouTube URL is required when using 'YouTube' as the source.";
          }

          const isValid =
            typeof url === "string" &&
            (url.includes("youtube.com") || url.includes("youtu.be"));

          return isValid ? true : "Must be a valid YouTube URL";
        }),
    }),
    defineField({
      name: "vimeoUrl",
      title: "Vimeo URL",
      type: "url",
      description:
        "Provide a valid Vimeo URL if using Vimeo as the video source. (Ex: https://vimeo.com/123456789)",
      hidden: ({ parent }) => parent?.videoSource !== "vimeo",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const parent = context?.parent as any;

          if (parent?.videoSource !== "vimeo") return true;

          if (!url) {
            return "Vimeo URL is required when using 'Vimeo' as the source.";
          }

          const isValid = typeof url === "string" && url.includes("vimeo.com");

          return isValid ? true : "Must be a valid Vimeo URL";
        }),
    }),
  ],
});
