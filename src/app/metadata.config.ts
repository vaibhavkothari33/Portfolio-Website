import { Metadata } from "next";
// import { siteMetadata } from "./metadata";

export const metadata: Metadata = {
  title: {
    default: "Vaibhav Kothari | Full Stack Developer",
    template: "%s | Vaibhav Kothari",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, and open source technologies. Experience in building scalable web applications and leading technical teams.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Open Source",
  ],
  authors: [{ name: "Vaibhav Kothari" }],
  creator: "Vaibhav Kothari",
  publisher: "Vaibhav Kothari",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.vaibhavkothari.me",
    // site_name: "Vaibhav Kothari Portfolio",
    title: "Vaibhav Kothari | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and open source technologies",
    // images: [
    //   {

    //     width: 1200,
    //     height: 630,
    //     alt: "Vaibhav Kothari",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@VaibhavKotharii",
    // images: ["/avatar.jpg"],
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vaibhav Kothari",
  url: "https://www.yourwebsite.com",
  sameAs: [
    "https://github.com/yourusername",
    "https://linkedin.com/in/vaibhavkothari33",
    "https://twitter.com/VaibhavKotharii",
  ],
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, and open source technologies",
};