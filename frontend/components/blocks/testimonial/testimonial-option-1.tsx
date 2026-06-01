"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type TestimonialOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "testimonial-1" }
>;

const TestimonialOption1 = ({
  testimonials,
  imageBlock,
}: TestimonialOption1Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const testimonialCount = testimonials?.length ?? 0;

  // Calculate progress percentage for the circular progress bar
  const progress = testimonialCount > 0 ? ((currentSlide + 1) / testimonialCount) * 100 : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="testimonial-option-1 pt-[40px] pb-[80px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5">
          <div className="col-span-4 sm:col-span-8 lg:col-span-8">
            <div className="testimonial-slider-wrapper bg-brand-tertiary px-11 py-12 rounded-3xl text-black relative">
              <div className="icon-wrapper h-12 aspect-square rounded-2xl bg-white flex items-center justify-center">
                A
              </div>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                effect="fade"
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper: SwiperType) => setCurrentSlide(swiper.realIndex)}
                className="testimonial-slider"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial._id} className="bg-brand-tertiary">
                    <div className="testimonial-content border-b border-b-[#D7D7D7] pt-7 min-h-36 pb-5">
                      {testimonial.quote && (
                        <h3 className="">
                          "{testimonial.quote}"
                        </h3>
                      )}
                    </div>
                    <div className="bottom-content pt-8">
                      <div className="author-content flex gap-3 items-center justify-start">
                        {testimonial.avatar && (testimonial.avatar as unknown as { asset?: { _ref: string } })?.asset && (
                          <div className="author-image rounded-full h-14 xl:h-20 aspect-square overflow-hidden">
                            <Image
                              src={urlFor(testimonial.avatar).url()}
                              alt={testimonial.name || ""}
                              className="w-full h-full object-cover"
                              width={80}
                              height={80}
                            />
                          </div>
                        )}
                        <div className="author-info flex flex-col justify-center">
                          {testimonial.name && (
                            <h5 className="">
                              {testimonial.name}
                            </h5>
                          )}
                          {(testimonial.title ) && (
                            <p className="font-medium text-sm">
                              {testimonial.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="slider-navigation absolute bottom-16 right-11 gap-1 z-10">
                <button
                  className="slider-navigation-button bg-white rounded-lg p-2 hover:bg-[#F0B401] group transition-colors"
                  onClick={() => swiperInstance?.slidePrev()}
                >
                  <Image
                    src="/icons/arrow-left.svg"
                    alt="Previous"
                    width={24}
                    height={24}
                    className="group-hover:invert-[1] transition-colors"
                  />
                </button>
                <button
                  className="slider-navigation-button bg-white rounded-lg p-2 hover:bg-[#F0B401] group transition-colors"
                  onClick={() => swiperInstance?.slideNext()}
                >
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Next"
                    width={24}
                    height={24}
                    className="group-hover:invert-[1] transition-colors"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-8 lg:col-span-4">
            <div className="aspect-square sm:aspect-auto w-full h-full rounded-3xl overflow-hidden relative">
              {imageBlock?.asset && (
                <Image
                  src={urlFor(imageBlock).url()}
                  alt=""
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                />
              )}
              <div className="testimonial-slider-pagination absolute top-0 right-0 font-semibold text-xl text-white pt-9 pr-11 rounded-md z-20">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-2xl font-bold">
                    {currentSlide + 1}/{testimonialCount}
                  </span>
                  <span className="progress-circle relative inline-block">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 100 100"
                      className="transform -rotate-90"
                    >
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="6"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="#fff"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-in-out"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialOption1;
