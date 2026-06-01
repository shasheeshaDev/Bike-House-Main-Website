"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type InsightsGridOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "insights-grid-1" }
>;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function InsightsGridOption1({ insights }: InsightsGridOption1Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (!insights || insights.length === 0) return null;

  const categories = Array.from(
    new Set(insights.map((i) => i.category?.title).filter(Boolean))
  ) as string[];

  const filtered = activeCategory === "all"
    ? insights
    : insights.filter((i) => i.category?.title === activeCategory);

  return (
    <section className="px-5 md:px-10 lg:px-20 py-[120px]">
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-3 mb-12">
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`font-dmSans text-[12px] font-medium tracking-[0.08em] uppercase px-5 py-2.5 border transition-colors duration-200 cursor-pointer
              ${activeCategory === cat
                ? "bg-eh-navy text-white border-eh-navy"
                : "bg-transparent text-eh-charcoal border-black/15 hover:bg-eh-navy hover:text-white hover:border-eh-navy"
              }`}
          >
            {cat === "all" ? "All Topics" : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((insight) => (
          <Link
            key={insight._id}
            href={`/insights/${insight.slug?.current ?? "#"}`}
            className="group flex flex-col no-underline"
          >
            <div className="w-full aspect-[16/10] overflow-hidden mb-6">
              {insight.image?.asset ? (
                <Image
                  src={urlFor(insight.image).url()}
                  alt={insight.image.alt ?? insight.title ?? ""}
                  width={600}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="w-full h-full bg-eh-sandLight" />
              )}
            </div>

            {insight.category?.title && (
              <p className="font-dmSans text-[10px] font-bold tracking-[0.2em] uppercase text-eh-gold mb-2.5">
                {insight.category.title}
              </p>
            )}

            <h3 className="font-cormorant text-[22px] font-light text-eh-navy leading-[1.35] mb-3 group-hover:text-eh-gold transition-colors duration-200">
              {insight.title}
            </h3>

            {insight.excerpt && (
              <p className="font-dmSans text-[13px] font-light text-eh-midGray leading-[1.7] flex-1">
                {insight.excerpt}
              </p>
            )}

            {insight.publishedAt && (
              <p className="font-dmSans text-[11px] text-eh-lightGray mt-4 tracking-[0.05em]">
                {formatDate(insight.publishedAt)}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
