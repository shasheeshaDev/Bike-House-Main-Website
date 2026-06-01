import { imageQuery } from "./image";

export const videoQuery = `
  videoSource,
  thumbnailImage {
    ${imageQuery}
  },
  uploadedVideo {
    asset->{
      _id,
      url,
      mimeType
    }
  },
  youtubeUrl,
  vimeoUrl
`;
