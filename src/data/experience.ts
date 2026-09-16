// export type ExperienceHighlight =
//   | string
//   | {
//     text: string;
//     subItems?: string[];
//   };

// export type Experience = {
//   id: string;
//   company: string;
//   role: string;
//   logo: string;
//   dateRange: string;
//   location: string;
//   website?: string;
//   highlights: ExperienceHighlight[];
// };

// export const experiences: Experience[] = [
//   {
//     id: "aistad",
//     company: "Aistad S.r.l.",
//     role: "Founding Engineer",
//     logo: "/aistad.png",
//     dateRange: "Apr 2026 - Present",
//     location: "Rome, Italy · Remote",
//     website: "https://aistad.com",
//     highlights: [
//       "Built a B2B SaaS platform from scratch that digitises fee management and payment collection for Italian lawyers delivered production-ready in 3 months as part of a two-engineer team.",
//       "Developed a full-stack application with AI integration, automated payment flows, and background job orchestration using Next.js, Supabase, Stripe Connect, and Claude API.",
//       "Promoted to Founding Engineer now leading platform maintenance, UI refinements, GDPR compliance",
//     ],
//   },
//   {
//     id: "sapphire",
//     company: "Sapphire Broking",
//     role: "Front-End Developer",
//     logo: "/sapphire.png",
//     dateRange: "January 2026 - Present",
//     location: "Nagpur, India",
//     website: "https://sapphirebroking.com",
//     highlights: [
//       "Refactored and optimized large-scale front-end codebases by designing reusable, modular components, improving maintainability and development velocity.",
//       "Developed admin portals that unified vendor management and ensured seamless data flow across every integration point in the system.",
//       "Implemented server-side rendering and data-fetching optimizations in Next.js, along with caching and rate-limiting strategies, to significantly reduce load times, improve SEO, and ensure stable performance under high traffic.",
//     ],
//   },
//   {
//     id: "rovo",
//     company: "Rovo: Build, Recruit & Share",
//     role: "Founding Engineer",
//     logo: "/rovo.png",
//     dateRange: "March 2026 - June 2026",
//     location: "Rome, Italy",
//     website: "https://rovo-app.com",
//     highlights: [
//       "Founding Engineer at ROVO, responsible for building and scaling the product from zero to production as a core member of the founding team.",

//       "Led the development of the Web, Android, and iOS platforms while completely redesigning the user experience to create a modern, scalable product.",

