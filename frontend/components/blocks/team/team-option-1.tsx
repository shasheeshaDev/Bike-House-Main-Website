import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type TeamMembers1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "team-members-1" }
>;

type Member = NonNullable<TeamMembers1Props["members"]>[number];

function getInitials(member: Member) {
  return (
    member.initials ??
    member.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2) ??
    "?"
  );
}

export default function TeamMembers1({ label, heading, description, members }: TeamMembers1Props) {
  if (!members || members.length === 0) return null;

  return (
    <section className="px-5 md:px-20 py-[120px]">
      {/* Section header */}
      {(label || (heading && heading.length > 0)) && (
        <div className="mb-16">
          {label && (
            <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant font-light text-eh-navy leading-[1.15] [&_em]:italic [&_em]:text-eh-sand">
              {renderHeading(heading)}
            </h2>
          )}
          {description && (
            <p className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8] max-w-[540px] mt-4">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Co-founders grid — 2 col, max-width 900px, portrait cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[900px]">
        {members.map((member) => (
          <div key={member._id} className="flex flex-col gap-5">
            {/* Portrait placeholder or photo */}
            {member.avatar?.asset ? (
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-eh-sandLight">
                <Image
                  src={urlFor(member.avatar).url()}
                  alt={member.avatar.alt ?? member.name ?? ""}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/4] bg-eh-sandLight flex items-center justify-center">
                <span className="font-cormorant text-[72px] font-light text-eh-sand">
                  {getInitials(member)}
                </span>
              </div>
            )}

            {/* Info */}
            <div>
              <p className="font-cormorant text-[28px] font-normal text-eh-navy leading-tight">
                {member.name}
              </p>
              {member.role && (
                <p className="font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase text-eh-gold mt-[-4px] mb-3">
                  {member.role}
                </p>
              )}
              {member.bio && (
                <p className="font-dmSans text-[14px] font-light text-eh-midGray leading-[1.7]">
                  {member.bio}
                </p>
              )}
              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-5">
                  {member.expertise.map((tag, i) => (
                    <span
                      key={i}
                      className="font-dmSans text-[11px] font-medium tracking-[0.08em] uppercase text-eh-midGray border border-black/10 px-[14px] py-[6px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
