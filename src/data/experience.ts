export type ExperienceHighlight =
  | string
  | {
      text: string;
      subItems?: string[];
    };

export type Experience = {
  id: string;
  company: string;
  role: string;
  logo: string;
  dateRange: string;
  location: string;
  website?: string;
  highlights: ExperienceHighlight[];
};

export const experiences: Experience[] = [
  {
    id: "rovo",
    company: "Rovo: Build, Recruit & Share",
    role: "Founding Engineer",
    logo: "/rovo.png",
    dateRange: "March 2026 - Present",
    location: "Rome, Italy",
    website: "https://rovo-app.com",
    highlights: [
      "Founding Engineer at ROVO, responsible for building and scaling the product from zero to production as a core member of the founding team.",

      "Led the development of the Web, Android, and iOS platforms while completely redesigning the user experience to create a modern, scalable product.",

      "Helped grow the platform from fewer than 100 users to 2,000+ registered users and 500+ monthly active users through rapid product iteration, infrastructure improvements, and data-driven development.",
    ],
  },
  {
    id: "sapphire",
    company: "Sapphire Broking",
    role: "Front-End Developer",
    logo: "/sapphire.png",
    dateRange: "January 2026 - Present",
    location: "Nagpur, India",
    website: "https://sapphirebroking.com",
    highlights: [
      "Refactored and optimized large-scale front-end codebases by designing reusable, modular components, improving maintainability and development velocity.",
      "Developed admin portals that unified vendor management and ensured seamless data flow across every integration point in the system.",
      "Implemented server-side rendering and data-fetching optimizations in Next.js, along with caching and rate-limiting strategies, to significantly reduce load times, improve SEO, and ensure stable performance under high traffic.",
    ],
  },
  {
    id: "titan",
    company: "Titan Technologies",
    role: "Full Stack Engineer",
    logo: "/titan.png",
    dateRange: "June 2025 - September 2025",
    location: "Dubai, UAE",
    website: "http://titantechinvestements.vercel.app/",
    highlights: [
      "Built a responsive web platform for an investment firm catering to clients in India and the UAE.",
      "Developed onboarding flows customized for multiple geographies, ensuring smooth user experiences across regions.",
      {
        text: "Designed and implemented advanced user verification systems, including:",
        subItems: [
          "Aadhaar and DigiLocker integration for KYC compliance (India).",
          "Emirates ID verification and passport scanning (UAE).",
          "Video KYC system to meet strict regulatory requirements.",
        ],
      },
    ],
  },
  {
    id: "nexcraft",
    company: "NexCraft",
    role: "Web Developer Intern",
    logo: "https://i.ibb.co/D8cjVTX/Screenshot-2024-12-24-004030.png",
    dateRange: "October 2024 - December 2024",
    location: "Greater Noida, India",
    website: "https://thenexcraft.com/",
    highlights: [
      "Collaborated with a team of 4 developers to design and deploy robust websites.",
      "Contributed to the creation of NexCraft's main website, enhancing usability and performance.",
    ],
  },
  {
    id: "full-stack-club",
    company: "Full Stack Club",
    role: "Technical Lead",
    logo: "https://i.ibb.co/t3JZbhp/Screenshot-2024-12-24-011803.png",
    dateRange: "August 2024 - Present",
    location: "Greater Noida, India",
    highlights: [
      "Led a team of 4 junior developers to design and develop functional and aesthetic websites for club events.",
      "Organized and conducted a 2-day workshop, teaching HTML and CSS to over 100 students.",
      "Mentored team members and ensured timely delivery of high-quality technical solutions.",
    ],
  },
  {
    id: "gfg",
    company: "Geeks for Geeks",
    role: "Technical Team Member",
    logo: "https://i.ibb.co/mDD48fh/Screenshot-2024-12-24-011922.png",
    dateRange: "August 2023 - April 2024",
    location: "Greater Noida, India",
    highlights: [
      "Contributed as part of the technical team in organizing multiple technical events and workshops.",
      "Played a key role in managing event logistics and fostering community engagement.",
    ],
  },
];
