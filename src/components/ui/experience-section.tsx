// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowUpRight, Globe } from "lucide-react";
// import { experiences, type Experience, type ExperienceHighlight } from "@/data/experience";
// import { cn } from "@/lib/utils";

// function HighlightItem({ highlight }: { highlight: ExperienceHighlight }) {
//   if (typeof highlight === "string") {
//     return <li>{highlight}</li>;
//   }

//   return (
//     <li>
//       {highlight.text}
//       {highlight.subItems && highlight.subItems.length > 0 && (
//         <ul className="mt-1.5 list-[square] space-y-1 pl-5 marker:text-subtle">
//           {highlight.subItems.map((item) => (
//             <li key={item}>{item}</li>
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

// function ExperienceCard({ experience }: { experience: Experience }) {
//   return (
//     <article className="border-b border-line/80 pb-10 last:border-b-0 last:pb-0">
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
//             <Image
//               src={experience.logo}
//               alt={`${experience.company} logo`}
//               fill
//               className="object-cover"
//               sizes="40px"
//             />
//           </div>
//           <div className="flex min-w-0 items-center gap-2">
//             <h3 className="truncate text-2xl font-semibold text-strong">
//               {experience.company}
//             </h3>
//             {experience.website && (
//               <a
//                 href={experience.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={`Visit ${experience.company} website`}
//                 className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-dim transition-colors hover:bg-elevated hover:text-strong"
//               >
//                 <Globe className="h-4 w-4" />
//               </a>
//             )}
//           </div>
//         </div>
//         <p className="shrink-0 text-base text-dim sm:text-right">
//           {experience.dateRange}
//         </p>
//       </div>

//       <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
//         <p className="text-base font-medium text-strong">{experience.role}</p>
//         <p className="text-base text-dim sm:text-right">
//           {experience.location}
//         </p>
//       </div>

//       <ul className="mt-4 list-[square] space-y-2 pl-5 text-md leading-relaxed text-dim marker:text-subtle">
//         {experience.highlights.map((highlight, index) => (
//           <HighlightItem
//             key={typeof highlight === "string" ? highlight : `${highlight.text}-${index}`}
//             highlight={highlight}
//           />
//         ))}
//       </ul>
//     </article>
//   );
// }

// type ExperienceSectionProps = {
//   limit?: number;
//   showViewAllButton?: boolean;
//   showFeaturedLabel?: boolean;
//   heading?: string;
//   className?: string;
//   items?: Experience[];
// };

// export default function ExperienceSection({
//   limit,
//   showViewAllButton = false,
//   showFeaturedLabel = true,
//   heading = "Experience",
//   className,
//   items = experiences,
// }: ExperienceSectionProps) {
//   const visibleExperiences =
//     typeof limit === "number" ? items.slice(0, limit) : items;
//   const hasMore = typeof limit === "number" && items.length > limit;

//   return (
//     <section
//       id="experience"
//       className={cn(
//         "w-full bg-canvas px-4 py-20 font-sans md:px-10",
//         className,
//       )}
//       aria-labelledby="experience-heading"
//     >
//       <div className="mx-auto max-w-3xl">
//         {showFeaturedLabel && (
//           <p className="mb-2 text-sm text-dim">Featured</p>
//         )}
//         <h2
//           id="experience-heading"
//           className="mb-12 text-3xl font-bold tracking-tight text-strong md:text-4xl"
//         >
//           {heading}
//         </h2>

//         <div className="space-y-10">
//           {visibleExperiences.map((experience) => (
//             <ExperienceCard key={experience.id} experience={experience} />
//           ))}
//         </div>

//         {showViewAllButton && hasMore && (
//           <div className="mt-12 flex justify-center">
//             <Link
//               href="/experience"
//               className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-transparent px-6 py-2.5 text-sm font-medium text-strong transition-colors hover:bg-surface"
//             >
//               Show all work experience
//               <ArrowUpRight className="h-4 w-4" />
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import {
  experiences,
  type Experience,
  type ExperienceHighlight,
} from "@/data/experience";
import { cn } from "@/lib/utils";

