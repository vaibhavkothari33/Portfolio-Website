"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ExperienceSection from "@/components/ui/experience-section";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-black dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 md:py-20">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <IconArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>

        <motion.p
          className="mb-16 max-w-2xl text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A complete timeline of my professional roles — from founding engineering and
          full-stack product work to internships and technical leadership on campus.
        </motion.p>
      </div>

      <ExperienceSection
        showFeaturedLabel={false}
        heading="All Work Experience"
        className="py-0 pb-20 pt-0"
      />
    </div>
  );
}
