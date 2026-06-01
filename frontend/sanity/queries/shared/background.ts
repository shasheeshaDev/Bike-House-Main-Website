import { imageQuery } from "./image";

export const backgroundQuery = `
  backgroundType,
  backgroundImage {
    ${imageQuery}
  },
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
