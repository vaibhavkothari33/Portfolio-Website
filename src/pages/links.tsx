"use client";
import "../../styles/globals.css";
import { useState } from "react";
import { 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconFileCheck, 
  IconBrandTwitter, 
  IconWorld, 
  IconBrandWikipedia, 
  IconBrandLeetcode, 
  IconBrandDiscord, 
  IconBrandGmail,
  IconExternalLink
} from "@tabler/icons-react";

const links = [
  {
    title: "Portfolio",
    href: "https://vaibhavkothari.vercel.app/",
    icon: <IconWorld size={28} />,
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
    textColor: "text-blue-500"
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhavkothari33/",
    icon: <IconBrandLinkedin size={28} />,
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
    textColor: "text-blue-600"
  },
  {
    title: "GitHub",
    href: "https://github.com/vaibhavkothari33/",
    icon: <IconBrandGithub size={28} />,
    color: "bg-gradient-to-br from-gray-600 to-gray-800",
    textColor: "text-gray-300"
  },
  {
    title: "Twitter",
    href: "https://twitter.com/vaibhavkotharii/",
    icon: <IconBrandTwitter size={28} />,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    textColor: "text-blue-400"
  },
  {
    title: "Publication",
    href: "https://app.readytensor.ai/publications/EDAdadexbbxs",
    icon: <IconBrandWikipedia size={28} />,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    textColor: "text-blue-400"
  },
  {
    title: "Resume",
    href: "https://www.vaibhavkothari.me/resume.pdf",
    icon: <IconFileCheck size={28} />,
    color: "bg-gradient-to-br from-red-500 to-red-700",
    textColor: "text-red-500"
  },
  {
    title: "Mail",
    href: "mailto:vaibhavkothari50@gmail.com",
    icon: <IconBrandGmail size={28} />,
    color: "bg-gradient-to-br from-red-500 to-red-700",
    textColor: "text-red-500"
  },
  {
    title: "LeetCode",
    href: "https://leetcode.com/u/vaibhavkothari33/",
    icon: <IconBrandLeetcode size={28} />,
    color: "bg-gradient-to-br from-yellow-500 to-yellow-700",
    textColor: "text-yellow-500"
  },
  {
    title: "Discord",
    href: "https://discordapp.com/users/vaibhavkothari",
    icon: <IconBrandDiscord size={28} />,
    color: "bg-gradient-to-br from-purple-500 to-purple-700",
    textColor: "text-purple-500"
  },
];

export default function LinksPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 font-sans px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl mb-4 text-white font-bold text-center ">
            Connect With Me
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            Find me across the web and reach out through any of these platforms
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl shadow-lg"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`absolute inset-0 opacity-20 ${link.color}`}></div>
              <div className="bg-neutral-800 hover:bg-neutral-700 p-6 h-full flex items-center transition-all duration-300 border border-neutral-700">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-5 ${link.color} text-white`}>
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-medium ${link.textColor}`}>{link.title}</h3>
                  <div className="flex items-center mt-2 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Visit</span>
                    <IconExternalLink size={16} className="ml-1" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-full absolute bottom-0 left-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
              
              {/* Animated glow effect on hover */}
              {hoveredIndex === index && (
                <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 blur-lg"></div>
              )}
            </a>
          ))}
        </div>
        
        {/* <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vaibhav Kothari • Built with React
          </p>
        </div> */}
      </div>
    </div>
  );
}