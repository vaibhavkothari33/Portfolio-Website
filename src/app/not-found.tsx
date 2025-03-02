"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Point {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulse: number;
}

interface Connection {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

interface ConstellationData {
  points: Point[];
  connections: Connection[];
}

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const calculateGlowPosition = (x: number, y: number) => {
    if (!mounted) return { x: "50%", y: "50%" };
    const boundX = Math.max(0, Math.min(100, (x / window.innerWidth) * 100));
    const boundY = Math.max(0, Math.min(100, (y / window.innerHeight) * 100));
    return { x: `${boundX}%`, y: `${boundY}%` };
  };

  const glowPosition = calculateGlowPosition(mousePosition.x, mousePosition.y);

  const generateConstellationPoints = (): ConstellationData => {
    if (!mounted) return { points: [], connections: [] };

    const points: Point[] = [];
    const pointCount = 20;

    for (let i = 0; i < pointCount; i++) {
      points.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.5,
        pulse: 1 + Math.random() * 3,
      });
    }

    const connections: Connection[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 30) {
          connections.push({
            id: `${i}-${j}`,
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            opacity: Math.max(0.05, 1 - distance / 30) * 0.4
          });
        }
      }
    }

    return { points, connections };
  };

  const constellation = mounted ? generateConstellationPoints() : { points: [], connections: [] };

  return (
    <div className="min-h-screen flex-col items-center justify-center flex relative overflow-hidden bg-black text-white">
      {/* Interactive background glow */}
      {mounted && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial="hidden"
          animate="visible"
          variants={glowVariants}
        >
          <div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/5 blur-3xl opacity-40 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: glowPosition.x,
              top: glowPosition.y,
              transition: "left 0.3s ease-out, top 0.3s ease-out"
            }}
          />
        </motion.div>
      )}

      {/* Cool constellation background */}
      <div className="absolute inset-0 -z-20">
        {/* Constellation connections */}
        <svg className="absolute inset-0 w-full h-full">
          {constellation.connections.map((connection) => (
            <motion.line
              key={connection.id}
              x1={`${connection.x1}%`}
              y1={`${connection.y1}%`}
              x2={`${connection.x2}%`}
              y2={`${connection.y2}%`}
              stroke="white"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: connection.opacity }}
              transition={{ duration: 2 }}
            />
          ))}
        </svg>

        {/* Constellation points */}
        {constellation.points.map((point) => (
          <motion.div
            key={point.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${point.size}px`,
              height: `${point.size}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [point.opacity * 0.7, point.opacity, point.opacity * 0.7],
              scale: [1, 1.2, 1]
            }}
            transition={{
              opacity: { duration: point.pulse, repeat: Infinity },
              scale: { duration: point.pulse, repeat: Infinity }
            }}
          />
        ))}
      </div>

      {/* Animated glitch text in background */}
      <div className="absolute text-white inset-0 -z-15 flex items-center justify-center overflow-hidden opacity-5">
        <motion.div
          className="text-[30vw] font-black text-white leading-none"
          animate={{
            x: [0, 2, -2, 1, -1, 0],
            opacity: [0.05, 0.06, 0.05],
          }}
          transition={{
            x: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            },
            opacity: {
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }
          }}
        >
          404
        </motion.div>
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 -z-30 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center space-y-8 max-w-2xl px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="space-y-4 text-white">
          <h1 className="text-6xl md:text-8xl text-white font-extrabold tracking-tighter ">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400"
          >
            Oops! Looks like you&apos;ve ventured into unknown territory.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-900/80 border border-gray-800 p-8 rounded-xl backdrop-blur-xl shadow-inner"
        >
          <p className="text-base md:text-lg text-gray-300">
            The page you&apos;re looking for has vanished into the digital void.
            Feel free to explore the home page or try a different path.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 text-base hover:bg-primary/20 border-primary/60 transition-all duration-300 shadow-lg shadow-primary/10 group relative overflow-hidden"
              size="lg"
            >
              <motion.span
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                className="flex items-center gap-2 relative z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Return Home
              </motion.span>

              {/* Button animation */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-30"
                    animate={{
                      left: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0.5,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-gray-500 text-sm pt-8"
        >
          <p>Lost? Try searching for what you need or check the site map.</p>
        </motion.div>
      </motion.div>

      {/* Animated particles */}
      {mounted && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/20 w-2 h-2"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.1 + Math.random() * 0.3
          }}
          animate={{
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 200],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Digital rain effect (Matrix-style) */}
      {mounted && Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute top-0 text-primary text-opacity-30 text-xs font-mono pointer-events-none overflow-hidden"
          style={{
            left: `${5 + i * 10}%`,
            width: "20px",
            height: "100%"
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <motion.div
              key={`rain-char-${i}-${j}`}
              className="absolute"
              style={{
                top: `${(j * 30) - 300}px`,
              }}
              animate={{
                y: ["0vh", "100vh"]
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            >
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}