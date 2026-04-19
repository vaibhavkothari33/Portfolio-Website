import React from "react";
import { FollowerPointerCard } from "./following-pointer";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import Image from "next/image";
import "@/components/ui/button.css";
import Link from "next/link";

const projects = [
    {
    title: "Learn Loop",
    image: "/learnloop.png",
    technologies: ["Next js", "Solidity","Open Router","Appwrite","ERC-721"],
    description:
      "Most people watch tutorials and forget everything. LearnLoop fixes that, paste a YouTube video, get a personalized learning path, a real coding challenge, and AI that grades your GitHub repo checkpoint by checkpoint.",
    longDescription:
      "Most people watch tutorials and forget everything within 48 hours. LearnLoop closes that gap. Paste any YouTube educational video. The AI reads its transcript, builds a personalised learning path, assigns you a real coding challenge, grades your GitHub repo checkpoint by checkpoint",
    github: "https://github.com/vaibhavkothari33/LearnLoop",
    preview: "https://hackacinno.vercel.app/dashboard",
  },
    {
    title: "Green Whistle",
    // image: "https://i.ibb.co/8gYkjCKM/Screenshot-2025-04-21-153918.png",
    image: "/Green.png",
    technologies: ["Monad", "Next js", "Solidity","Phaser js", "Grid Engine", "Groq"],
    description:
      "Dive into a vibrant world of farming, trading, and adventure. Grow your crops, catch fish, and trade with friends in this immersive pixelated universe.",
    longDescription:
      "Dive into a vibrant world of farming, trading, and adventure. Grow your crops, catch fish, and trade with friends in this immersive pixelated universe.",
    github: "https://github.com/vaibhavkothari33/Greenwhistle",
    preview: "https://greenwhistle.vercel.app/",
  },
  {
    title: "Mentora",
    image: "https://i.ibb.co/8gYkjCKM/Screenshot-2025-04-21-153918.png",
    // image: "/Mentora.png",
    technologies: ["Edu Chain","React", "Agent Zero","Fast API", "Gemini"],
    description:
      "Mentora is a revolutionary blockchain-based learning platform that combines decentralized education with verifiable credentials. Our platform enables students to access high-quality courses while earning NFT certificates that prove their achievements.",
    longDescription:
    "Mentora is a revolutionary blockchain-based learning platform that combines decentralized education with verifiable credentials. Our platform enables students to access high-quality courses while earning NFT certificates that prove their achievements.",
    github: "https://github.com/vaibhavkothari33/Mentora",
    preview: "https://mentora-rust.vercel.app/",
  },
  // {
  //   title: "BlockBinge",
  //   image: "/Block.png",
  //   technologies: ["React", "EtherJs", "Solidity", "Reactive Smart Contract"],
  //   description:
  //     "BlockBinge is a decentralized, web3-based streaming platform where we follow a pay-as-you-watch model. You only need to pay for the minutes you have watched.",
  //   github: "https://github.com/vaibhavkothari33/blockBinge/",
  //   preview: "https://blockbinge.vercel.app/",
  // },
  {
    title: "FiteX",
    image: "/Fitex.png",
    technologies: ["React-Native","Expo-Go", "GoogleFit", "FireBase", "Gen AI"],
    description:
      "FiteX is a modern fitness app designed to help users stay active, healthy, and motivated.",
    github: "https://github.com/vaibhavkothari33/FiteX",
    preview: "",
  },
];

export const ProjectSection = () => {
  return (
    <section className="py-36 px-6 sm:px-12 md:px-24 lg:px-80 dark:bg-neutral-950 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <FollowerPointerCard
              key={index}
              className="p-6 bg-gray-900 border border-gray-700 shadow-2xl rounded-xl transition-transform transform hover:scale-105 hover:shadow-blue-500/50 animate-slide-up"
              title={project.title}
            >
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md"
                width={400}
                height={200}
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-400">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition-all"
                >
                  <IconBrandGithub className="w-5 h-5" />
                  GitHub
                </a>
                {project.preview && (
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-500 transition-all"
                  >
                    <IconLink className="w-5 h-5" />
                    Preview
                  </a>
                )}
              </div>
            </FollowerPointerCard>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Link href="/projects">
            <button className="button">
              <span className="button_lg">
                <span className="button_sl" />
                <span className="button_text">
                  View All Projects
                </span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
