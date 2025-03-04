"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface LoaderProps {
  text?: string;
}

export function Loader({ text }: LoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = useMemo(() => [
    "Initializing",
    "Loading Assets",
    "Preparing Data",
    "Almost Ready",
  ], []);

  useEffect(() => {
    setMounted(true);
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    // Only set up text rotation if no custom text is provided
    const textTimer = !text ? setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 2000) : undefined;

    return () => {
      clearInterval(progressTimer);
      if (textTimer) clearInterval(textTimer);
    };
  }, [loadingTexts.length, text]);

  // DNA Helix points
  const generateDNAPoints = () => {
    const points = [];
    const steps = 20;
    for (let i = 0; i < steps; i++) {
      const progress = i / steps;
      const angle = progress * Math.PI * 2;
      points.push({
        x1: 50 + Math.cos(angle) * 20,
        y1: progress * 100,
        x2: 50 + Math.cos(angle + Math.PI) * 20,
        y2: progress * 100,
        opacity: Math.sin(progress * Math.PI),
      });
    }
    return points;
  };

  const dnaPoints = generateDNAPoints();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-[400px] h-[400px]">
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient-x rounded-full blur-3xl opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-secondary/20 to-primary/20 animate-gradient-x rounded-full blur-3xl opacity-30 animation-delay-1000" />
        </div>

        <div className="relative w-full h-full">
          {/* DNA Helix Animation */}
          <svg className="absolute inset-0 w-full h-full">
            {dnaPoints.map((point, i) => (
              <g key={i}>
                <motion.line
                  x1={`${point.x1}%`}
                  y1={`${point.y1}%`}
                  x2={`${point.x2}%`}
                  y2={`${point.y2}%`}
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: point.opacity * 0.5 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                />
                <motion.circle
                  cx={`${point.x1}%`}
                  cy={`${point.y1}%`}
                  r="2"
                  className="fill-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: point.opacity }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                />
                <motion.circle
                  cx={`${point.x2}%`}
                  cy={`${point.y2}%`}
                  r="2"
                  className="fill-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: point.opacity }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Circular Progress */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90 transform">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-primary/20"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-primary"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={552}
                  strokeDashoffset={552 - (552 * progress) / 100}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-2"
                >
                  <motion.div
                    key={text || textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-xl font-medium text-primary"
                  >
                    {text || loadingTexts[textIndex]}
                  </motion.div>
                  <div className="text-3xl font-bold text-primary">{progress}%</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Particle Field */}
          <AnimatePresence>
            {mounted && (
              <>
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary"
                    initial={{
                      scale: 0,
                      opacity: 0,
                      x: "50%",
                      y: "50%",
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.7, 0],
                      x: [
                        "50%",
                        `${50 + (Math.random() - 0.5) * 150}%`,
                        `${50 + (Math.random() - 0.5) * 200}%`,
                      ],
                      y: [
                        "50%",
                        `${50 + (Math.random() - 0.5) * 150}%`,
                        `${50 + (Math.random() - 0.5) * 200}%`,
                      ],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                    style={{
                      width: `${2 + Math.random() * 4}px`,
                      height: `${2 + Math.random() * 4}px`,
                    }}
                  />
                ))}

                {/* Orbital Particles */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const angle = (i * 2 * Math.PI) / 5;
                  return (
                    <motion.div
                      key={`orbital-${i}`}
                      className="absolute w-3 h-3 rounded-full bg-primary/40 blur-sm"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4],
                        x: [
                          `${50 + Math.cos(angle) * 30}%`,
                          `${50 + Math.cos(angle + Math.PI) * 30}%`,
                          `${50 + Math.cos(angle) * 30}%`,
                        ],
                        y: [
                          `${50 + Math.sin(angle) * 30}%`,
                          `${50 + Math.sin(angle + Math.PI) * 30}%`,
                          `${50 + Math.sin(angle) * 30}%`,
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.2,
                      }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 