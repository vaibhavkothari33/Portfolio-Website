"use client";
import { FollowerPointerCard, FollowPointer } from "@/components/ui/following-pointer";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ProjectSection from "@/components/ui/project-section";
import { Timeline } from "@/components/ui/timeline";
import { ContactForm } from "@/components/ui/contact-form";
import { IconHome, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconColorPicker } from "@tabler/icons-react"; // Example icons

type TimelineEntry = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const timelineData: TimelineEntry[] = [
  {
    title: (
      <div className="flex items-center gap-4">
        <img
          src="https://i.ibb.co/D8cjVTX/Screenshot-2024-12-24-004030.png"
          alt="NexCraft Logo"
          className="w-16 h-16 rounded-full"
        />
        <span className="text-2xl font-bold">Web Developer Intern at NexCraft</span>
      </div>
    ),
    content: (
      <div className="text-black text-2xl dark:text-white">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">October 2024 - December 2024</p>
        <ul className="list-disc ml-6 mt-2 text-base">
          <li>Collaborated with a team of 4 developers to design and deploy robust websites.</li>
          <li>Contributed to the creation of NexCraft's main website, enhancing usability and performance.</li>
        </ul>
      </div>
    ),
  },
  {
    title: (
      <div className="flex items-center gap-4">
        <img
          src="https://i.ibb.co/t3JZbhp/Screenshot-2024-12-24-011803.png"
          alt="Club Logo"
          className="w-16 h-16 rounded-full"
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
        <img
          src="https://i.ibb.co/mDD48fh/Screenshot-2024-12-24-011922.png"
          alt="GFG Logo"
          className="w-16 h-16 rounded-full"
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

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "#" },
  { title: "Linked-in", icon: <IconBrandLinkedin />, href: "#" },
  { title: "GitHub", icon: <IconBrandGithub />, href: "#" },
  { title: "X", icon: <IconBrandTwitter />, href: "#" },
  { title: "Theme", icon: <IconColorPicker />, href: "#" },
];

const items = [
  {

    title: "Developer",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4", // Add your image URL
  },
  {
    title: "Designer",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4", // Add your image URL
  },
  {
    title: "Graphic Designer",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4", // Add your image URL
  },
  {
    title: "coder",
    image: "https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4", // Add your image URL
  },
  // Add more items
];


export default function Home() {
  return (
    <div>
      <HeroHighlight>
        <div className="text-center mt-[-100px] flex flex-col items-center gap-6">
          <img
            src="https://avatars.githubusercontent.com/u/129139486?s=400&u=ab1e36746498ac43c783da0baae0363aaffa8d16&v=4"
            alt="Vaibhav's Avatar"
            className="w-40 h-40 rounded-full border-4 border-gray-200 dark:border-neutral-800 shadow-lg"
          />
          <div className="text-5xl mb-5 font-bold text-black dark:text-white">
            Hi, I'm <Highlight><Highlight>Vaibhav</Highlight></Highlight><br />
          </div>
          <div className="text-xl md:text-4xl text-gray-700 dark:text-gray-300">
            A <Highlight>developer</Highlight> who customizes everything with <br />
            <Highlight> open source technologies.</Highlight> <br />
            <span className="text-xl">(Yes, even my coffee order).</span><br /><br />
            <Highlight>I use arch btw</Highlight> <br />
          </div>
        </div>
      </HeroHighlight>
      <Timeline data={timelineData} />
      <ProjectSection />
      <InfiniteMovingCards direction="right" speed="normal" pauseOnHover={false} items={items} />
      <ContactForm />
    </div>
  );
}
