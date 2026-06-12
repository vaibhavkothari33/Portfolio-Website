"use client";

import { featuredProjects, type Project } from "@/data/projects";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full w-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-3.5 md:p-4">
      <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-800/80 bg-neutral-950/60 md:h-52">
        <Image
          src={project.image}
          alt={project.title}
          width={640}
          height={400}
          className="h-full w-full object-contain p-2"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-500">
            {project.label}
          </p>
          <span className="text-[11px] tabular-nums text-neutral-600">{project.id}</span>
        </div>

        <h3 className="mb-2 text-base font-semibold leading-snug text-white md:text-lg">
          {project.title}
        </h3>

        <p className="mb-3 text-xs leading-relaxed text-neutral-400 md:text-sm">
          {project.description}
        </p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-full border border-dashed border-neutral-700 bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium text-neutral-400 md:text-[11px]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="inline-flex px-1 py-0.5 text-[10px] text-neutral-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-neutral-500 hover:bg-neutral-800"
            >
              <IconBrandGithub className="h-3.5 w-3.5" stroke={1.5} />
              GitHub
            </a>
          )}
          {project.preview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-white"
            >
              <IconLink className="h-3.5 w-3.5" stroke={1.5} />
              Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="w-full bg-neutral-950 px-4 py-16 text-white md:px-10 md:py-20"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 md:mb-12">
          <p className="mb-4 inline-flex items-center gap-2 border border-red-500/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-red-500">
            <span aria-hidden>✕</span> PROJECTS
          </p>
          <h2
            id="projects-heading"
            className="text-2xl font-bold leading-tight tracking-tight md:text-3xl"
          >
            Selected work
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            Products shipped across web, mobile, AI, and Web3 — from hackathon
            prototypes to production-ready platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-neutral-500 hover:bg-neutral-900"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
