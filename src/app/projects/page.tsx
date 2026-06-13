"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ProjectSection from "@/components/ui/project-section";
import { allProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-10 md:pt-20">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-neutral-400 transition-colors hover:text-white"
          >
            <IconArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>

        <motion.p
          className="max-w-2xl text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Explore my full project archive — web apps, mobile products, AI tools,
          and Web3 builds spanning hackathons, internships, and personal experiments.
        </motion.p>
      </div>

      <ProjectSection
        projects={allProjects}
        heading="All Projects"
        description=""
        showTag={false}
        showViewAllButton={false}
        className="pb-20 pt-4"
      />
    </div>
  );
}
