"use client";

import Image from "next/image";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type HeroBannerProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "banner-1" }
>;

function getYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : "";
}

function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  return match ? match[1] : "";
}

export default function HeroBanner({
  eyebrowHeading,
  heading,
  subText,
  buttons,
  scrollIndicatorText,
  background,
}: HeroBannerProps) {
  const isPrimary = (variant?: string | null) =>
    !variant || variant === "primary" || variant === "default";

  return (
    <section className="relative h-screen min-h-[700px] flex items-end pb-14 md:pb-[100px] overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 scale-105 transition-transform duration-[8000ms] ease-linear z-0">
        {background?.backgroundType === "image" && background.backgroundImage?.asset && (
          <Image
            src={urlFor(background.backgroundImage).url()}
            alt={background.backgroundImage.alt ?? ""}
            fill
            className="object-cover object-[center_40%]"
            priority
          />
        )}

        {background?.backgroundType === "video" && (
          <>
            {background.videoSource === "upload" &&
              background.uploadedVideo?.asset?.url && (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={
                    background.thumbnailImage?.asset
                      ? urlFor(background.thumbnailImage).url()
                      : undefined
                  }
                >
                  <source
                    src={background.uploadedVideo.asset.url}
                    type={background.uploadedVideo.asset.mimeType ?? "video/mp4"}
                  />
                </video>
              )}
            {background.videoSource === "youtube" && background.youtubeUrl && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeId(background.youtubeUrl)}?autoplay=1&mute=1&loop=1&controls=0&playlist=${getYouTubeId(background.youtubeUrl)}`}
                allow="autoplay; encrypted-media"
              />
            )}
            {background.videoSource === "vimeo" && background.vimeoUrl && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://player.vimeo.com/video/${getVimeoId(background.vimeoUrl)}?autoplay=1&muted=1&loop=1&background=1`}
                allow="autoplay; fullscreen"
              />
            )}
          </>
        )}

        {/* Gradient overlay — strong navy at bottom, fades up */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.85)] via-[rgba(10,22,40,0.30)] to-[rgba(10,22,40,0.10)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 px-5 md:px-8 lg:px-20 max-w-[900px]">

        {eyebrowHeading && (
          <p className="flex items-center gap-3 font-dmSans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B8975A] mb-5">
            <span className="block w-8 h-px bg-[#B8975A] shrink-0" />
            {eyebrowHeading}
          </p>
        )}

        {heading && heading.length > 0 && (
          <h1 className="font-cormorant text-[clamp(32px,9vw,48px)] md:text-[clamp(40px,7vw,64px)] lg:text-[clamp(48px,6vw,84px)] font-light text-white [&_span]:text-white leading-[1.1] tracking-[-0.01em] mb-6">
            {renderHeading(heading)}
          </h1>
        )}

        {subText && (
          <p className="font-dmSans text-[14px] md:text-[15px] lg:text-[17px] font-light text-white/75 leading-[1.7] max-w-[560px] mb-11">
            {subText}
          </p>
        )}

        {buttons && buttons.length > 0 && (
          <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
            {buttons.map((button) => {
              const base =
                "font-dmSans text-[12px] tracking-[0.12em] uppercase px-9 py-4 transition-all duration-200 cursor-pointer inline-block";
              const className = isPrimary(button.buttonVariant)
                ? `${base} font-semibold bg-[#B8975A] text-[#0A1628] hover:bg-[#D4B97A] hover:-translate-y-px`
                : `${base} font-medium bg-transparent text-white border border-white/40 hover:border-[#B8975A] hover:text-[#B8975A]`;

              if (button.isExternal && button.href) {
                return (
                  <a
                    key={button._key}
                    href={button.href}
                    target={button.target ? "_blank" : undefined}
                    rel={button.target ? "noopener noreferrer" : undefined}
                    className={className}
                  >
                    {button.label}
                  </a>
                );
              }

              return (
                <Link
                  key={button._key}
                  href={button.href ?? "#"}
                  className={className}
                >
                  {button.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      {scrollIndicatorText && (
        <div className="absolute bottom-10 right-8 md:right-20 z-10 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-[60px] bg-gradient-to-b from-transparent to-[#B8975A] animate-scroll-pulse" />
          <span className="font-dmSans text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50 [writing-mode:vertical-rl]">
            {scrollIndicatorText}
          </span>
        </div>
      )}
    </section>
  );
}
