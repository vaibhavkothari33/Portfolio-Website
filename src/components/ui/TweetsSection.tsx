"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

import { getScheme } from "@/lib/themes";

type TwitterWidgets = {
  widgets: {
    createTweetEmbed: (
      tweetId: string,
      element: HTMLElement,
      options?: {
        theme?: "dark" | "light";
        align?: "left" | "right" | "center";
        width?: number;
      },
    ) => Promise<HTMLElement>;
  };
};

declare global {
  interface Window {
    twttr: TwitterWidgets;
  }
}

const TWEET_URLS = [
  "https://x.com/VaibhavKotharii/status/2040847487720955934",
  "https://x.com/VaibhavKotharii/status/1993783785440301222",
  "https://x.com/VaibhavKotharii/status/1992941383297167649",
  "https://twitter.com/VaibhavKotharii/status/1924217560813216110",
  "https://x.com/VaibhavKotharii/status/1992303748035776755",
  // "https://x.com/VaibhavKotharii/status/2055558214608134562",
  "https://twitter.com/VaibhavKotharii/status/1912213578112782357",
] as const;

function getTweetIdFromUrl(url: string) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

function SkeletonTweet({ index }: { index: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line bg-surface/40"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-line-strong/20 to-transparent" />

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-elevated" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-28 animate-pulse rounded bg-elevated" />
            <div className="h-3 w-20 animate-pulse rounded bg-elevated/80" />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="h-3.5 w-full animate-pulse rounded bg-elevated" />
          <div className="h-3.5 w-4/5 animate-pulse rounded bg-elevated" />
          <div className="h-3.5 w-3/5 animate-pulse rounded bg-elevated/80" />
        </div>

        <div className="h-40 animate-pulse rounded-lg border border-line bg-well" />

        <div className="flex justify-between border-t border-line pt-4">
          {[MessageCircle, Repeat2, Heart].map((Icon, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-line-strong" strokeWidth={1.5} />
              <div className="h-3 w-6 animate-pulse rounded bg-elevated" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TweetsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetsLoaded, setWidgetsLoaded] = useState(false);
  const { theme } = useTheme();

  // The embed iframe can't read our CSS variables, so it only gets the
  // coarse light/dark reading of the active theme.
  const scheme = getScheme(theme);

  useEffect(() => {
    const renderTweets = async () => {
      setWidgetsLoaded(false);

      if (!containerRef.current || !window.twttr?.widgets) return;

      const wrappers =
        containerRef.current.querySelectorAll<HTMLElement>(".tweet-wrapper");
      if (wrappers.length !== TWEET_URLS.length) return;

      await Promise.all(
        TWEET_URLS.map((url, index) => {
          const wrapper = wrappers[index];
          if (!wrapper) return Promise.resolve();

          // Drop the previously embedded iframe, otherwise a theme change
          // would append a second copy of every tweet.
          wrapper.querySelectorAll(".twitter-tweet, iframe").forEach((el) => el.remove());

          return window.twttr.widgets.createTweetEmbed(
            getTweetIdFromUrl(url),
            wrapper,
            {
              theme: scheme,
              align: "center",
              width: 360,
            },
          );
        }),
      );

      setWidgetsLoaded(true);
    };

    const loadTwitterWidgets = () => {
      if (typeof window === "undefined") return;

      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = renderTweets;
        document.body.appendChild(script);
        return;
      }

      renderTweets();
    };

    loadTwitterWidgets();
  }, [scheme]);

  return (
    <section
      id="posts"
      className="w-full border-t border-line bg-canvas px-4 py-16 text-strong md:px-10 md:py-20"
      aria-labelledby="posts-heading"
    >
      <div className="mx-auto max-w-6xl" ref={containerRef}>
        <div className="mb-10 md:mb-12">
          <p className="mb-4 inline-flex items-center gap-2 border border-brand/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-brand">
            <span aria-hidden>✕</span> Posts
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2
                id="posts-heading"
                className="text-2xl font-bold leading-tight tracking-tight md:text-3xl"
              >
                Latest from X
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dim md:text-[15px]">
                Thoughts on shipping products, engineering, and building in public
                — pulled straight from my feed.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong bg-surface/60 px-4 py-2 text-xs font-medium text-dim">
              <IconBrandX className="h-3.5 w-3.5 text-brand" stroke={1.75} />
              {TWEET_URLS.length} recent posts
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {TWEET_URLS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "tweet-wrapper min-h-[420px] w-full rounded-xl border border-line bg-surface/30 p-2 transition-colors hover:border-line-strong",
                widgetsLoaded && "animate-[fade-in-up_0.6s_ease-out_forwards] opacity-0",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {!widgetsLoaded && <SkeletonTweet index={index} />}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="https://x.com/VaibhavKotharii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-strong transition-colors hover:border-line-hover hover:bg-surface"
          >
            Follow @VaibhavKotharii
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .tweet-wrapper .twitter-tweet {
          margin: 0 auto !important;
          max-width: 100% !important;
          width: 100% !important;
          border-radius: 0.75rem !important;
          border: 1px solid hsl(var(--line) / 0.8) !important;
          background: hsl(var(--surface) / 0.5) !important;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease !important;
        }

        .tweet-wrapper:hover .twitter-tweet {
          transform: translateY(-2px) !important;
          border-color: hsl(var(--line-strong)) !important;
        }

        .tweet-wrapper .twitter-tweet iframe {
          border-radius: 0.75rem !important;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
