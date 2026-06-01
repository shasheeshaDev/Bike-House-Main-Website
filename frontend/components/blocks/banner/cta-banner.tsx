import Image from "next/image";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type CtaBannerProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "banner-2" }
>;

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
  return m ? m[1] : "";
}

export default function CtaBanner({
  eyebrowHeading,
  heading,
  description,
  buttons,
  background,
}: CtaBannerProps) {
  return (
    <div className="relative px-5 md:px-20 py-[120px] flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      {background?.backgroundType === "image" && background.backgroundImage?.asset && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(background.backgroundImage).url()}
            alt={background.backgroundImage.alt ?? ""}
            fill
            className="object-cover object-center"
          />
        </div>
      )}
      {background?.backgroundType === "video" && background.videoSource === "youtube" && background.youtubeUrl && (
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          src={`https://www.youtube.com/embed/${getYouTubeId(background.youtubeUrl)}?autoplay=1&mute=1&loop=1&controls=0&playlist=${getYouTubeId(background.youtubeUrl)}`}
          allow="autoplay; encrypted-media"
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-eh-navy/75 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[700px]">
        {eyebrowHeading && (
          <p className="flex items-center justify-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
            {eyebrowHeading}
          </p>
        )}
        {heading && (
          <h2 className="font-cormorant font-light text-white leading-[1.15] mb-4">
            {heading}
          </h2>
        )}
        {description && (
          <p className="font-dmSans text-[16px] font-light text-white/70 mb-10">
            {description}
          </p>
        )}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {buttons.map((btn) => {
              const cls = "inline-block font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy px-9 py-4 hover:bg-eh-goldLight transition-colors duration-200";
              if (btn.isExternal && btn.href) {
                return (
                  <a key={btn._key} href={btn.href} target={btn.target ? "_blank" : undefined} rel={btn.target ? "noopener noreferrer" : undefined} className={cls}>
                    {btn.label}
                  </a>
                );
              }
              return (
                <Link key={btn._key} href={btn.href ?? "#"} className={cls}>
                  {btn.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
