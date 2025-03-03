"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconColorPicker } from "@tabler/icons-react";
// import { IconHome, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconColorPicker, IconLink } from "@tabler/icons-react";
import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import { Analytics } from '@vercel/analytics/next'
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { siteMetadata } from "./metadata";
import { Metadata } from "next";

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "Linked-in", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/vaibhavkothari33/" },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/vaibhavkothari33/" },
  { title: "X", icon: <IconBrandTwitter />, href: "https://x.com/VaibhavKotharii" },
  { title: "Theme", icon: <IconColorPicker />, href: "#", id: "theme-switcher" },
  // { title: "Links", icon: <IconLink />, href: "/links" }, 
];

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={siteMetadata.siteUrl} />
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            {children}
            <Analytics />
            <FloatingDock
              items={dockItems}
            />
            <ToastViewport />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
