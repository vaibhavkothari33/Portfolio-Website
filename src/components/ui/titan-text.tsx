"use client";

import { motion } from "framer-motion";

export const TitanText = () => {
  return (
    <div
      className="relative hidden w-full overflow-hidden border-t border-line bg-canvas md:block"
      style={{
        height: "clamp(50px, 45vh, 400px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-full select-none whitespace-nowrap text-center text-[28vw] font-bold tracking-tighter text-strong lg:text-[25vw] xl:text-[22vw] 2xl:text-[20vw]"
        style={{
          top: "5%",
          transform: "translateY(-50%)",
        }}
      >
        VAIBHAV
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas via-canvas to-transparent"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />
    </div>
  );
};

export default TitanText;

// "use client";

// import { cn } from "@/lib/utils";
// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { useCallback, useRef } from "react";

// const LETTERS = "VAIBHAV".split("");

// function GridBackdrop() {
//   return (
//     <>
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.35]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, rgb(64 64 64 / 0.35) 1px, transparent 1px),
//             linear-gradient(to bottom, rgb(64 64 64 / 0.35) 1px, transparent 1px)
//           `,
//           backgroundSize: "56px 56px",
//         }}
//         aria-hidden
//       />
//       <svg
//         className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 text-neutral-800/50"
//         viewBox="0 0 320 320"
//         aria-hidden
//       >
//         <circle cx="160" cy="160" r="150" fill="none" stroke="currentColor" strokeWidth="0.75" />
//         <circle cx="160" cy="160" r="110" fill="none" stroke="currentColor" strokeWidth="0.75" />
//         <circle cx="160" cy="160" r="70" fill="none" stroke="currentColor" strokeWidth="0.75" />
//         <line x1="160" y1="10" x2="160" y2="310" stroke="currentColor" strokeWidth="0.75" />
//         <line x1="10" y1="160" x2="310" y2="160" stroke="currentColor" strokeWidth="0.75" />
//       </svg>
//     </>
//   );
// }

// function OutlineName({
//   parallaxX,
//   parallaxY,
// }: {
//   parallaxX: ReturnType<typeof useSpring>;
//   parallaxY: ReturnType<typeof useSpring>;
// }) {
//   return (
//     <motion.div
//       style={{ x: parallaxX, y: parallaxY }}
//       className="group relative select-none text-center"
//     >
//       <h2
//         aria-label="Vaibhav Kothari"
//         className="relative flex justify-center whitespace-nowrap text-[18vw] font-bold leading-none tracking-tighter md:text-[14vw] lg:text-[12vw] xl:text-[10vw]"
//       >
//         {LETTERS.map((letter, index) => (
//           <motion.span
//             key={`${letter}-${index}`}
//             initial={{ opacity: 0, y: 48 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-10%" }}
//             transition={{
//               duration: 0.55,
//               delay: index * 0.07,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="relative inline-block"
//           >
//             {/* Outline layer */}
//             <span
//               className="text-transparent transition-[filter] duration-500 group-hover:[-webkit-text-stroke-color:rgb(239_68_68/0.55)]"
//               style={{ WebkitTextStroke: "1.5px rgb(82 82 82)" }}
//               aria-hidden
//             >
//               {letter}
//             </span>
//             {/* Gradient fill layer */}
//             <span
//               className="absolute inset-0 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
//               aria-hidden
//             >
//               {letter}
//             </span>
//           </motion.span>
//         ))}
//       </h2>

//       <motion.p
//         initial={{ opacity: 0, letterSpacing: "0.6em" }}
//         whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
//         className="mt-2 font-mono text-[10px] uppercase text-neutral-500 md:mt-3 md:text-xs"
//       >
//         Kothari
//       </motion.p>
//     </motion.div>
//   );
// }

// export const TitanText = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
//     stiffness: 120,
//     damping: 20,
//   });
//   const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), {
//     stiffness: 120,
//     damping: 20,
//   });

//   const handleMouseMove = useCallback(
//     (event: React.MouseEvent<HTMLElement>) => {
//       const section = sectionRef.current;
//       if (!section) return;

//       const rect = section.getBoundingClientRect();
//       mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
//       mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
//     },
//     [mouseX, mouseY],
//   );

//   const handleMouseLeave = useCallback(() => {
//     mouseX.set(0);
//     mouseY.set(0);
//   }, [mouseX, mouseY]);

//   const year = new Date().getFullYear();

//   return (
//     <footer
//       ref={sectionRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className="relative w-full border-t border-neutral-800 bg-neutral-950 text-white"
//       aria-label="Site footer"
//     >
//       <div className="mx-auto max-w-7xl border-x border-neutral-800">
//         <div
//           className="relative overflow-hidden px-4 py-14 md:px-10 md:py-16"
//           style={{ minHeight: "clamp(180px, 32vh, 300px)" }}
//         >
//           <GridBackdrop />

//           <div
//             className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.07)_0%,_transparent_65%)]"
//             aria-hidden
//           />

//           <motion.div
//             className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.85)]"
//             animate={{ opacity: [1, 1, 0.2, 1, 1] }}
//             transition={{
//               duration: 4.5,
//               times: [0, 0.82, 0.88, 0.94, 1],
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             aria-hidden
//           />

//           <div className="relative z-10 mb-8 flex items-center justify-between md:mb-10">
//             <p className="inline-flex items-center gap-2 border border-red-500/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-red-500 md:px-3 md:py-1 md:text-[11px] md:tracking-[0.25em]">
//               <span aria-hidden>✕</span> Signature
//             </p>
//             <span className="font-mono text-[10px] tabular-nums text-neutral-600 md:text-xs">
//               END · 005
//             </span>
//           </div>

//           <div className="relative z-10 flex flex-col items-center justify-center pt-2 md:pt-4">
//             <OutlineName parallaxX={parallaxX} parallaxY={parallaxY} />
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.7 }}
//             className={cn(
//               "relative z-10 mt-8 flex flex-col items-center gap-2 border-t border-neutral-800/80 pt-5",
//               "md:mt-10 md:flex-row md:justify-between md:pt-6",
//             )}
//           >
//             <p className="font-mono text-[10px] text-neutral-500 md:text-[11px]">
//               © {year} Vaibhav Kothari · All rights reserved
//             </p>
//             <p className="font-mono text-[10px] text-neutral-600 md:text-[11px]">
//               Built with Next.js · Designed to ship
//             </p>
//           </motion.div>

//           <div
//             className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent"
//             aria-hidden
//           />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default TitanText;
