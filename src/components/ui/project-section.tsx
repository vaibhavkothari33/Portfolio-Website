import React from "react";
import { FollowerPointerCard } from "./following-pointer";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import Image from "next/image";

const projects = [
  {
    title: "BlockBinge",
    image: "/Block.png",
    technologies: ["React", "EtherJs", "Solidity","Reactive Smart Contract"],
    description: "BlockBinge is a decentralized, web3 based streaming platform where in we follow pay as you watch model. You only need to pay for the minutes you have watched.",
    github: "https://github.com/vaibhavkothari33/blockBinge/",
    preview: "https://blockbinge.vercel.app/",
  },
  {
    title: "FiteX",
    image: "/Fitex.png",
    technologies: ["React-Native", "GoogleFit", "FireBase", "Gen AI"],
    description: "FiteX is a modern fitness app designed to help users stay active, healthy, and motivated. ",
    github: "https://github.com/vaibhavkothari33/FiteX",
    preview: "",
  },
  {
    title: "Sanjeevan",
    image: "https://i.ibb.co/7Jbhsgp/Screenshot-2024-12-25-020904.png",
    technologies: ["Firebase", "Web Sockets", "WebRTC", "Python", "JavaScript"],
    description: "An innovative video calling app designed for individuals with speech impairments, providing seamless communication.",
    github: "https://github.com/vaibhavkothari33/Hackfest",
    preview: "https://vaibhavkothari33.github.io/Hackfest/index.html",
  },
  {
    title: "PaiseKaHisab",
    image: "https://i.ibb.co/28VpFr0/Screenshot-2025-01-03-011815.png",
    technologies: ["Firebase", "Chart.js", "JavaScript", "Hacktoberfest"],
    description: "A comprehensive open-sourced finance management tool for tracking expenses, visualizing patterns, and receiving financial tips.",
    github: "https://github.com/vaibhavkothari33/PaiseKaHisab",
    preview: "https://vaibhavkothari33.github.io/PaiseKaHisab/",
  },
  // {
  //   title: "SentiTune",
  //   image: "https://i.ibb.co/gv493p3/Screenshot-2025-01-03-012106.png",
  //   technologies: ["Python", "FastAPI", "Uvicorn", "scikit-learn"],
  //   description: "An AI-powered web app that suggests songs tailored to your mood and emotions using the Spotify API.",
  //   github: "https://github.com/vaibhavkothari33/SentiTune",
  //   preview: "https://vaibhavkothari33.github.io/SentiTune/",
  // },

];

export const ProjectSection = () => {
    return (
      <section className="py-36 px-6 sm:px-12 md:px-24 lg:px-80 bg-white text-black dark:bg-neutral-950 dark:text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <FollowerPointerCard
                key={index}
                className="p-4 bg-white border border-gray-800 dark:bg-neutral-900 dark:border-gray-400 shadow-lg rounded-lg transition-transform transform hover:scale-105"
                title={project.title} // Add title prop
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
                <br />
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
                <div className="flex justify-end mt-6 space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition-all"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Preview"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-500 transition-all"
                  >
                    <IconLink className="w-4 h-4" />
                    Preview
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
