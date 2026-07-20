"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { experiences, type Experience, type ExperienceHighlight } from "@/data/experience";
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

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="border-b border-line/80 pb-10 last:border-b-0 last:pb-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-2xl font-semibold text-strong">
              {experience.company}
            </h3>
            {experience.website && (
              <a
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${experience.company} website`}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-dim transition-colors hover:bg-elevated hover:text-strong"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="shrink-0 text-base text-dim sm:text-right">
          {experience.dateRange}
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-base font-medium text-strong">{experience.role}</p>
        <p className="text-base text-dim sm:text-right">
          {experience.location}
        </p>
      </div>

      <ul className="mt-4 list-[square] space-y-2 pl-5 text-md leading-relaxed text-dim marker:text-subtle">
        {experience.highlights.map((highlight, index) => (
          <HighlightItem
            key={typeof highlight === "string" ? highlight : `${highlight.text}-${index}`}
            highlight={highlight}
          />
        ))}
      </ul>
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
};

export default function ExperienceSection({
  limit,
  showViewAllButton = false,
  showFeaturedLabel = true,
  heading = "Experience",
  className,
  items = experiences,
}: ExperienceSectionProps) {
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
          <p className="mb-2 text-sm text-dim">Featured</p>
        )}
        <h2
          id="experience-heading"
          className="mb-12 text-3xl font-bold tracking-tight text-strong md:text-4xl"
        >
          {heading}
        </h2>

        <div className="space-y-10">
          {visibleExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {showViewAllButton && hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-transparent px-6 py-2.5 text-sm font-medium text-strong transition-colors hover:bg-surface"
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