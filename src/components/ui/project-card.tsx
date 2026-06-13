import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full w-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-3.5 md:p-4">
      <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-800/80 bg-neutral-950/60 md:h-40">
        <Image
          src={project.image}
          alt={project.title}
          width={640}
          height={400}
          className="h-full w-full object-contain p-2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-500">
            {project.label}
          </p>
          <span className="text-[11px] tabular-nums text-neutral-600">{project.id}</span>
        </div>

        <h3 className="mb-2 text-sm font-semibold leading-snug text-white md:text-base">
          {project.title}
        </h3>

        <p className="mb-3 text-xs leading-relaxed text-neutral-400 md:text-sm">
          {project.description}
        </p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 7).map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-full border border-dashed border-neutral-700 bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium text-neutral-400 md:text-[11px]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 7 && (
            <span className="inline-flex px-1 py-0.5 text-[10px] text-neutral-500">
              +{project.technologies.length - 7}
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
