// import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import GridHeroSection from "@/components/ui/grid-hero-section";
import ProjectSection from "@/components/ui/project-section";
import MotionSection from "@/components/ui/motion-section";
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
import ArticlesSection from "@/components/ui/articles-section";
// import ClientReviews from "@/components/ui/ClientReviews";
import type { Metadata } from "next";

// Set explicitly rather than on the root layout: metadata is inherited, so a
// canonical there would make every route claim to be the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Vaibhav Kothari | Full Stack Developer — built Aistad",
  description:
    "Vaibhav Kothari built Aistad, the legal-tech platform for Italian lawyers, as Founding Engineer at Aistad S.r.l. in Rome. Full-stack engineer building Sythra and agentic AI products.",
};

export default function Home() {
  return (
    <div>
      <GridHeroSection />

      <ExperienceSection limit={4} showViewAllButton />
      <ArticlesSection />
      <Skills />
      <ProjectSection />
      <MotionSection />

      <AchievementsSection />
      <Suspense fallback={<GitHubActivityLoading />}>
        <GitHubActivitySection />
      </Suspense>

      <TweetsSection />
      <ContactForm />
      <TitanText />
    </div>
  );
}
