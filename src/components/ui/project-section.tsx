import React from "react";
import { FollowerPointerCard } from "./following-pointer";
import {IconBrandGithub, IconLink} from "@tabler/icons-react";

const projects = [
  {
    title: "Blogging Website",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4",
    technologies: ["React", "Appwrite", "Node.js"],
    description: "A modern portfolio showcasing my work and skills.",
    github: "https://github.com/username/portfolio",
    preview: "https://portfolio.example.com",
  },
  {
    title: "Sanjeevan",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4",
    technologies: ["Firebase", "Next.js", "Node.js"],
    description: "A modern portfolio showcasing my work and skills.",
    github: "https://github.com/username/portfolio",
    preview: "https://portfolio.example.com",
  },
  {
    title: "E-commerce App",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4",
    technologies: ["React", "Express", "MongoDB","paypal"],
    description: "A full-stack e-commerce application with payment.",
    github: "https://github.com/username/ecommerce-app",
    preview: "https://ecommerce.example.com",
  },
];

export const ProjectSection = () => {
    return (
      <section className="py-12 px-6 sm:px-12 lg:px-56  bg-white text-black dark:bg-neutral-950 dark:text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <FollowerPointerCard
                key={index}
                className="p-4 bg-white dark:bg-neutral-900 shadow-lg rounded-lg transition-transform transform hover:scale-105"
                title={project.title} // Pass title to FollowerPointerCard
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end mt-4 space-x-6 ">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    <IconBrandGithub/>
                    {/* GitHub */}
                  </a>
                  <a
                    href={project.preview}
                    target="_blank"
                    title="Preview"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline"
                  ><IconLink/>
                  </a>
                </div>
              </FollowerPointerCard>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ProjectSection;
  