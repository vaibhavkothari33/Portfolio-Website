"use client";

import { motion } from "framer-motion";

const skills = [
    "Next.js", "TypeScript", "Go","React Js","React-Native", "JavaScript", "Node.js", "Python", "FastAPI", "FireBase", "appwrite", "Git"
];

const colors = [
    "bg-gray-400 text-black dark:bg-gray-800 dark:text-white",
    "bg-blue-400 text-black dark:bg-blue-800 dark:text-white",
    "bg-blue-400 text-black dark:bg-blue-400 dark:text-white",
    "bg-pink-400 text-black dark:bg-pink-800 dark:text-white",
    "bg-cyan-400 text-black dark:bg-cyan-600 dark:text-white",
    "bg-yellow-400 text-black dark:bg-yellow-500 dark:text-white",
    "bg-green-400 text-black dark:bg-green-800 dark:text-white",
    "bg-purple-400 text-black dark:bg-purple-800 dark:text-white",
    "bg-green-400 text-black dark:bg-green-800 dark:text-white",
    "bg-orange-400 text-black dark:bg-orange-800 dark:text-white",
    // "bg-indigo-400 text-black dark:bg-indigo-800 dark:text-white",
    "bg-red-400 text-black dark:bg-red-600 dark:text-white",
    "bg-orange-400 text-black dark:bg-orange-500 dark:text-white",
    // "bg-yellow-400 text-black dark:bg-yellow-500 dark:text-white",
    // "bg-teal-400 text-black dark:bg-teal-800 dark:text-white"
];

const Skills = () => {
    return (
        <section className="py-12 px-6 sm:px-12 lg:px-56 dark:bg-neutral-950 text-black dark:text-white">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8">Skills</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md ${colors[index % colors.length]}`}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
