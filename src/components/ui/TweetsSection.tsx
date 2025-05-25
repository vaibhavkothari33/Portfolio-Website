import React, { useEffect, useRef, useState } from "react";
import { Twitter, ExternalLink, Sparkles } from "lucide-react";

declare global {
  interface Window {
    twttr: any;
  }
}

const TweetsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetsLoaded, setWidgetsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Detect theme

  const tweetUrls = [
    "https://twitter.com/VaibhavKotharii/status/1924217560813216110",
    "https://twitter.com/VaibhavKotharii/status/1912213578112782357",
    "https://twitter.com/VaibhavKotharii/status/1899923289956639153",
    "https://twitter.com/VaibhavKotharii/status/1874167204457202127",
    "https://twitter.com/VaibhavKotharii/status/1907070659353776191",
  ];

  const getTweetIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  useEffect(() => {
    // Check if dark mode is enabled based on `dark` class on <html>
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const loadTwitterWidgets = () => {
      if (typeof window !== "undefined" && !window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = renderTweets;
        document.body.appendChild(script);
      } else {
        renderTweets();
      }
    };

    const renderTweets = async () => {
      setWidgetsLoaded(false);
      if (!containerRef.current || !window.twttr?.widgets) return;

      const wrappers = containerRef.current.querySelectorAll(".tweet-wrapper");
      if (wrappers.length !== tweetUrls.length) return;

      const renderPromises = tweetUrls.map((url, index) => {
        const wrapper = wrappers[index];
        if (!wrapper) return;

        return window.twttr.widgets
          .createTweetEmbed(getTweetIdFromUrl(url), wrapper, {
            theme: isDarkMode ? "dark" : "light",
            align: "center",
            width: 320,
          })
          .catch((err: any) => {
            console.error("Tweet failed to load:", url, err);
          });
      });

      await Promise.all(renderPromises);
      setWidgetsLoaded(true);
    };

    loadTwitterWidgets();
  }, [isDarkMode]);

  return (
    <section className="bg-white dark:bg-neutral-950 py-24 px-6 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-white dark:bg-neutral-950" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-neutral-200 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-full backdrop-blur-sm">
            <Twitter className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium">Live from X</span>
            <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Posts
            </span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Thoughts, insights, and updates from my X (Twitter) feed.
          </p>
        </div>

        {/* Tweet embeds or skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tweetUrls.map((_, index) => (
            <div key={index} className="tweet-wrapper min-h-[420px] w-full">
              {!widgetsLoaded && (
                <div className="w-full h-[420px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl border border-neutral-300 dark:border-neutral-700" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://x.com/VaibhavKotharii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 group"
          >
            <Twitter className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Follow @VaibhavKotharii
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Styles for embedded tweets */}
      <style jsx>{`
        :global(.twitter-tweet) {
          margin: 0 auto !important;
          max-width: 320px !important;
          width: 100% !important;
        }
        :global(.twitter-tweet iframe) {
          border-radius: 16px !important;
          border: 1px solid ${isDarkMode ? "#404040" : "#ccc"} !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </section>
  );
};

export default TweetsSection;
