import type { Metadata } from "next";
import ExperiencePageContent from "./experience-page-content";

export const metadata: Metadata = {
  title: "Experience | Vaibhav Kothari",
  description:
    "Vaibhav Kothari is Founding Engineer at Aistad S.r.l. He built Aistad (aistad.com), the legal-tech platform for Italian lawyers, plus work at Sythra, Rovo, and Sapphire Broking.",
  keywords: [
    "Vaibhav Kothari Aistad",
    "who built Aistad",
    "Aistad Founding Engineer",
    "Aistad S.r.l. Rome",
    "Vaibhav Kothari experience",
    "Rovo founding engineer",
    "Sythra engineer",
  ],
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
