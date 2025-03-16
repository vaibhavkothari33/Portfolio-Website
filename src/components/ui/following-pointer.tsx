import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const offsetY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      x.set(offsetX);
      y.set(offsetY);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
    setIsInside(true);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      ref={ref}
      className={cn("relative overflow-hidden rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-all hover:shadow-xl", className)}
      style={{
        cursor: "none",
      }}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  title?: string | React.ReactNode;
}) => {
  const colors = [
    "#38bdf8", "#64748b", "#2dd4bf", "#22c55e", "#3b82f6",
    "#ef4444", "#facc15", "#f97316", "#a855f7", "#ec4899",
    "#6366f1", "#84cc16", "#f59e0b", "#06b6d4"
  ];

  return (
    <motion.div
      className="h-5 w-5 rounded-full absolute z-50 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: colors[0], // Fixed index for consistency
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className="px-2 py-1 bg-neutral-200 text-black dark:text-white whitespace-nowrap min-w-max text-xs rounded-full shadow-md"
      >
        {title || `Hovering...`} {/* Fallback text */}
      </motion.div>
    </motion.div>
  );
};
