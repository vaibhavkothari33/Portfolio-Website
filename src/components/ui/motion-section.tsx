"use client";

import { motionCuts, type MotionCut } from "@/data/motion";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

function formatTimecode(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MotionSection() {
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<MotionCut | null>(null);

  const close = useCallback(() => {
    videoRef.current?.pause();
    setActive(null);
  }, []);

  useEffect(() => {
    if (!active) {
      lastTriggerRef.current?.focus();
      return;
    }

    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close]);

  useEffect(() => {
    if (!active) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [active, lenis]);

  useEffect(() => {
    if (!active || reduceMotion) return;
    videoRef.current?.play().catch(() => {});
  }, [active, reduceMotion]);

  return (
    <section
      id="motion"
      className="w-full border-t border-line bg-canvas px-4 py-16 text-strong md:px-10 md:py-20"
      aria-labelledby="motion-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-12">
          <p className="mb-4 inline-flex items-center gap-2 border border-brand/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-brand">
            <span aria-hidden>✕</span> Motion
          </p>
          <h2
            id="motion-heading"
            className="text-2xl font-bold leading-tight tracking-tight md:text-3xl"
          >
            Still learning to make things move.

          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim md:text-[15px]">
          Playing around with editing, motion, and product storytelling. Here are a few things I&apos;ve made.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {motionCuts.map((cut) => (
            <button
              key={cut.id}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setActive(cut);
              }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/40 text-left transition-colors hover:border-line-strong"
            >
              <div className="relative aspect-video overflow-hidden bg-well">
                <Image
                  src={cut.poster}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur-sm transition-transform group-hover:scale-105 motion-reduce:transition-none">
                    <Play className="ml-0.5 h-5 w-5 fill-current" strokeWidth={1.5} />
                  </span>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3.5 md:p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
                    {cut.kind}
                  </p>
                  <span className="font-mono text-[10px] tabular-nums text-faint">
                    {formatTimecode(cut.duration)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-strong md:text-base">
                  {cut.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-dim md:text-sm">
                  {cut.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
          >
            <div
              className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
                    {active.kind}
                  </p>
                  <h3
                    id={titleId}
                    className="mt-0.5 truncate text-base font-semibold text-strong"
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="shrink-0 rounded-lg border border-line p-1.5 text-subtle transition-colors hover:border-line-hover hover:text-strong"
                >
                  <IconX className="h-4 w-4" stroke={1.75} />
                </button>
              </div>

              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  key={active.src}
                  className="h-full w-full object-contain"
                  poster={active.poster}
                  controls
                  playsInline
                  autoPlay={!reduceMotion}
                  preload="metadata"
                >
                  <source src={active.src} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
