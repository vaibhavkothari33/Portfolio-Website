"use client";
import "../../styles/globals.css";

import { IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconWorld, IconBrandWikipedia, IconBrandLeetcode, IconBrandDiscord, IconBrandGmail } from "@tabler/icons-react";

const links = [
  {
    title: "Portfolio",
    href: "https://vaibhavkothari.vercel.app/",
    icon: <IconWorld className="text-blue-600" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhavkothari33/",
    icon: <IconBrandLinkedin className="text-blue-600" />,
  },
  {
    title: "GitHub",
    href: "https://github.com/vaibhavkothari33/",
    icon: <IconBrandGithub className="text-gray-300" />,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/vaibhavkothari/",
    icon: <IconBrandTwitter className="text-blue-400" />,
  },
  {
    title: "Publication",
    href: "https://app.readytensor.ai/publications/sanjeevan_-_video_calling_web_application_for_people_with_speaking_disability_EDAdadexbbxs",
    icon: <IconBrandWikipedia className="text-blue-400" />,
  },
  {
    title: "Mail",
    href: "mailto:contact.vaibhavkothari@gmail.com",
    icon: <IconBrandGmail className="text-red-500" />,
  },
  {
    title: "Mail",
    href: "mailto:vaibhavkothari50@gmail.com",
    icon: <IconBrandGmail className="text-red-500" />,
  },
  {
    title: "LeetCode",
    href: "https://leetcode.com/u/vaibhavkothari33/",
    icon: <IconBrandLeetcode className="text-yellow-500" />,
  },
  {
    title: "Discord",
    href: "https://discordapp.com/users/vaibhavkothari",
    icon: <IconBrandDiscord className="text-purple-500" />,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl mb-8 text-white font-bold text-center">
        My Links
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center border border-spacing-2 justify-center gap-4 p-8 bg-neutral-800 hover:bg-neutral-600 transition-all duration-300 rounded-lg shadow-xl transform hover:scale-110"
          >
            <span className="text-7xl">{link.icon}</span>
            <span className="text-2xl font-medium text-white text-center">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