function HighlightItem({ highlight }: { highlight: ExperienceHighlight }) {
  if (typeof highlight === "string") {
    return <li>{highlight}</li>;
  }

  return (
    <li>
      {highlight.text}

      {highlight.subItems && highlight.subItems.length > 0 && (
        <ul className="mt-1.5 list-[square] space-y-1 pl-5 marker:text-subtle">
          {highlight.subItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

function ExperienceItem({
  experience,
  isExpanded,
  onToggle,
}: {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const triggerId = `experience-trigger-${experience.id}`;
  const detailsId = `experience-details-${experience.id}`;
  const isCurrent = /\bpresent\b/i.test(experience.dateRange);

  return (
    <article
      className={cn(
        "border-b border-line/80 last:border-b-0",
        isExpanded && "border-line",
      )}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={onToggle}
        className="group flex w-full min-w-0 appearance-none flex-col gap-3 rounded-none border-0 bg-transparent px-1 py-5 text-left shadow-none sm:flex-row sm:items-center sm:justify-between sm:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line-strong"
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <div
            className={cn(
              "relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border bg-surface",
              isCurrent ? "border-brand/50" : "border-line",
            )}
          >
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-[17px] font-semibold text-strong">
                {experience.company}
              </h3>
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${experience.company} website`}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-dim transition-colors hover:bg-elevated hover:text-strong"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm text-dim">
              {experience.role}
              <span className="text-faint"> · </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="hidden h-3 w-3 sm:inline" aria-hidden="true" />
                {experience.location}
              </span>
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-3 pl-[3.6rem] sm:shrink-0 sm:justify-end sm:pl-0">
          <p className="inline-flex items-center gap-2 text-sm text-dim sm:text-right">
            {isCurrent && (
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            )}
            {experience.dateRange}
          </p>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-dim transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-strong motion-reduce:transition-none",
              isExpanded ? "rotate-0" : "-rotate-90",
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      <div
        id={detailsId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isExpanded}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "px-1 pb-5 pt-1 pl-[3.6rem] text-sm leading-relaxed text-dim transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              isExpanded
                ? "translate-y-0 opacity-100 delay-75"
                : "-translate-y-1 opacity-0 delay-0",
            )}
          >
            <ul className="list-[square] space-y-2 pl-5 marker:text-brand/80">
              {experience.highlights.map((highlight, index) => (
                <HighlightItem
                  key={
                    typeof highlight === "string"
                      ? highlight
                      : `${highlight.text}-${index}`
                  }
                  highlight={highlight}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

type ExperienceSectionProps = {
  limit?: number;
  showViewAllButton?: boolean;
  showFeaturedLabel?: boolean;
  heading?: string;
  className?: string;
  items?: Experience[];
  expandAllByDefault?: boolean;
};

export default function ExperienceSection({
  limit,
  showViewAllButton = false,
  showFeaturedLabel = true,
  heading = "Experience",
  className,
  items = experiences,
  expandAllByDefault = false,
}: ExperienceSectionProps) {
  const [expandedExperienceId, setExpandedExperienceId] = useState<string | null>(
    null,
  );
  const [expandedExperienceIds, setExpandedExperienceIds] = useState<string[]>(
    () => (expandAllByDefault ? items.map((experience) => experience.id) : []),
  );
  const visibleExperiences =
    typeof limit === "number" ? items.slice(0, limit) : items;

  const hasMore = typeof limit === "number" && items.length > limit;

  return (
    <section
      id="experience"
      className={cn(
        "w-full bg-canvas px-4 py-20 font-sans md:px-10",
        className,
      )}
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-3xl">
        {showFeaturedLabel && (
          <p className="mb-4 inline-flex items-center gap-2 border border-brand/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-brand">
            <span aria-hidden>✕</span> FEATURED
          </p>
        )}

        <h2
          id="experience-heading"
          className={cn(
            "text-3xl font-bold tracking-tight text-strong md:text-4xl",
            !showFeaturedLabel && "mb-10 md:mb-12",
          )}
        >
          {heading}
        </h2>
        {showFeaturedLabel && (
          <p className="mt-3 mb-10 max-w-xl text-sm leading-relaxed text-dim md:mb-12">
            Roles I&apos;ve held while shipping products with founders and teams
            across India, Italy, and the UAE.
          </p>
        )}

        <div className="border-y border-line">
          {visibleExperiences.map((experience) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              isExpanded={
                expandAllByDefault
                  ? expandedExperienceIds.includes(experience.id)
                  : expandedExperienceId === experience.id
              }
              onToggle={() => {
                if (expandAllByDefault) {
                  setExpandedExperienceIds((currentIds) =>
                    currentIds.includes(experience.id)
                      ? currentIds.filter((id) => id !== experience.id)
                      : [...currentIds, experience.id],
                  );
                  return;
                }

                setExpandedExperienceId((currentId) =>
                  currentId === experience.id ? null : experience.id,
                );
              }}
            />
          ))}
        </div>

        {showViewAllButton && hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-transparent px-6 py-2.5 text-sm font-medium text-strong transition-colors hover:border-line-hover hover:bg-surface"
            >
              Show all work experience
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}