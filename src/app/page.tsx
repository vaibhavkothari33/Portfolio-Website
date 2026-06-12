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
import { GitHubActivityLoading } from "@/components/ui/github-activity-loading";
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
      <Suspense fallback={<GitHubActivityLoading />}>
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
