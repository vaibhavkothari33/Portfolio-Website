import type { Metadata } from "next";
import ExperiencePageContent from "./experience-page-content";

export const metadata: Metadata = {
  title: "Experience | Vaibhav Kothari",
  description:
    "Professional experience of Vaibhav Kothari across Sythra, Aistad, Rovo, frontend engineering, full-stack development, and product engineering.",
  keywords: [
    "Vaibhav Kothari experience",
    "Aistad engineer",
    "Rovo founding engineer",
    "Sapphire Broking frontend developer",
    "Bennett University student developer",
    "Sythra engineer",
    "full-stack engineer experience",
  ],
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
