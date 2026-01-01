"use client";
import "@/components/ui/button.css";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-stone-50 dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-5xl mb-4 text-black dark:text-white font-extrabold">
          <b>About</b>
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl max-w-3xl">
          Hi, I&apos;m Vaibhav, a passionate <b className="font-extrabold">Full-Stack Developer</b> and tech enthusiast currently pursuing a <b className="font-extrabold">Bachelor of Technology in Computer Science Engineering</b> at Bennett University (2023-2027). My journey revolves around building innovative solutions, contributing to <b className="font-extrabold">open-source projects</b>, and continuously exploring new technologies, including the exciting world of <b className="font-extrabold">Machine Learning</b>.
        </p>
        {/* resume button */}
        <a href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer">
          <button className="button">
            <span className="button_lg">
              <span className="button_sl" />
              <span className="button_text">
                View My Resume
              </span>
            </span>
          </button>
        </a>
      </div>
      <h2 className="text-2xl text-center md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
        Milestones of My Tech Odyssey
      </h2>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
         {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10 group">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-lg">
                <div className="h-4 w-4 rounded-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 p-2 transition-all group-hover:scale-125" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// "use client";
// import "@/components/ui/button.css";
// import { useScroll, useTransform, motion } from "framer-motion";
// import React, { useEffect, useRef, useState } from "react";

// interface TimelineEntry {
//   title: React.ReactNode;
//   content: React.ReactNode;
// }

// export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (ref.current) {
//       const rect = ref.current.getBoundingClientRect();
//       setHeight(rect.height);
//     }
//   }, [ref]);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start 10%", "end 50%"],
//   });

//   const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
//   const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

//   return (
//     <div className="w-full bg-stone-50 dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
//       <div className="max-w-6xl mx-auto py-20 px-4 md:px-8 lg:px-10">
//         <h2 className="text-3xl md:text-5xl mb-4 text-black dark:text-white font-extrabold">About</h2>
//         <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl max-w-3xl leading-relaxed">
//           Hi, I&apos;m Vaibhav, a passionate <b className="font-extrabold">Full-Stack Developer</b> and tech enthusiast currently pursuing a <b className="font-extrabold">Bachelor of Technology in Computer Science Engineering</b> at Bennett University (2023-2027). My journey revolves around building innovative solutions, contributing to <b className="font-extrabold">open-source projects</b>, and continuously exploring new technologies, including the exciting world of <b className="font-extrabold">Machine Learning</b>.
//         </p>
//         {/* Resume button */}
//         <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
//           <button className="button hover:scale-105 transition-transform">
//             <span className="button_lg">  
//               <span className="button_sl" />
//               <span className="button_text">View My Resume</span>
//             </span>
//           </button>
//         </a>
//       </div>
//       <h2 className="text-2xl text-center md:text-4xl mb-4 text-black dark:text-white max-w-4xl">Milestones of My Tech Odyssey</h2>

//       <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
//         {data.map((item, index) => (
//           <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10 group">
//             <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
//               <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-lg">
//                 <div className="h-4 w-4 rounded-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 p-2 transition-all group-hover:scale-125" />
//               </div>
//               <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
//                 {item.title}
//               </h3>
//             </div>

//             <div className="relative pl-20 pr-4 md:pl-4 w-full bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md group-hover:shadow-xl transition-shadow">
//               <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-400">
//                 {item.title}
//               </h3>
//               {item.content}
//             </div>
//           </div>
//         ))}
//         <div
//           style={{ height: height + "px" }}
//           className="absolute md:left-8 left-8 top-0 w-[2px] "
//         >
//           <motion.div
//             style={{ height: heightTransform, opacity: opacityTransform }}
//             className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent rounded-full shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
