import { introContentQuery } from "../shared/intro-content";
import { videoQuery } from "../shared/video";

export const video1Query = `
  _type == "video-1" => {
    _type,
    _key,
    padding,
    introContent {
      ${introContentQuery}
    },
    videoBlock {
      ${videoQuery}
    }
  }
`;
