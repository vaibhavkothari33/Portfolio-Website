export type Project = {
  id: string;
  label: string;
  title: string;
  image: string;
  technologies: string[];
  description: string;
  github: string;
  preview?: string;
};

export const featuredProjects: Project[] = [
  {
    id: "001",
    label: "AI · EDTECH",
    title: "Learn Loop",
    image: "/learnloop.png",
    technologies: ["Next.js", "Solidity", "Open Router", "Appwrite", "ERC-721"],
    description:
      "Paste a YouTube video, get a personalized learning path, a real coding challenge, and AI that grades your GitHub repo checkpoint by checkpoint.",
    github: "https://github.com/vaibhavkothari33/LearnLoop",
    preview: "https://hackacinno.vercel.app/dashboard",
  },
  {
    id: "002",
    label: "WEB3 · GAME",
    title: "Green Whistle",
    image: "/Green.png",
    technologies: ["Monad", "Next.js", "Solidity", "Phaser.js", "Groq"],
    description:
      "A vibrant pixelated universe for farming, trading, and adventure — grow crops, catch fish, and trade with friends on-chain.",
    github: "https://github.com/vaibhavkothari33/Greenwhistle",
    preview: "https://greenwhistle.vercel.app/",
  },
  {
    id: "003",
    label: "AI · BLOCKCHAIN",
    title: "Mentora",
    image: "https://i.ibb.co/8gYkjCKM/Screenshot-2025-04-21-153918.png",
    technologies: ["Edu Chain", "React", "Agent Zero", "FastAPI", "Gemini"],
    description:
      "Blockchain-based learning with verifiable credentials — students access courses and earn NFT certificates that prove their achievements.",
    github: "https://github.com/vaibhavkothari33/Mentora",
    preview: "https://mentora-rust.vercel.app/",
  },
  {
    id: "004",
    label: "MOBILE · AI",
    title: "FiteX",
    image: "/Fitex.png",
    technologies: ["React Native", "Expo", "Google Fit", "Firebase", "Gen AI"],
    description:
      "A modern fitness app that helps users stay active and motivated with AI-powered workouts and real-time health tracking.",
    github: "https://github.com/vaibhavkothari33/FiteX",
  },
];
