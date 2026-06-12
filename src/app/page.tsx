// import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import GridHeroSection from "@/components/ui/grid-hero-section";
import ProjectSection from "@/components/ui/project-section";
// import { Timeline } from "@/components/ui/timeline";
import { ContactForm } from "@/components/ui/contact-form";
import Skills from "@/components/ui/Skills";
import TweetsSection from "@/components/ui/TweetsSection";
import TitanText from "@/components/ui/titan-text";
import AchievementsSection from "@/components/ui/achievements-section";
import { Suspense } from "react";
import GitHubActivitySection from "@/components/ui/github-activity-section";
import ExperienceSection from "@/components/ui/experience-section";
// import ClientReviews from "@/components/ui/ClientReviews";

export default function Home() {
  return (
    <div>
      <GridHeroSection />

      <ExperienceSection limit={3} showViewAllButton />
      <Skills />
      <ProjectSection />

      <AchievementsSection />
      <Suspense
        fallback={
          <div className="border-t border-neutral-800 bg-neutral-950 px-4 py-16 md:px-10">
            <div className="mx-auto max-w-5xl animate-pulse rounded-xl border border-neutral-800 p-8">
              <div className="mb-6 h-6 w-32 rounded bg-neutral-800" />
              <div className="h-28 rounded bg-neutral-900" />
            </div>
          </div>
        }
      >
        <GitHubActivitySection />
      </Suspense>

      <div className="bg-stone-50 dark:bg-neutral-950">
        <TweetsSection />
        <ContactForm />
        <TitanText />
      </div>
    </div>
  );
}
