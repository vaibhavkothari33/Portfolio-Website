"use client";

import { cn } from "@/lib/utils";
import { motion, useSpring, type MotionValue } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconFileText,
  IconMail,
  IconMapPin,
  IconSend,
  IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";

type GridBlock = {
  id: string;
  label: string;
  title: string;
  description: string;
};

const gridBlocks: GridBlock[] = [
  {
    id: "001",
    label: "GLOBAL",
    title: "Building across borders.",
    description:
      "I've collaborated with founders, clients, and teams across multiple countries, adapting to diverse workflows and product expectations while delivering reliable softwares.",
  },
  {
    id: "002",
    label: "SCALE",
    title: "Built for growth.",
    description:
      "From the first user to thousands, I focus on building systems that remain maintainable, performant, and ready to support long-term growth without unnecessary complexity.",
  },
  {
    id: "003",
    label: "AI",
    title: "Beyond traditional software.",
    description:
      "Building agentic AI systems, automation workflows, and intelligent products that streamline operations, enhance decision-making, and create meaningful experiences for end users.",
  },
  {
    id: "004",
    label: "AVAILABILITY",
    title: "Need someone who ships fast?",
    description:
      "Open to freelance projects, startup collaborations, and engineering roles where ownership, execution, and the ability to deliver real impact are valued.",
  },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/VaibhavKotharii",
    icon: IconBrandTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhavkothari33/",
    icon: IconBrandLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/vaibhavkothari33/",
    icon: IconBrandGithub,
  },
  {
    label: "Email",
    href: "mailto:contact.vaibhavkothari@gmail.com",
    icon: IconMail,
  },
];

const countryFlags = [
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
  { code: "ae", label: "United Arab Emirates" },
  { code: "it", label: "Italy" },
  { code: "in", label: "India" },
];

function HeroTrustBar() {
  return (
    <div className="flex flex-col gap-4 border-t border-neutral-800 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10 md:py-6">
      <div className="flex items-start gap-3 md:items-center">
        <IconWorld className="mt-0.5 h-5 w-5 shrink-0 text-red-500 md:mt-0" stroke={1.5} />
        <p className="text-sm leading-relaxed text-neutral-400 md:text-[15px]">
          Trusted by clients and collaborators across the globe. Open to new
          challenges. Building the future, one product at a time.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5 md:pl-8">
        {countryFlags.map(({ code, label }) => (
          <div
            key={code}
            className="relative h-7 w-7 overflow-hidden rounded-full border border-neutral-700 bg-neutral-900"
            title={label}
          >
            <Image
              src={`https://flagcdn.com/w80/${code}.png`}
              alt={`${label} flag`}
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroActions() {
  return (
    <div className="mt-8 flex flex-col items-center md:items-start">
      <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-neutral-500 hover:bg-neutral-800"
        >
          <IconFileText className="h-4 w-4" stroke={1.5} />
          Resume / CV
        </a>
        <Link
          href="https://cal.com/vaibhavkothari33/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
        >
          <IconSend className="h-4 w-4" stroke={1.5} />
          Get in touch
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-5">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-neutral-500 transition-colors hover:text-white"
          >
            <Icon className="h-5 w-5" stroke={1.5} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function EyeDiagram({ dotX, dotY }: { dotX: MotionValue<number>; dotY: MotionValue<number> }) {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center md:min-h-[360px]">
      <svg
        viewBox="0 0 320 320"
        className="h-[min(70vw,320px)] w-[min(70vw,320px)] text-neutral-700"
        aria-hidden
      >
        <circle cx="160" cy="160" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="110" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="160" y1="10" x2="160" y2="310" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="160" x2="310" y2="160" stroke="currentColor" strokeWidth="1" />
        <ellipse
          cx="160"
          cy="160"
          rx="88"
          ry="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <ellipse
          cx="160"
          cy="160"
          rx="38"
          ry="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)]"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: [1, 1, 0.15, 1, 1] }}
        transition={{
          duration: 4.5,
          times: [0, 0.82, 0.88, 0.94, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function GridCell({
  block,
  className,
}: {
  block: GridBlock;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between p-6 md:p-8 lg:p-10",
        className,
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-red-500">
          {block.label}
        </p>
        <span className="text-xs tabular-nums text-neutral-600">{block.id}</span>
      </div>
      <div>
        <h3 className="mb-3 text-xl font-semibold leading-snug text-white md:text-2xl">
          {block.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:text-[15px]">
          {block.description}
        </p>
      </div>
    </article>
  );
}

export default function GridHeroSection({
  className,
  avatarSrc = "./kothari_vaibhav.jpeg",
  // avatarSrc = "https://avatars.githubusercontent.com/u/129139486",
}: {
  className?: string;
  avatarSrc?: string;
}) {
  const eyeCenterRef = useRef<HTMLDivElement>(null);
  const dotX = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });
  const dotY = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const eyeCenter = eyeCenterRef.current;
      if (!eyeCenter) return;

      const rect = eyeCenter.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const maxRadius = Math.min(rect.width, rect.height) * 0.12;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const clamped = Math.min(distance, maxRadius);

      dotX.set(Math.cos(angle) * clamped);
      dotY.set(Math.sin(angle) * clamped);
    },
    [dotX, dotY],
  );

  const handleMouseLeave = useCallback(() => {
    dotX.set(0);
    dotY.set(0);
  }, [dotX, dotY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full border-b border-neutral-800 bg-neutral-950 text-white",
        className,
      )}
      aria-label="Hero"
    >
      <div className="mx-auto max-w-7xl border-x border-neutral-800">
        <div className="border-b border-neutral-800 px-6 py-14 md:px-10 md:py-20 lg:py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <p className="mb-6 inline-flex items-center gap-2 border border-red-500/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-red-500">
                <span aria-hidden>✕</span> THE INTRO
              </p>
              <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                Hi, I&apos;m Vaibhav Kothari
                <br />
                Shipping products that matter
              </h1>
              <div className="mt-6 max-w-2xl space-y-3 text-sm leading-relaxed text-neutral-400 md:text-base">
                <p className="font-medium text-neutral-300">
                  Full Stack Engineer, Mobile Developer, and AI Builder.
                </p>
                <p>
                  I build scalable web platforms, cross-platform mobile applications,
                  and agentic AI systems that solve real-world problems. From idea to
                  deployment, I enjoy turning ambitious concepts into products people
                  actually use.
                </p>
              </div>
              <HeroActions />
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full border border-neutral-700" aria-hidden />
                <Image
                  src={avatarSrc}
                  alt="Vaibhav Kothari"
                  width={176}
                  height={176}
                  unoptimized
                  className="relative h-36 w-36 rounded-full border border-neutral-800 object-cover md:h-56 md:w-56"
                  priority
                />
              </div>
              <p className="inline-flex items-center gap-1.5 text-sm text-neutral-400">
                <IconMapPin className="h-4 w-4 text-red-500" stroke={1.75} />
                Earth
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2">
          <div
            ref={eyeCenterRef}
            className="border-b border-neutral-800 md:row-span-2 md:border-b-0 md:border-r"
          >
            <EyeDiagram dotX={dotX} dotY={dotY} />
          </div>

          <GridCell
            block={gridBlocks[0]}
            className="border-b border-neutral-800 md:border-r"
          />
          <GridCell block={gridBlocks[1]} className="border-b border-neutral-800" />

          <GridCell
            block={gridBlocks[2]}
            className="border-b border-neutral-800 md:border-r md:border-b-0"
          />
          <GridCell block={gridBlocks[3]} />
        </div>

        <HeroTrustBar />
      </div>
    </section>
  );
}
