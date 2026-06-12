"use client";

// import InfiniteMenu from "@/components/InfiniteMenu";
import { achievements } from "@/data/achievements";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="bg-stone-50 py-10 dark:bg-neutral-950"
      aria-labelledby="achievements-heading"
    >
      <h1
        id="achievements-heading"
        className="mb-2 py-4 text-center text-5xl font-bold
         text-black dark:text-white"
      >
        Achievements
      </h1>
      <p className="mb-10 px-10 text-center text-md text-black dark:text-white sm:px-44">
        From participating in hackathons to winning treasure hunts 😉, I thrive on
        exploring, learning, and pushing boundaries. Drag the sphere to browse —
        the card strip below mirrors the same highlights.
      </p>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* <div className="h-[min(72vh,560px)] min-h-[420px] w-full overflow-hidden rounded-2xl border border-neutral-200/80 shadow-sm dark:border-neutral-800">
          <InfiniteMenu items={achievements} />
        </div> */}
      </div>

      <div className="mt-12">
        <InfiniteMovingCards
          showHeader={false}
          direction="right"
          speed="normal"
          pauseOnHover={false}
          items={achievements}
        />
      </div>
    </section>
  );
}
