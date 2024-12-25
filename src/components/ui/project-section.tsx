import React from "react";
import { FollowerPointerCard } from "./following-pointer";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import Image from "next/image";

const projects = [
  {
    title: "Postly",
    image: "https://i.ibb.co/qsbX8R7/Screenshot-2024-12-25-021126.png",
    technologies: ["React", "Appwrite", "Node.js"],
    description: "A blogging website where you can write and share your thoughts.",
    github: "https://github.com/vaibhavkothari33/Postly",
    preview: "",
  },
  {
    title: "Sanjeevan",
    image: "https://i.ibb.co/7Jbhsgp/Screenshot-2024-12-25-020904.png",
    technologies: ["Firebase", "WebRTC", "Python", "JavaScript"],
    description: "A video calling application for the people who can't speak.",
    github: "https://github.com/vaibhavkothari33/Hackfest",
    preview: "https://vaibhavkothari33.github.io/Hackfest/index.html",
  },
  {
    title: "SentiTune",
    image: "https://i.ibb.co/Lgs6Pym/Screenshot-2024-12-25-020431.png",
    technologies: ["Python", "FastAPI", "FireBase", "scikit-learn"],
    description: "A web application that suggests songs based on your mood.",
    github: "https://github.com/vaibhavkothari33/SentiTune",
    preview: "https://vaibhavkothari33.github.io/SentiTune/",
  },
];

export const ProjectSection = () => {
  return (
    <section className="py-12 px-6 sm:px-12 lg:px-56 bg-white  text-black dark:bg-neutral-950 dark:text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FollowerPointerCard
              key={index}
              className="p-4 bg-white border border-gray-700 dark:bg-neutral-900 shadow-lg rounded-lg transition-transform transform hover:scale-105"
              title={project.title}  // Add title prop
            >
              <Image
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md"
              width={400} 
              height={200}
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
                <IconBrandGithub />
                {/* GitHub */}
              </a>
              <a
                href={project.preview}
                target="_blank"
                title="Preview"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                <IconLink />
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
