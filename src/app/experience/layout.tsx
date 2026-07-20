import type { Metadata } from "next";

/**
 * page.tsx is a client component and so can't export metadata itself —
 * this layout carries the route's SEO instead.
 */
export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience, roles, and engineering work by Vaibhav Kothari.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Vaibhav Kothari",
    description:
      "Professional experience, roles, and engineering work by Vaibhav Kothari.",
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
