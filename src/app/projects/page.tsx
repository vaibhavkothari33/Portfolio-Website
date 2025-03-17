"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconBrandGithub, IconLink, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import PixelTrail from "@/components/ui/PixelTrail";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { motion } from "framer-motion";

const projects = [
  {
    title: "BlockBinge",
    image: "/Block.png",
    technologies: ["React", "EtherJs", "Solidity", "Reactive Smart Contract"],
    description:
      "BlockBinge is a decentralized, web3-based streaming platform where we follow a pay-as-you-watch model. You only need to pay for the minutes you have watched.",
    longDescription: 
      "BlockBinge revolutionizes content streaming with blockchain technology. Users connect their MetaMask wallet and only pay for the exact minutes they watch. The platform features a reactive smart contract system that tracks viewing time and processes micropayments automatically. Content creators receive fair compensation directly from viewers without intermediaries taking a cut.",
    github: "https://github.com/vaibhavkothari33/blockBinge/",
    preview: "https://blockbinge.vercel.app/",
  },
  {
    title: "FiteX",
    image: "/Fitex.png",
    technologies: ["React-Native", "GoogleFit", "FireBase", "Gen AI"],
    description:
      "FiteX is a modern fitness app designed to help users stay active, healthy, and motivated.",
    longDescription:
      "FiteX combines cutting-edge technology with fitness science to create a personalized workout experience. The app integrates with Google Fit to track activities and vital signs, while using AI to generate custom workout plans based on user goals and progress. Firebase powers the backend, enabling real-time data synchronization and user authentication. The app includes features like workout tracking, nutrition planning, progress visualization, and community challenges.",
    github: "https://github.com/vaibhavkothari33/FiteX",
    preview: "",
  },
  {
    title: "Sanjeevan",
    image: "https://i.ibb.co/7Jbhsgp/Screenshot-2024-12-25-020904.png",
    technologies: ["Firebase", "Web Sockets", "WebRTC", "Python", "JavaScript"],
    description:
      "An innovative video calling app designed for individuals with speech impairments, providing seamless communication.",
    longDescription:
      "Sanjeevan bridges communication gaps for people with speech impairments through innovative technology. The application uses WebRTC for high-quality, low-latency video calls and incorporates a real-time sign language recognition system built with Python and TensorFlow. Firebase handles user authentication and stores conversation history. The app features an AI-powered text-to-speech system that converts sign language to spoken words and includes an emergency contact system for quick assistance.",
    github: "https://github.com/vaibhavkothari33/Hackfest",
    preview: "https://vaibhavkothari33.github.io/Hackfest/index.html",
  },
  {
    title: "PaiseKaHisab",
    image: "https://i.ibb.co/28VpFr0/Screenshot-2025-01-03-011815.png",
    technologies: ["Firebase", "Chart.js", "JavaScript", "Hacktoberfest"],
    description:
      "A comprehensive open-sourced finance management tool for tracking expenses, visualizing patterns, and receiving financial tips.",
    longDescription:
      "PaiseKaHisab is a financial management application that helps users take control of their finances. The app allows users to track expenses across multiple categories, set budgets, and visualize spending patterns through interactive charts powered by Chart.js. Firebase provides secure data storage and authentication. The application offers personalized financial insights based on spending habits and includes features like bill reminders, savings goals, and expense sharing for group expenses. As an open-source project, it actively welcomes contributions from the developer community.",
    github: "https://github.com/vaibhavkothari33/PaiseKaHisab",
    preview: "https://vaibhavkothari33.github.io/PaiseKaHisab/",
  },
  
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-6 sm:px-12 md:px-24 relative overflow-hidden">
    
      <div className="fixed inset-0 w-full h-full z-0">
        <PixelTrail
          gridSize={50}
          trailSize={0.15}
          maxAge={200}
          interpolate={5}
          color="#ff6347" // tomato color to match previous theme
          gooeyFilter={{ id: "pixel-trail-gooey", strength: 6 }}
          className="w-full h-full"
          canvasProps={{ style: { width: '100%', height: '100%' } }}
        />
      </div>
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 to-gray-950/90 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="flex items-center mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <IconArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          My Projects Portfolio
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Explore my collection of projects spanning web development, mobile applications, and blockchain technology. 
          Each project represents my passion for creating innovative solutions to real-world problems.
        </motion.p>
        
        {/* Grid layout for projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              custom={index}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <FollowerPointerCard
                title={project.title}
                className="flex flex-col h-full bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-tomato/30"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-md group mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-blue-400 mb-3">{project.title}</h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md hover:bg-blue-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm mb-6 flex-grow">{project.description}</p>
                
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition-all flex-1 justify-center"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    GitHub
                  </a>
                  {project.preview && (
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-500 transition-all flex-1 justify-center"
                    >
                      <IconLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </FollowerPointerCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 