import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { renderHeading } from "@/lib/render-heading";

type TeamMembers2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "team-members-2" }
>;

type Member = NonNullable<TeamMembers2Props["members"]>[number];

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

export default function TeamMembers2({ label, heading, description, members }: TeamMembers2Props) {
  if (!members || members.length === 0) return null;

  return (
    <section className="px-5 md:px-20 py-[120px]">
      {/* Section header */}
      {(label || (heading && heading.length > 0) || description) && (
        <div className="mb-16">
          {label && (
            <p className="flex items-center gap-[10px] font-dmSans text-[10px] font-bold tracking-[0.25em] uppercase text-eh-gold mb-4">
              <span className="block w-6 h-px bg-eh-gold shrink-0" />
              {label}
            </p>
          )}
          {heading && heading.length > 0 && (
            <h2 className="font-cormorant font-light text-eh-navy leading-[1.15] mb-3 [&_em]:italic [&_em]:text-eh-sand">
              {renderHeading(heading)}
            </h2>
          )}
          {description && (
            <p className="font-dmSans text-[16px] font-light text-eh-midGray leading-[1.8] max-w-[540px]">
              {description}
            </p>
          )}
        </div>
      )}

      {/* 4-col compact grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
        {members.map((member) => (
          <div
            key={member._id}
            className="group bg-eh-cream px-8 py-10 border-b-[3px] border-transparent hover:border-eh-gold transition-colors duration-300"
          >
            {/* Avatar — 80px circle */}
            {member.avatar?.asset ? (
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5">
                <Image
                  src={urlFor(member.avatar).url()}
                  alt={member.avatar.alt ?? member.name ?? ""}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-eh-sandLight flex items-center justify-center mb-5">
                <span className="font-cormorant text-[28px] font-light text-eh-sand">
                  {getInitials(member)}
                </span>
              </div>
            )}

            {/* Name */}
            <p className="font-cormorant text-[22px] font-normal text-eh-navy leading-tight mb-1">
              {member.name}
            </p>

            {/* Role */}
            {member.role && (
              <p className="font-dmSans text-[10px] font-bold tracking-[0.15em] uppercase text-eh-gold mb-3">
                {member.role}
              </p>
            )}

            {/* Bio */}
            {member.bio && (
              <p className="font-dmSans text-[13px] font-light text-eh-midGray leading-[1.7]">
                {member.bio}
              </p>
            )}

            {/* Expertise tags */}
            {member.expertise && member.expertise.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
        ))}
      </div>
    </section>
  );
}
