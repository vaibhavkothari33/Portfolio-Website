"use client";

import { GITHUB_CONTRIBUTIONS_LOADING_GIF } from "@/lib/github-contributions";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface LoaderProps {
  text?: string;
}

const DEFAULT_MESSAGES = [
  "Cloning repository...",
  "Fetching commits...",
  "Indexing contributions...",
  "Almost there...",
];

const GRID_LEVELS = [
  "bg-neutral-800",
  "bg-emerald-900/80",
  "bg-emerald-700/80",
  "bg-emerald-600/80",
  "bg-emerald-500/90",
] as const;

function ContributionGridPreview() {
  const cells = useMemo(
    () =>
      Array.from({ length: 7 * 12 }, (_, i) => ({
        id: i,
        level: Math.floor(Math.random() * GRID_LEVELS.length),
        delay: (i % 7) * 0.04 + Math.floor(i / 7) * 0.02,
      })),
    [],
  );

  return (
    <div
      className="mt-8 grid grid-cols-12 gap-[3px] rounded-md border border-neutral-800 bg-neutral-950 p-3"
      aria-hidden
    >
      {cells.map(({ id, level, delay }) => (
        <motion.div
          key={id}
          className={cn("aspect-square rounded-[2px]", GRID_LEVELS[level])}
          initial={{ opacity: 0.35, scale: 0.92 }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1, 0.92] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}
    </div>
  );
}

export function Loader({ text }: LoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (text) return;

    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % DEFAULT_MESSAGES.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [text]);

  const statusText = text ?? DEFAULT_MESSAGES[messageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06)_0%,_transparent_70%)]" />

      <div className="relative flex w-full max-w-sm flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GITHUB_CONTRIBUTIONS_LOADING_GIF}
            alt=""
            aria-hidden
            className="h-20 w-20"
          />

          <div className="mt-5 flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <AnimatePresence mode="wait">
              <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-sm text-neutral-400"
              >
                {statusText}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <ContributionGridPreview />

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">
          github.com
        </p>
      </div>
    </div>
  );
}
