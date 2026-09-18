import type { Metadata } from "next";

/**
 * page.tsx is a client component and so can't export metadata itself —
 * this layout carries the route's SEO instead.
 */
export const metadata: Metadata = {
  title: "Experience",
  description:
    "Vaibhav Kothari is Founding Engineer at Aistad S.r.l. He built Aistad, the legal-tech platform for Italian lawyers, and has shipped products at Sythra, Rovo, and Sapphire Broking.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Vaibhav Kothari — Aistad Founding Engineer",
    description:
      "Vaibhav Kothari built Aistad as Founding Engineer at Aistad S.r.l. in Rome. Roles across legal-tech, recruiting, and full-stack product engineering.",
    url: "/experience",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
