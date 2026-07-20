import { SITE_URL } from "./metadata.config";

export const siteMetadata = {
  title: "Vaibhav Kothari - Full Stack Developer & Software Engineer",
  description: "Experienced Full Stack Developer specializing in Next.js, React, TypeScript, and modern web technologies. Explore my portfolio featuring innovative projects, technical blog posts, open-source contributions, and professional experience in web development, software engineering, and UI/UX design.",
  // Was https://vaibhavkothari.vercel.app, which meant sitemap.xml published
  // Vercel URLs while the site is served from the CNAME domain — two hosts
  // competing for the same content.
  siteUrl: SITE_URL,
  alternateUrls: ["https://vaibhavkothari.vercel.app"],
  siteName: "Vaibhav Kothari",
  twitterHandle: "@VaibhavKotharii",
  author: {
    name: "Vaibhav Kothari",
    twitter: "https://twitter.com/VaibhavKotharii",
    linkedin: "https://www.linkedin.com/in/vaibhavkothari33",
    github: "https://github.com/vaibhavkothari33",
  },
  keywords: [
    "Vaibhav Kothari",
    "VaibhavKothari33",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "JavaScript Developer",
    "Frontend Development",
    "Backend Development",
    "Node.js Developer",
    "UI/UX Design",
    "Web Applications",
    "RESTful APIs",
    "Database Design",
    "Cloud Computing",
    "Software Architecture",
    "Modern Web Development",
    "Open Source Contributor",
    "Tech Blogger",
    "System Design",
    "Performance Optimization",
    "Responsive Web Design",
    "Progressive Web Apps",
    "Code Quality",
    "Technical Leadership"
  ],
  creator: "Vaibhav Kothari",
  ogImage: `${SITE_URL}/og-image.png`,
  themeColor: "#000000",
  category: "Technology",
  locale: "en-US",
  type: "website",
}; 