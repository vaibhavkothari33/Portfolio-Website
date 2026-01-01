"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string; // URL for the image
    title: string; // Title for the card
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "15s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "25s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "35s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div className="bg-stone-50 dark:bg-neutral-950">
      <h2 className="text-black text-center text-4xl dark:text-white mb-2 py-10">Achievements</h2>
      <h2 className="text-black text-center px-10 sm:px-44 mb-10 text-md dark:text-white ">From participating in hackathons to winning treasure hunts 😉, I thrive on exploring, learning, and pushing boundaries.</h2>

      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 ml-4 h-80 max-w-full dark:bg-neutral-950",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 h-64 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className="w-[250px] max-w-full relative rounded-2xl border border-b-4 flex-shrink-0 border-black px-6 py-6 md:w-[350px] dark:border-white"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-25 rounded-2xl"></div>
              <div className="relative z-20 flex items-end justify-center h-full pb-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
