export type MotionCut = {
  id: string;
  reel: string;
  title: string;
  kind: string;
  src: string;
  poster: string;
  duration: number;
  description: string;
};

export const motionCuts: MotionCut[] = [
  {
    id: "sythra",
    reel: "01",
    title: "Sythra Cinema",
    kind: "Product film",
    src: "/SythraCinemafinal.mp4",
    poster: "/motion/sythra.jpg",
    duration: 70,
    description:
      "A cinema pass for Sythra — kinetic type, product UI, and the learning loop in motion.",
  },
  {
    id: "agentic",
    reel: "02",
    title: "Sythra Agentic",
    kind: "Product demo",
    src: "/sythra-agentic-demo.mp4",
    poster: "/motion/agentic.jpg",
    duration: 62,
    description:
      "The agentic tutor in a live lesson — quizzes, hints, and the mascot walking a concept through the loop.",
  },
  {
    id: "vantage",
    reel: "03",
    title: "Vantage",
    kind: "Product walkthrough",
    src: "/demo.mp4",
    poster: "/motion/demo.jpg",
    duration: 96,
    description:
      "A walkthrough of bring-your-own-key settings — pick a provider, paste a key, verify the model.",
  },
];
