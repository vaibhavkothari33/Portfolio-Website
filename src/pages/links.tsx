"use client";

import "../../styles/globals.css";
import {
  IconArrowLeft,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandWikipedia,
  IconExternalLink,
  IconFileText,
  IconWorld,
} from "@tabler/icons-react";
import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";

type LinkItem = {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
};

const links: LinkItem[] = [
  {
    title: "Portfolio",
    href: "https://vaibhavkothari.me/",
    description: "Main site and project showcase",
    icon: <IconWorld size={20} stroke={1.5} />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhavkothari33/",
    description: "Professional updates and experience",
    icon: <IconBrandLinkedin size={20} stroke={1.5} />,
  },
  {
    title: "GitHub",
    href: "https://github.com/vaibhavkothari33/",
    description: "Open source and code repositories",
    icon: <IconBrandGithub size={20} stroke={1.5} />,
  },
  {
    title: "X / Twitter",
    href: "https://x.com/VaibhavKotharii",
    description: "Thoughts, builds, and updates",
    icon: <IconBrandTwitter size={20} stroke={1.5} />,
  },
  {
    title: "Publication",
    href: "https://app.readytensor.ai/publications/EDAdadexbbxs",
    description: "Ready Tensor research publication",
    icon: <IconBrandWikipedia size={20} stroke={1.5} />,
  },
  {
    title: "Resume",
    href: "https://vaibhavkothari.me/resume.pdf",
    description: "Download CV and work history",
    icon: <IconFileText size={20} stroke={1.5} />,
  },
  {
    title: "Email",
    href: "mailto:vaibhavkothari50@gmail.com",
    description: "Reach out for collaborations",
    icon: <IconBrandGmail size={20} stroke={1.5} />,
  },
  {
    title: "LeetCode",
    href: "https://leetcode.com/u/vaibhavkothari33/",
    description: "Problem solving and DSA practice",
    icon: <IconBrandLeetcode size={20} stroke={1.5} />,
  },
  {
    title: "Discord",
    href: "https://discordapp.com/users/vaibhavkothari",
    description: "Chat and community connect",
    icon: <IconBrandDiscord size={20} stroke={1.5} />,
  },
];

export default function LinksPage() {
  return (
    <>
      <Head>
        <title>Links | Vaibhav Kothari</title>
        <meta
          name="description"
          content="Every profile of Vaibhav Kothari in one place — portfolio, GitHub, LinkedIn, X, LeetCode, resume, and contact."
        />
        <link rel="canonical" href="https://vaibhavkothari.me/links" />
        <meta property="og:title" content="Links | Vaibhav Kothari" />
        <meta
          property="og:description"
          content="Every profile of Vaibhav Kothari in one place — portfolio, GitHub, LinkedIn, X, LeetCode, resume, and contact."
        />
        <meta property="og:url" content="https://vaibhavkothari.me/links" />
        <meta property="og:image" content="https://vaibhavkothari.me/opengraph-image" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    <div className="min-h-screen bg-canvas text-strong">
      <div className="mx-auto max-w-5xl border-x border-line">
        <div className="border-b border-line px-4 py-8 md:px-8 md:py-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm text-dim transition-colors hover:text-strong"
          >
            <IconArrowLeft className="mr-2 h-4 w-4" stroke={1.75} />
            Back to Home
          </Link>

          <br />
          <p className="mb-3 inline-flex items-center gap-2 border border-brand/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-brand md:px-3 md:py-1 md:text-[11px]">
            <span aria-hidden>✕</span> Links
          </p>
          <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            Everywhere I live online
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
            Portfolio, socials, resume, and contact — one place to find all my
            profiles across the web.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong bg-surface/60 px-4 py-2 text-xs font-medium text-dim">
            <IconExternalLink className="h-3.5 w-3.5 text-brand" stroke={1.75} />
            {links.length} destinations
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:gap-5 md:p-8">
          {links.map((link, index) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-line bg-surface/40 p-4 transition-colors hover:border-line-hover hover:bg-surface/70 md:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-line-strong bg-canvas/80 text-brand transition-colors group-hover:border-brand/40 group-hover:text-brand-hover">
                {link.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
                    Link
                  </p>
                  <span className="text-[10px] tabular-nums text-faint">
                    {String(index + 1).padStart(3, "0")}
                  </span>
                </div>

                <h2 className="text-base font-semibold text-strong transition-colors group-hover:text-brand md:text-lg">
                  {link.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-dim md:text-sm">
                  {link.description}
                </p>

                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-subtle transition-colors group-hover:text-strong">
                  Visit
                  <IconExternalLink className="h-3 w-3" stroke={1.75} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="border-t border-line px-4 py-6 md:px-8">
          <p className="text-center font-mono text-[11px] text-faint">
            © {new Date().getFullYear()} Vaibhav Kothari · All links open in a new tab
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
