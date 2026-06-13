"use client";

import { featuredProjects, type Project } from "@/data/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ProjectSectionProps = {
  projects?: Project[];
  heading?: string;
  description?: string;
  showTag?: boolean;
  showViewAllButton?: boolean;
  className?: string;
};

export default function ProjectSection({
  projects = featuredProjects,
  heading = "Selected work",
  description = "Products shipped across web, mobile, AI, and Web3 — from hackathon prototypes to production-ready platforms.",
  showTag = true,
  showViewAllButton = true,
  className,
}: ProjectSectionProps) {
  return (
    <section
      id="projects"
      className={cn(
        "w-full bg-neutral-950 px-4 py-16 text-white md:px-10 md:py-20",
        className,
      )}
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            !showTag && !description ? "mb-5 md:mb-6" : "mb-8 md:mb-10",
            showTag && description && "mb-10 md:mb-12",
          )}
        >
          {showTag && (
            <p className="mb-4 inline-flex items-center gap-2 border border-red-500/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-red-500">
              <span aria-hidden>✕</span> PROJECTS
            </p>
          )}
          <h2
            id="projects-heading"
            className="text-2xl font-bold leading-tight tracking-tight md:text-3xl"
          >
            {heading}
          </h2>
          {description && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {showViewAllButton && (
          <div className="mt-10 flex justify-center md:mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-neutral-500 hover:bg-neutral-900"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
