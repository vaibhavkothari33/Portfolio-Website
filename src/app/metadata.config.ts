import { Metadata } from "next";
import { siteMetadata } from "./metadata";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMetadata.author.name,
  url: siteMetadata.siteUrl,
  sameAs: [
    siteMetadata.author.twitter,
    siteMetadata.author.linkedin,
    siteMetadata.author.github,
  ],
  jobTitle: "Full Stack Developer",
  description: siteMetadata.description,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author.name }],
  creator: siteMetadata.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
    creator: siteMetadata.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
    ...Object.fromEntries(
      siteMetadata.alternateUrls.map(url => ['alternate', { url }])
    ),
  },
};

export { jsonLd }; 