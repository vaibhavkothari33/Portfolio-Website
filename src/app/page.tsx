"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import GridHeroSection from "@/components/ui/grid-hero-section";
import ProjectSection from "@/components/ui/project-section";
import { Timeline } from "@/components/ui/timeline";
import { ContactForm } from "@/components/ui/contact-form";
import Skills from "@/components/ui/Skills";
import Image from 'next/image';
import TweetsSection from "@/components/ui/TweetsSection";
import TitanText from "@/components/ui/titan-text";
import AchievementsSection from "@/components/ui/achievements-section";
import ExperienceSection from "@/components/ui/experience-section";
// import ClientReviews from "@/components/ui/ClientReviews";

export default function Home() {
  return (
    <div>
      <GridHeroSection />

      {/* Current hero — swap or remove once you pick a favorite */}
      <div className="border-b border-neutral-300 dark:border-neutral-800">
        <p className="bg-stone-100 py-2 text-center text-xs uppercase tracking-[0.2em] text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          Current hero (for comparison)
        </p>
        <HeroHighlight>
        <div className="text-center mt-[-10px] flex flex-col items-center gap-6">
          <Image
            src="https://avatars.githubusercontent.com/u/129139486"
            alt="Vaibhav's Avatar"
            className="w-44 h-44 rounded-full border-4 border-gray-200 dark:border-neutral-800 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-blue-800"
            width={160}
            height={160}
            unoptimized
          />

          <div className="text-5xl mb-4 font-bold text-black dark:text-white">
            Hi, I&apos;m <Highlight>Vaibhav</Highlight>
          </div>

          <div className="text-xl md:text-3xl text-gray-700 mb-6 dark:text-gray-300">
            A <span className="font-bold"><Highlight>developer</Highlight></span> who customizes everything with <br />
            <div className="mt-2"></div>
            <div className="md:mb-5"></div>
            <span className="font-bold"> <Highlight>open source technologies.</Highlight></span> <br />
            <span className="text-xl mt-2">(Yes, even my coffee order).</span><br />
            <br />
            <Highlight><span className="font-bold"> I use Arch, btw.</span></Highlight>
            <span className="text-2xl font-serif mt-4 block"><Highlight>Open to gigs, part-time roles</Highlight></span> <br />
          </div>
        </div>


      </HeroHighlight>
      </div>

      <Timeline />
      <ExperienceSection limit={3} showViewAllButton />
      <Skills />
      <ProjectSection />

      <AchievementsSection />
      <div className="bg-stone-50 dark:bg-neutral-950">
        {/* <ClientReviews /> */}
        <TweetsSection />
        <ContactForm />
        <TitanText />
      </div>
    </div>
  );
}
