"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import DynamicForm from "@/components/forms/dynamic-form";
import { renderHeading } from "@/lib/render-heading";

type Contact1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "contact-1" }
>;

type FormTab = NonNullable<Contact1Props["forms"]>[number];

export default function Contact1({
  label,
  heading,
  forms,
  mapEmbedUrl,
  mapLabel = "Elevate Hospitality — Sri Lanka & Global Markets",
}: Contact1Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const activeTab: FormTab | undefined = forms?.[activeIndex];

  return (
    <div className="bg-eh-cream">

      {/* ── Header + tab toggle ── */}
      <div className="px-5 md:px-10 lg:px-20 pt-16 pb-12 mt-16">
        {label && (
          <p className="flex items-center gap-3 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
            <span className="block w-6 h-px bg-eh-gold shrink-0" />
            {label}
          </p>
        )}
        {heading && heading.length > 0 && (
          <h1 className="font-cormorant text-[clamp(44px,5vw,72px)] font-light text-eh-navy leading-[1.1] mb-10 [&_em]:italic [&_em]:text-eh-sand">
            {renderHeading(heading as any)}
          </h1>
        )}

        {/* Tab buttons */}
        {forms && forms.length > 1 && (
          <div className="flex flex-wrap border border-black/10 w-fit">
            {forms.map((tab, i) => (
              <button
                key={tab._key}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`font-dmSans text-[12px] font-semibold tracking-[0.1em] uppercase px-8 py-4 transition-colors duration-200 cursor-pointer border-none
                  ${activeIndex === i
                    ? "bg-eh-navy text-white"
                    : "bg-transparent text-eh-charcoal hover:bg-eh-navy/10"
                  }`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Active tab panel ── */}
      {activeTab && (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

          {/* Left — panel info */}
          <div className="bg-eh-navy px-8 md:px-20 py-16 lg:py-[100px] flex flex-col justify-center gap-8">
            {activeTab.panelLabel && (
              <p className="flex items-center gap-2.5 font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold">
                <span className="block w-6 h-px bg-eh-gold shrink-0" />
                {activeTab.panelLabel}
              </p>
            )}
            {activeTab.panelHeading && (activeTab.panelHeading as any[]).length > 0 && (
              <h2 className="font-cormorant text-[36px] font-light text-white leading-[1.2] [&_em]:italic [&_em]:text-white">
                {renderHeading(activeTab.panelHeading as any)}
              </h2>
            )}
            {activeTab.panelDescription && (
              <p className="font-dmSans text-[15px] font-light text-white/65 leading-[1.8]">
                {activeTab.panelDescription}
              </p>
            )}

            {/* Contact details */}
            {activeTab.contactDetails && activeTab.contactDetails.length > 0 && (
              <div className="flex flex-col gap-5 mt-2">
                {activeTab.contactDetails.map((detail) => (
                  <div key={detail._key}>
                    <p className="font-dmSans text-[10px] font-bold tracking-[0.15em] uppercase text-eh-gold mb-1">
                      {detail.label}
                    </p>
                    <p className="font-dmSans text-[14px] font-light text-white/70">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Panel CTA button */}
            {activeTab.panelCta?.label && (
              (() => {
                const btn = activeTab.panelCta!;
                const isPrimary = !btn.buttonVariant || btn.buttonVariant === "primary" || btn.buttonVariant === "default";
                const cls = isPrimary
                  ? "mt-4 self-start font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy px-7 py-3.5 hover:bg-eh-goldLight transition-colors duration-200 no-underline inline-block"
                  : "mt-4 self-start font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-transparent text-white border border-white/30 px-7 py-3.5 hover:border-eh-gold hover:text-eh-gold transition-colors duration-200 no-underline inline-block";
                const href = btn.href ?? "#";
                return btn.isExternal ? (
                  <a href={href} target={btn.target ? "_blank" : undefined} rel={btn.target ? "noopener noreferrer" : undefined} className={cls}>
                    {btn.label}
                  </a>
                ) : (
                  <Link href={href} className={cls}>{btn.label}</Link>
                );
              })()
            )}
          </div>

          {/* Right — form */}
          <div className="bg-white px-8 md:px-20 py-16 lg:py-[80px]">
            {activeTab.formTitle && (
              <h3 className="font-cormorant text-[28px] font-light text-eh-navy mb-8">
                {activeTab.formTitle}
              </h3>
            )}

            {submitted[activeIndex] ? (
              <div className="text-center py-16 bg-eh-cream">
                <p className="font-cormorant text-[32px] font-light text-eh-navy mb-3">
                  {activeTab.successTitle || "Thank you"}
                </p>
                <p className="font-dmSans text-[14px] text-eh-midGray leading-[1.7]">
                  {activeTab.successMessage || "We've received your enquiry and will be in touch shortly."}
                </p>
              </div>
            ) : activeTab.selectedFormConfig && activeTab.selectedFormSheet ? (
              <DynamicForm
                formSettings={{
                  selectedFormConfig: activeTab.selectedFormConfig as any,
                  selectedFormSheet: activeTab.selectedFormSheet as any,
                  uniqKey: `contact-${activeTab._key}`,
                }}
              />
            ) : (
              <p className="font-dmSans text-[14px] text-eh-midGray">
                No form configured for this tab.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Map ── */}
      {mapEmbedUrl && (
        <div className="relative w-full h-[420px] overflow-hidden bg-eh-navy">
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full border-none"
            style={{ filter: "saturate(0.7) contrast(1.1)" }}
            title="Location Map"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-10 lg:px-20 py-6 bg-gradient-to-t from-[rgba(10,22,40,0.90)] to-transparent pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-eh-gold shrink-0" />
              <span className="font-dmSans text-[13px] font-medium tracking-[0.1em] uppercase text-white/70">
                {mapLabel}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
