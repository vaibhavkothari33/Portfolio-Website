import React, { useEffect, useRef, useState } from "react";
import { Twitter, ExternalLink, Sparkles, MessageCircle, Heart, Repeat2 } from "lucide-react";

type TwitterWidgets = {
    widgets: {
        createTweetEmbed: (
            tweetId: string,
            element: HTMLElement,
            options?: {
                theme?: "dark" | "light";
                align?: "left" | "right" | "center";
                width?: number;
            }
        ) => Promise<HTMLElement>;
    };
};

declare global {
    interface Window {
        twttr: TwitterWidgets;
    }
}

const TweetsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [widgetsLoaded, setWidgetsLoaded] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

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
            setLoadingProgress(0);
            
            if (!containerRef.current || !window.twttr?.widgets) return;

            const wrappers = containerRef.current.querySelectorAll<HTMLElement>(".tweet-wrapper");
            if (wrappers.length !== tweetUrls.length) return;

            const renderPromises = tweetUrls.map((url, index) => {
                const wrapper = wrappers[index];
                if (!wrapper) return;

                return window.twttr.widgets
                    .createTweetEmbed(getTweetIdFromUrl(url), wrapper, {
                        theme: isDarkMode ? "dark" : "light",
                        align: "center",
                        width: 400,
                    })
                    .then(() => {
                        setLoadingProgress(prev => prev + (100 / tweetUrls.length));
                    });
            });

            await Promise.all(renderPromises);
            setWidgetsLoaded(true);
        };

        loadTwitterWidgets();
    }, [isDarkMode]);

    const SkeletonTweet = ({ index }: { index: number }) => (
        <div 
            className="relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-500 group"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-neutral-300 dark:bg-neutral-700 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse w-32" />
                        <div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse w-24" />
                    </div>
                    <div className="w-6 h-6 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse w-4/5" />
                    <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse w-3/5" />
                </div>

                {/* Image placeholder */}
                <div className="h-48 bg-neutral-300 dark:bg-neutral-700 rounded-xl animate-pulse" />

                {/* Actions */}
                <div className="flex justify-between pt-4">
                    {[MessageCircle, Repeat2, Heart].map((Icon, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse" />
                            <div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse w-8" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Loading indicator */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                 style={{ width: `${loadingProgress}%` }} />
        </div>
    );

    return (
        <section className="relative min-h-screen bg-white dark:bg-neutral-950 py-24 px-6 overflow-hidden">
            {/* Enhanced background effects */}
            {/* <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-500" />
            </div> */}

          
            <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
                {/* Enhanced Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 dark:bg-neutral-800/80 border border-neutral-300/50 dark:border-neutral-600/50 rounded-full backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative">
                            <Twitter className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">Live from X</span>
                        <Sparkles className="w-5 h-5 text-yellow-500 dark:text-yellow-400 animate-pulse" />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6 tracking-tight">
                        Latest{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Posts
                        </span>
                    </h2>

                    <p className="text-neutral-600 dark:text-neutral-400 text-xl max-w-3xl mx-auto leading-relaxed">
                        Thoughts, insights, and updates from my X (Twitter) feed — fresh perspectives on tech, life, and everything in between.
                    </p>
                </div>

                {/* Enhanced Tweet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
                    {tweetUrls.map((_, index) => (
                        <div 
                            key={index} 
                            className="tweet-wrapper min-h-[520px] w-full opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {!widgetsLoaded && <SkeletonTweet index={index} />}
                        </div>
                    ))}
                </div>

                {/* Enhanced CTA */}
                <div className="text-center">
                    <div className="relative inline-block">
                        <a
                            href="https://x.com/VaibhavKotharii"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group overflow-hidden"
                        >
                            <Twitter className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                            <span className="relative z-10">Follow @VaibhavKotharii</span>
                            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                        </a>
                        
                        {/* Floating icons around CTA */}
                        {/* <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full animate-bounce delay-100" />
                        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500/20 rounded-full animate-bounce delay-300" /> */}
                    </div>
                </div>
            </div>

            {/* Enhanced styles for embedded tweets */}
            <style jsx>{`
                :global(.twitter-tweet) {
                    margin: 0 auto !important;
                    max-width: 400px !important;
                    width: 100% !important;
                    border-radius: 20px !important;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
                    border: 1px solid ${isDarkMode ? 'rgba(64, 64, 64, 0.3)' : 'rgba(229, 231, 235, 0.8)'} !important;
                    backdrop-filter: blur(10px) !important;
                    transition: all 0.3s ease !important;
                }
                
                :global(.twitter-tweet:hover) {
                    transform: translateY(-4px) !important;
                    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18) !important;
                }
                
                :global(.twitter-tweet iframe) {
                    border-radius: 20px !important;
                }

                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default TweetsSection;