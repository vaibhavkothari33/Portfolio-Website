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
    label: "AI · AGENTIC",
    title: "Vantage",
    image: "/projects/vantage.png",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Solari", "Claude", "OpenAI", "Gemini"],
    description:
      "Drop in a competitor's URL. An agent browses their site and the public web, then a model of your choosing writes a structured teardown covering positioning, pricing, tech stack, and the gaps you could exploit, while you watch it work.",
    github: "https://github.com/vaibhavkothari33/Vantage",
    preview: "https://vantage-solari.vercel.app/",
  },
  {
    id: "002",
    label: "AI · COMMERCE",
    title: "Mandi",
    image: "/projects/mandi.png",
    technologies: ["Next.js", "Node", "Razorpay"],
    description:
      "Razorpay AI Buildathon, Track 01, Agentic Commerce. Makes an ordinary Razorpay merchant transactable by an AI buyer, end to end. The LLM never holds spending authority: it proposes, a deterministic gate verifies a signed mandate and executes.",
    github: "https://github.com/vaibhavkothari33/Mandi",
  },
  {
    id: "003",
    label: "DEV TOOLS · WINDOWS",
    title: "opes-janitor",
    image: "/projects/janitor.png",
    technologies: ["PowerShell", "Windows"],
    description:
      "Reclaim tens of gigabytes from developer tool caches on Windows. Dry run by default, allowlist-only deletion, zero dependencies. First run on a disk at 5.5% free returned 23 GB.",
    github: "https://github.com/vaibhavkothari33/opes-janitor",
  },
  {
    id: "004",
    label: "MOBILE · AI",
    title: "FiteX",
    image: "/projects/Fitex.png",
    technologies: ["React Native", "Expo", "Google Fit", "Firebase", "Gen AI"],
    description:
      "A fitness app for staying active with AI-generated workouts and live health tracking through Google Fit. Built with React Native and Expo so it runs on iOS and Android, with Firebase handling auth and progress.",
    github: "https://github.com/vaibhavkothari33/FiteX",
  },
  {
    id: "005",
    label: "SECURITY",
    title: "Secure Wipe",
    image: "/projects/SIH.png",
    technologies: ["Next.js", "Rust", "Electron.js", "SurePass"],
    description:
      "A Smart India Hackathon build for verifiable data erasure. A web console plus a Rust and Electron client wipe devices so deletion is actually confirmed, not just a casual format.",
    github: "",
    preview: "https://sih-bu.vercel.app/",
  },
  {
    id: "006",
    label: "WEB3 · GAME",
    title: "Green Whistle",
    image: "/projects/Green.png",
    technologies: ["Monad", "Next.js", "Phaser.js", "Grid Engine", "Groq"],
    description:
      "A pixel farming and adventure game on Monad. Grow crops, catch fish, and trade with friends on-chain. Phaser and Grid Engine run the world, Groq handles in-game AI.",
    github: "https://github.com/vaibhavkothari33/Greenwhistle",
    preview: "https://greenwhistle.vercel.app/",
  },
  {
    id: "007",
    label: "AI · BLOCKCHAIN",
    title: "Mentora",
    image: "/projects/mentora.png",
    technologies: ["Edu Chain", "React", "Agent Zero", "FastAPI", "Gemini"],
    description:
      "A learning platform on Edu Chain where courses come with verifiable credentials. Students complete lessons and earn NFT certificates that prove what they finished, with an agent-backed tutor in the loop.",
    github: "https://github.com/vaibhavkothari33/Mentora",
    preview: "https://mentora-rust.vercel.app/",
  },
  {
    id: "008",
    label: "AI · AGENTIC",
    title: "Codex",
    image: "https://pbs.twimg.com/media/G6tXKSFbIAAAIJ4?format=png&name=large",
    technologies: ["React", "Next.js", "Gemini", "GitHub API"],
    description:
      "An agentic code review tool that pulls a GitHub repo, embeds the codebase, and walks it with Gemini. You get structured review comments instead of a generic lint dump.",
    github: "https://github.com/vaibhavkothari33/Codex-Agent",
    preview: "https://codex-nu-wine.vercel.app/",
  },
  { 
    id: "009",
    label: "AI · EDTECH",
    title: "AI Code Reviewer",
    image: "/projects/aicode.png",
    technologies: ["React", "Next.js", "Gemini", "GitHub API"],
    description:
      "Point it at a GitHub repo and Gemini reviews the code with vector embeddings. Flags bugs, style issues, and missing tests without cloning the whole project onto your machine.",
    github: "https://github.com/vaibhavkothari33/AI-CodeReviewer",
    preview: "",
  },
  {
    id: "010",
    label: "WEB3 · STREAMING",
    title: "BlockBinge",
    image: "/projects/Block.png",
    technologies: ["React", "Ethers.js", "Solidity", "Reactive Smart Contract"],
    description:
      "A decentralized streaming app where you pay for the minutes you actually watch. Reactive smart contracts settle as you go, so there is no unused monthly plan sitting in the background.",
    github: "https://github.com/vaibhavkothari33/blockBinge/",
    preview: "https://blockbinge.vercel.app/",
  },
  {
    id: "011",
    label: "AI · EDTECH",
    title: "Learn Loop",
    image: "/projects/learnloop.png",
    technologies: ["Next.js", "Solidity", "Open Router", "Appwrite", "ERC-721"],
    description:
      "Paste a YouTube video and it builds a personalized learning path, a real coding challenge, and an AI grader that checks your GitHub repo checkpoint by checkpoint. Built so a tutorial turns into something you actually ship.",
    github: "https://github.com/vaibhavkothari33/LearnLoop",
    preview: "https://hackacinno.vercel.app/dashboard",
  },
  {
    id: "012",
    label: "RSVP",
    title: "GitConnect",
    image: "/projects/gitcon.png",
    technologies: ["React", "Next.js", "Supabase", "Azure", "Gen AI"],
    description:
      "RSVP and registration for the Git and GitHub workshop FOSS United ran at Bennett University. Attendees could sign up quickly, with Supabase on the backend and a small gen-AI assist for the flow.",
    github: "https://github.com/vaibhavkothari33/Foss-GitCon",
    preview: "https://foss-git-con.vercel.app/",
  },
  {
    id: "013",
    label: "Contract",
    title: "Trident Loans",
    image: "/projects/trident.png",
    technologies: ["React", "Python", "FastAPI"],
    description:
      "A loan operations dashboard for taking applications through review and approval. React on the front, FastAPI on the back, so officers can move a file without living in a spreadsheet.",
    github: "https://github.com/vaibhavkothari33/Trident-Loans",
    preview: "https://tridentloans.vercel.app/",
  },
  {
    id: "014",
    label: "EDTECH",
    title: "PathShala",
    image: "/projects/Pathshala.png",
    technologies: ["React", "Appwrite", "OAuth2", "Gen AI"],
    description:
      "Helps students find and enroll in coaching institutes. Discovery, institute profiles, and enrollment sit in one flow, with OAuth sign-in and a bit of gen AI for matching.",
    github: "https://github.com/vaibhavkothari33/PathShala2.0/",
    preview: "https://pathshala-rho.vercel.app/",
  },
  {
    id: "015",
    label: "ACCESSIBILITY",
    title: "Sanjeevan",
    image: "https://i.ibb.co/7Jbhsgp/Screenshot-2024-12-25-020904.png",
    technologies: ["Firebase", "WebSockets", "WebRTC", "Python", "JavaScript"],
    description:
      "A video calling app built for people with speech impairments. WebRTC carries the call, with assistive features so conversation does not depend on spoken audio alone.",
    github: "https://github.com/vaibhavkothari33/Hackfest",
    preview: "https://vaibhavkothari33.github.io/Hackfest/index.html",
  },
  {
    id: "016",
    label: "DEV TOOLS",
    title: "CodeSketch",
    image:
      "https://vaibhavkothari.gallerycdn.vsassets.io/extensions/vaibhavkothari/codesketch/1.4.0/1741893344455/Microsoft.VisualStudio.Services.Icons.Default",
    technologies: ["JavaScript", "Python", "D3.js"],
    description:
      "A VS Code extension with 1000+ downloads that turns JavaScript, Python, and C++ into interactive D3.js diagrams. Built so you can see the shape of a file without drawing it by hand.",
    github: "https://github.com/vaibhavkothari33/Code-to-Diagram",
    preview:
      "https://marketplace.visualstudio.com/publishers/VaibhavKothari",
  },
  {
    id: "017",
    label: "AI · MUSIC",
    title: "SentiTune",
    image: "https://i.ibb.co/gv493p3/Screenshot-2025-01-03-012106.png",
    technologies: ["Python", "FastAPI", "Uvicorn", "scikit-learn"],
    description:
      "Suggests Spotify tracks from how you feel. A small scikit-learn model scores mood, FastAPI serves it, and you get a playlist that matches instead of a generic weekly mix.",
    github: "https://github.com/vaibhavkothari33/SentiTune",
    preview: "https://vaibhavkothari33.github.io/SentiTune/",
  },
  {
    id: "018",
    label: "FINTECH · OSS",
    title: "PaiseKaHisab",
    image: "https://i.ibb.co/28VpFr0/Screenshot-2025-01-03-011815.png",
    technologies: ["Firebase", "Chart.js", "JavaScript", "Hacktoberfest"],
    description:
      "An open-source expense tracker from Hacktoberfest. Log spending, see charts of where the money went, and get simple tips instead of another locked fintech app.",
    github: "https://github.com/vaibhavkothari33/PaiseKaHisab",
    preview: "https://vaibhavkothari33.github.io/PaiseKaHisab/",
  },
  {
    id: "019",
    label: "REALTIME",
    title: "Chatoipa",
    image:
      "https://raw.githubusercontent.com/vaibhavkothari33/Chatoipa/refs/heads/main/Chat1.png",
    technologies: ["Java", "WebSockets", "JSwing"],
    description:
      "A two-user real-time chat built in Java. WebSockets carry the messages, Swing is the client, and there is no extra framework in between.",
    github: "https://github.com/vaibhavkothari33/Chatoipa",
  },
  {
    id: "020",
    label: "FUN · WEB",
    title: "LeetCode Roaster",
    image:
      "https://raw.githubusercontent.com/vaibhavkothari33/LeetCode-Roster/refs/heads/main/img/image1.png",
    technologies: ["JavaScript", "HTML", "CSS"],
    description:
      "Paste a LeetCode username and it roasts the profile from contest rating, streaks, and solved counts. A small web app, mostly for the bit.",
    github: "https://github.com/vaibhavkothari33/LeetCode-Roster",
    preview: "https://vaibhavkothari33.github.io/LeetCode-Roster",
  },
];

export const featuredProjects = allProjects.slice(0, 6);
