"use client";

import { useState } from "react";
import Image from "next/image";
import playButton from "@/public/icons/play-button.svg";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type VideoOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "video-1" }
>;

const VideoOption1 = ({ introContent, videoBlock }: VideoOption1Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getVideoUrl = () => {
    if (videoBlock?.videoSource === "youtube" && videoBlock.youtubeUrl) {
      const videoId = videoBlock.youtubeUrl.includes("youtu.be")
        ? videoBlock.youtubeUrl.split("/").pop()
        : new URLSearchParams(new URL(videoBlock.youtubeUrl).search).get("v");
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (videoBlock?.videoSource === "vimeo" && videoBlock.vimeoUrl) {
      const match = videoBlock.vimeoUrl.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
      const videoId = match ? match[1] : "";
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    if (videoBlock?.videoSource === "upload" && videoBlock.uploadedVideo?.asset?.url) {
      return videoBlock.uploadedVideo.asset.url;
    }
    return null;
  };

  const videoUrl = getVideoUrl();

  return (
    <section className="video-option-1 pt-[40px] pb-[40px]">
      <div className="container mx-auto">
        {/* Video Player */}
        <div className="relative aspect-[1432/540] w-full overflow-hidden rounded-3xl bg-gray-200">
          {introContent?.isIntroContent && introContent.eyebrowHeading && (
            <div className="absolute pt-12 pl-10 w-fit h-fit z-20">
              <h5 className="font-semibold text-2xl mb-7">
                {introContent.eyebrowHeading}
              </h5>
            </div>
          )}
          {!isPlaying && videoBlock?.thumbnailImage?.asset && (
            <>
              <Image
                src={urlFor(videoBlock.thumbnailImage).url()}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              {videoUrl && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40 group z-10 cursor-pointer"
                  aria-label="Play video"
                >
                  <div className="flex items-center justify-center w-4xl h-4xl">
                    <Image
                      src={playButton}
                      alt="Play button"
                      width={56}
                      height={56}
                      className="shadow-lg transition-transform group-hover:scale-110"
                    />
                  </div>
                </button>
              )}
            </>
          )}

          {isPlaying && videoBlock?.videoSource === "upload" && videoBlock.uploadedVideo?.asset?.url && (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              controls
              src={videoBlock.uploadedVideo.asset.url}
            />
          )}

          {isPlaying && videoUrl && videoBlock?.videoSource !== "upload" && (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          )}

          {!videoBlock?.thumbnailImage?.asset && !isPlaying && (
            <div className="flex h-full items-center justify-center text-gray-500">
              No video or thumbnail available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoOption1;
