"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Skill = {
  name: string;
  icon: string;
};

const skills: Skill[] = [
  { name: "React.js", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Go", icon: "https://cdn.simpleicons.org/go/00ADD8" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "React Native", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "Appwrite", icon: "https://cdn.simpleicons.org/appwrite/FD366E" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-canvas px-4 py-20 font-sans md:px-10"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="skills-heading"
          className="mb-3 text-3xl font-bold tracking-tight text-strong md:text-4xl"
        >
          Skills
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-dim md:text-base">
          Technologies are tools, not identities.
        </p>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-dashed border-line-strong bg-surface/80 px-4 py-2.5 text-sm font-medium text-strong transition-colors duration-300 hover:border-brand/40 hover:bg-elevated hover:shadow-[0_8px_24px_hsl(var(--brand)/0.15)]"
            >
              <motion.span
                className="inline-flex shrink-0"
                whileHover={{ rotate: [-4, 4, -4, 0], scale: 1.2 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <Image
                  src={skill.icon}
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                  className="h-[18px] w-[18px] object-contain"
                  aria-hidden
                />
              </motion.span>
              <span className="transition-colors duration-300 group-hover:text-strong">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
