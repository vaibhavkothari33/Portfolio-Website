"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ProjectSection from "@/components/ui/project-section";
import { Timeline } from "@/components/ui/timeline";
import { ContactForm } from "@/components/ui/contact-form";
import Skills from "@/components/ui/Skills";
import Image from 'next/image';

type TimelineEntry = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const timelineData: TimelineEntry[] = [
  {
    title: (
      <div className="flex items-center gap-4">
        <Image
          src="https://i.ibb.co/D8cjVTX/Screenshot-2024-12-24-004030.png"
          alt="NexCraft Logo"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
        <span className="text-2xl font-bold">Web Developer Intern at NexCraft</span>
      </div>
    ),
    content: (
      <div className="text-black text-2xl dark:text-white">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">October 2024 - December 2024</p>
        <ul className="list-disc ml-6 mt-2 text-base">
          <li>Collaborated with a team of 4 developers to design and deploy robust websites.</li>
          <li>Contributed to the creation of NexCraft&apos;s main website, enhancing usability and performance.</li>
        </ul>
      </div>
    ),
  },
  {
    title: (
      <div className="flex items-center gap-4">
        <Image
          src="https://i.ibb.co/t3JZbhp/Screenshot-2024-12-24-011803.png"
          alt="Club Logo"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
        <span className="text-2xl font-bold">Technical Lead at Full Stack Club</span>
      </div>
    ),
    content: (
      <div className="text-black text-2xl dark:text-white">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">August 2024 - Present</p>
        <ul className="list-disc ml-6 mt-2 text-base">
          <li>Led a team of 4 junior developers to design and develop functional and aesthetic websites for club events.</li>
          <li>Organized and conducted a 2-day workshop, teaching HTML and CSS to over 100 students.</li>
          <li>Mentored team members and ensured timely delivery of high-quality technical solutions.</li>
        </ul>
      </div>
    ),
  },
  {
    title: (
      <div className="flex items-center gap-4">
        <Image
          src="https://i.ibb.co/mDD48fh/Screenshot-2024-12-24-011922.png"
          alt="GFG Logo"
          className="w-16 h-16 rounded-full"
          width={64}
          height={64}
        />
        <span className="text-2xl font-bold">Technical Team Member at Geeks for Geeks</span>
      </div>
    ),
    content: (
      <div className="text-black text-2xl dark:text-white">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">August 2023 - April 2024</p>
        <ul className="list-disc ml-6 mt-2 text-base">
          <li>Contributed as part of the technical team in organizing multiple technical events and workshops.</li>
          <li>Played a key role in managing event logistics and fostering community engagement.</li>
        </ul>
      </div>
    ),
  },
];

const achievement = [
  {
    title: "Treasure Hunt Winner",
    image: "https://i.ibb.co/vZc6CWD/Screenshot-2024-12-24-211712.png",
  },
  {
    title: "Workshop Speaker",
    image: "https://i.ibb.co/K6fDF5H/Screenshot-2024-12-24-211849.png",
  },
  {
    title: "Hackfest at GFG HQ",
    image: "https://i.ibb.co/Jt55ZQ2/Whats-App-Image-2024-12-25-at-7-24-34-PM.jpg",
  },
  {
    title: "me",
    image: "/vaibhavkothari.JPG",
  },
  {
    title: "Hackathon Winner",
    image: "https://i.ibb.co/4VsBh60/Screenshot-2024-12-24-212538.png",
  },
  {
    title: "With the OG🔥",
    image: "https://i.ibb.co/1L1DN7d/Whats-App-Image-2024-12-24-at-9-30-24-PM.jpg",
  },
  {
    title: "Code Kshetra 2.0",
    image: "/codekshetra.png",
  },
  {
    title: "2x Hackachinno Winner",
    image: "/hackachinno.jpeg",
  },
];

export default function Home() {
  return (
    <div>
      <HeroHighlight>
        <div className="text-center mt-[-10px] flex flex-col items-center gap-6">
          <Image
            src="https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4"
            alt="Vaibhav&apos;s Avatar"
            className="w-44 h-44 rounded-full border-4 border-gray-200 dark:border-neutral-800 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-blue-800"
            width={160}
            height={160}
          />

          <div className="text-5xl mb-4 font-bold text-black dark:text-white">
            Hi, I&apos;m <Highlight>Vaibhav</Highlight>
          </div>

          <div className="text-xl md:text-3xl text-gray-700 mb-6 dark:text-gray-300">
            A <span className="font-bold"><Highlight>developer</Highlight></span> who customizes everything with <br />
            <div className="mt-2"></div>
            <span className="font-bold"> <Highlight>open source technologies.</Highlight></span> <br />
            <span className="text-xl mt-2">(Yes, even my coffee order).</span><br />
            <br />
            <Highlight>I use Arch, btw.</Highlight>
            <span className="text-2xl font-serif mt-4 block"><Highlight>Open to gigs, part-time roles</Highlight></span> <br />
          </div>
        </div>


      </HeroHighlight>
      <Timeline data={timelineData} />
      <Skills />
      <ProjectSection />
      <InfiniteMovingCards direction="right" speed="normal" pauseOnHover={false} items={achievement} />
      <ContactForm />
    </div>
  );
}
