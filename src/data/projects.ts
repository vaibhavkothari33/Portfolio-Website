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

export const allProjects: Project[] = [
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
    label: "SECURITY",
    title: "Secure Wipe",
    image: "/SIH.png",
    technologies: ["Next.js", "Rust", "Electron.js", "SurePass"],
    description:
      "Secure data erasure across the globe — a web application that lets users securely wipe data from their devices.",
    github: "",
    preview: "https://sih-bu.vercel.app/",
  },
  {
    id: "003",
    label: "WEB3 · GAME",
    title: "Green Whistle",
    image: "/Green.png",
    technologies: ["Monad", "Next.js", "Phaser.js", "Grid Engine", "Groq"],
    description:
      "A vibrant pixelated universe for farming, trading, and adventure — grow crops, catch fish, and trade with friends on-chain.",
    github: "https://github.com/vaibhavkothari33/Greenwhistle",
    preview: "https://greenwhistle.vercel.app/",
  },
  {
    id: "004",
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
    id: "005",
    label: "WEB3 · STREAMING",
    title: "BlockBinge",
    image: "/Block.png",
    technologies: ["React", "Ethers.js", "Solidity", "Reactive Smart Contract"],
    description:
      "A decentralized streaming platform with pay-as-you-watch — only pay for the minutes you actually watch.",
    github: "https://github.com/vaibhavkothari33/blockBinge/",
    preview: "https://blockbinge.vercel.app/",
  },
  {
    id: "006",
    label: "MOBILE · AI",
    title: "FiteX",
    image: "/Fitex.png",
    technologies: ["React Native", "Expo", "Google Fit", "Firebase", "Gen AI"],
    description:
      "A modern fitness app that helps users stay active and motivated with AI-powered workouts and real-time health tracking.",
    github: "https://github.com/vaibhavkothari33/FiteX",
  },
  {
    id: "007",
    label: "EDTECH",
    title: "PathShala",
    image: "/Pathshala.png",
    technologies: ["React", "Appwrite", "OAuth2", "Gen AI"],
    description:
      "An educational platform connecting students with coaching institutes through a seamless discovery and enrollment experience.",
    github: "https://github.com/vaibhavkothari33/PathShala2.0/",
    preview: "https://pathshala-rho.vercel.app/",
  },
  {
    id: "008",
    label: "ACCESSIBILITY",
    title: "Sanjeevan",
    image: "https://i.ibb.co/7Jbhsgp/Screenshot-2024-12-25-020904.png",
    technologies: ["Firebase", "WebSockets", "WebRTC", "Python", "JavaScript"],
    description:
      "A video calling app for individuals with speech impairments, with real-time communication and assistive features.",
    github: "https://github.com/vaibhavkothari33/Hackfest",
    preview: "https://vaibhavkothari33.github.io/Hackfest/index.html",
  },
  {
    id: "009",
    label: "DEV TOOLS",
    title: "CodeSketch",
    image:
      "https://vaibhavkothari.gallerycdn.vsassets.io/extensions/vaibhavkothari/codesketch/1.4.0/1741893344455/Microsoft.VisualStudio.Services.Icons.Default",
    technologies: ["JavaScript", "Python", "D3.js"],
    description:
      "A VS Code extension that generates interactive diagrams from JavaScript, Python, and C++ code using D3.js.",
    github: "https://github.com/vaibhavkothari33/Code-to-Diagram",
    preview:
      "https://marketplace.visualstudio.com/items?itemName=VaibhavKothari.codesketch",
  },
  {
    id: "010",
    label: "AI · MUSIC",
    title: "SentiTune",
    image: "https://i.ibb.co/gv493p3/Screenshot-2025-01-03-012106.png",
    technologies: ["Python", "FastAPI", "Uvicorn", "scikit-learn"],
    description:
      "An AI-powered web app that suggests songs tailored to your mood and emotions using the Spotify API.",
    github: "https://github.com/vaibhavkothari33/SentiTune",
    preview: "https://vaibhavkothari33.github.io/SentiTune/",
  },
  {
    id: "011",
    label: "FINTECH · OSS",
    title: "PaiseKaHisab",
    image: "https://i.ibb.co/28VpFr0/Screenshot-2025-01-03-011815.png",
    technologies: ["Firebase", "Chart.js", "JavaScript", "Hacktoberfest"],
    description:
      "An open-source finance tool for tracking expenses, visualizing patterns, and receiving personalized financial tips.",
    github: "https://github.com/vaibhavkothari33/PaiseKaHisab",
    preview: "https://vaibhavkothari33.github.io/PaiseKaHisab/",
  },
  {
    id: "012",
    label: "REALTIME",
    title: "Chatoipa",
    image:
      "https://raw.githubusercontent.com/vaibhavkothari33/Chatoipa/refs/heads/main/Chat1.png",
    technologies: ["Java", "WebSockets", "JSwing"],
    description:
      "A real-time chat application built with Java and WebSockets for seamless two-user messaging.",
    github: "https://github.com/vaibhavkothari33/Chatoipa",
  },
  {
    id: "013",
    label: "FUN · WEB",
    title: "LeetCode Roaster",
    image:
      "https://raw.githubusercontent.com/vaibhavkothari33/LeetCode-Roster/refs/heads/main/img/image1.png",
    technologies: ["JavaScript", "HTML", "CSS"],
    description:
      "A fun web app that generates personalized roasts based on your LeetCode profile performance metrics.",
    github: "https://github.com/vaibhavkothari33/LeetCode-Roster",
    preview: "https://vaibhavkothari33.github.io/LeetCode-Roster",
  },
];

export const featuredProjects = allProjects.slice(0, 4);
