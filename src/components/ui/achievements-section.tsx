"use client";

import { achievements } from "@/data/achievements";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

type AchievementsSectionProps = {
  className?: string;
};

export default function AchievementsSection({ className }: AchievementsSectionProps) {
  return (
    <section
      id="achievements"
      className={cn(
        "w-full border-t border-line bg-canvas px-4 py-16 text-strong md:px-10 md:py-20",
        className,
      )}
      aria-labelledby="achievements-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-12">
          <p className="mb-4 inline-flex items-center gap-2 border border-brand/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-brand">
            <span aria-hidden>✕</span> Achievements
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2
                id="achievements-heading"
                className="text-2xl font-bold leading-tight tracking-tight md:text-3xl"
              >
                Wins, workshops, and moments that shaped me
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dim md:text-[15px]">
                From hackathon podiums to community events — a scroll through the
                milestones, collaborations, and memories behind the work.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong bg-surface/60 px-4 py-2 text-xs font-medium text-dim">
              <Trophy className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} />
              {achievements.length} highlights
            </div>
          </div>
        </div>

        <InfiniteMovingCards
          showHeader={false}
          showEdgeFade
          direction="right"
          speed="normal"
          pauseOnHover
          items={achievements}
        />
      </div>
    </section>
  );
}