//       "Helped grow the platform from fewer than 100 users to 2,000+ registered users and 500+ monthly active users through rapid product iteration, infrastructure improvements, and data-driven development.",
//     ],
//   },
//   {
//     id: "titan",
//     company: "Titan Technologies",
//     role: "Full Stack Engineer",
//     logo: "/titan.png",
//     dateRange: "June 2025 - September 2025",
//     location: "Dubai, UAE",
//     website: "http://titantechinvestements.vercel.app/",
//     highlights: [
//       "Built a responsive web platform for an investment firm catering to clients in India and the UAE.",
//       "Developed onboarding flows customized for multiple geographies, ensuring smooth user experiences across regions.",
//       {
//         text: "Designed and implemented advanced user verification systems, including:",
//         subItems: [
//           "Aadhaar and DigiLocker integration for KYC compliance (India).",
//           "Emirates ID verification and passport scanning (UAE).",
//           "Video KYC system to meet strict regulatory requirements.",
//         ],
//       },
//     ],
//   },
//   {
//     id: "nexcraft",
//     company: "NexCraft",
//     role: "Web Developer Intern",
//     logo: "https://i.ibb.co/D8cjVTX/Screenshot-2024-12-24-004030.png",
//     dateRange: "October 2024 - December 2024",
//     location: "Greater Noida, India",
//     website: "https://thenexcraft.com/",
//     highlights: [
//       "Collaborated with a team of 4 developers to design and deploy robust websites.",
//       "Contributed to the creation of NexCraft's main website, enhancing usability and performance.",
//     ],
//   },
//   {
//     id: "full-stack-club",
//     company: "Full Stack Club",
//     role: "Technical Lead",
//     logo: "https://i.ibb.co/t3JZbhp/Screenshot-2024-12-24-011803.png",
//     dateRange: "August 2024 - Present",
//     location: "Greater Noida, India",
//     highlights: [
//       "Led a team of 4 junior developers to design and develop functional and aesthetic websites for club events.",
//       "Organized and conducted a 2-day workshop, teaching HTML and CSS to over 100 students.",
//       "Mentored team members and ensured timely delivery of high-quality technical solutions.",
//     ],
//   },
//   {
//     id: "gfg",
//     company: "Geeks for Geeks",
//     role: "Technical Team Member",
//     logo: "https://i.ibb.co/mDD48fh/Screenshot-2024-12-24-011922.png",
//     dateRange: "August 2023 - April 2024",
//     location: "Greater Noida, India",
//     highlights: [
//       "Contributed as part of the technical team in organizing multiple technical events and workshops.",
//       "Played a key role in managing event logistics and fostering community engagement.",
//     ],
//   },
// ];

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
    id: "aistad",
    company: "Aistad S.r.l.",
    role: "Founding Engineer",
    logo: "/aistad.png",
    dateRange: "Apr 2026 - Present",
    location: "Rome, Italy · Remote",
    website: "https://aistad.com",
    highlights: [
      "Built and shipped a B2B SaaS platform for Italian lawyers from scratch, taking it to production in 3 months as part of a 2-engineer team.",
      // "Developed the full-stack platform with Next.js, Supabase, Stripe Connect, and Claude API, including AI-powered workflows, automated payments, and background job orchestration.",
      "Lead ongoing platform development across maintenance, UI improvements, payment workflows, GDPR compliance, and production reliability.",
      "Built core financial workflows for fee management and payment collection, with support for automated invoicing and client payment flows.",
    ],
  },

  {
    id: "sapphire",
    company: "Sapphire Broking",
    role: "Front-End Developer",
    logo: "/sapphire.png",
    dateRange: "Jan 2026 - Present",
    location: "Nagpur, India",
    website: "https://sapphirebroking.com",
    highlights: [
      "Refactored large-scale frontend codebases by building reusable, modular components that improved maintainability and development velocity.",
      "Built internal admin portals for vendor management and operational workflows, connecting multiple backend integrations through a unified interface.",
      "Implemented server-side rendering, optimized data fetching, and introduced caching and rate-limiting strategies in Next.js to improve performance and stability.",
      "Worked closely with backend and database teams to integrate APIs, review legacy systems, and improve frontend architecture across production applications.",
      // "Contributed to API documentation and OpenAPI specifications while building and integrating production frontend services.",
    ],
  },

  {
    id: "rovo",
    company: "Rovo: Build, Recruit & Share",
    role: "Founding Engineer",
    logo: "/rovo.png",
    dateRange: "Mar 2026 - Jun 2026",
    location: "Rome, Italy",
    website: "https://rovo-app.com",
    highlights: [
      "Built and scaled ROVO from an early-stage product to 2,000+ registered users and 500+ monthly active users as a core member of the founding team.",
      "Led development across Web, Android, and iOS while redesigning the product experience and establishing a scalable application architecture.",
      "Owned product engineering across frontend, backend, deployment, infrastructure, and production improvements while iterating rapidly with the founding team.",
      "Improved application reliability and deployment workflows while scaling the infrastructure to support rapid user growth.",
    ],
  },

  {
    id: "titan",
    company: "Titan Technologies",
    role: "Full Stack Engineer",
    logo: "/titan.png",
    dateRange: "Jun 2025 - Sep 2025",
    location: "Dubai, UAE",
    website: "http://titantechinvestements.vercel.app/",
    highlights: [
      "Built a production investment platform serving clients across India and the UAE, including region-specific onboarding and KYC workflows.",
      "Developed onboarding flows tailored to different regulatory requirements and user journeys across multiple geographies.",
      {
        text: "Implemented identity verification and KYC workflows including:",
        subItems: [
          "Aadhaar and DigiLocker integration for Indian users.",
          "Emirates ID verification and passport scanning for UAE users.",
          "Video KYC workflows for regulatory compliance.",
        ],
      },
      "Worked across frontend and backend systems to integrate verification services and maintain reliable data flow throughout the onboarding process.",
    ],
  },

  {
    id: "nexcraft",
    company: "NexCraft",
    role: "Web Developer Intern",
    logo: "https://i.ibb.co/D8cjVTX/Screenshot-2024-12-24-004030.png",
    dateRange: "Oct 2024 - Dec 2024",
    location: "Greater Noida, India",
    website: "https://thenexcraft.com/",
    highlights: [
      "Collaborated with a 4-person development team to design and deploy production websites with a focus on usability, performance, and responsive design.",
      "Contributed to the development of NexCraft's main website, improving its structure, user experience, and frontend performance.",
      "Worked across the frontend development workflow from implementation and testing to deployment and iteration.",
    ],
  },

  {
    id: "full-stack-club",
    company: "Full Stack Club",
    role: "Technical Lead",
    logo: "https://i.ibb.co/t3JZbhp/Screenshot-2024-12-24-011803.png",
    dateRange: "Aug 2024 - Present",
    location: "Greater Noida, India",
    highlights: [
      "Led a team of 4 junior developers in designing and building websites for technical events and student initiatives.",
      "Organized and conducted a 2-day HTML and CSS workshop for 100+ students.",
      "Mentored team members through project development, code reviews, and technical problem solving.",
      "Coordinated technical execution and ensured projects were delivered on schedule.",
    ],
  },

  {
    id: "gfg",
    company: "Geeks for Geeks",
    role: "Technical Team Member",
    logo: "https://i.ibb.co/mDD48fh/Screenshot-2024-12-24-011922.png",
    dateRange: "Aug 2023 - Apr 2024",
    location: "Greater Noida, India",
    highlights: [
      "Contributed to the technical team responsible for organizing technical events, workshops, and developer-focused activities.",
      "Supported event operations and technical coordination while helping build engagement within the developer community.",
    ],
  },
];