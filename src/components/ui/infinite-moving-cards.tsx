"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type MovingCardItem = {
  image: string;
  title: string;
  description?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  showHeader = true,
  showEdgeFade = true,
}: {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  showHeader?: boolean;
  showEdgeFade?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (!containerRef.current) return;

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (!containerRef.current) return;

    const duration =
      speed === "fast" ? "15s" : speed === "slow" ? "35s" : "25s";
    containerRef.current.style.setProperty("--animation-duration", duration);
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      scrollerRef.current?.appendChild(item.cloneNode(true));
    });

    getDirection();
    getSpeed();
    setStart(true);
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div className={cn("relative", className)}>
      {showHeader && (
        <>
          <h2 className="mb-2 py-10 text-center text-4xl text-white">Achievements</h2>
          <p className="mb-10 px-10 text-center text-md text-neutral-400 sm:px-44">
            From participating in hackathons to winning treasure hunts, I thrive on
            exploring, learning, and pushing boundaries.
          </p>
        </>
      )}

      {showEdgeFade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-12 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent md:w-24" />
        </>
      )}

      <div
        ref={containerRef}
        className="scroller relative z-20 max-w-full overflow-hidden"
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex h-auto w-max min-w-full shrink-0 flex-nowrap gap-4 py-2 md:gap-5",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {items.map((item, idx) => (
            <li
              key={`${item.title}-${idx}`}
              className="w-[260px] max-w-full flex-shrink-0 md:w-[300px]"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700">
                <div className="relative h-40 w-full overflow-hidden border-b border-neutral-800 bg-neutral-950/60 md:h-44">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="300px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/10 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-500">
                      Highlight
                    </p>
                    <span className="text-[11px] tabular-nums text-neutral-600">
                      {String(idx + 1).padStart(3, "0")}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold leading-snug text-white md:text-lg">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-400 md:text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
