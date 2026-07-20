import type { Metadata } from "next";

/**
 * page.tsx is a client component and so can't export metadata itself —
 * this layout carries the route's SEO instead.
 */
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Vaibhav Kothari — full stack web platforms, cross-platform mobile apps, and agentic AI systems.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Vaibhav Kothari",
    description:
      "Selected work — full stack web platforms, cross-platform mobile apps, and agentic AI systems.",
    url: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
