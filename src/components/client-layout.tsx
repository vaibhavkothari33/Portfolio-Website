"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { IconHome, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { DEFAULT_THEME, THEME_IDS } from "@/lib/themes";
import { ViewTransitionsProvider } from "@/components/providers/view-transitions-provider";
import { CommandPalette } from "@/components/ui/command-palette";

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "Linked-in", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/vaibhavkothari33/" },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/vaibhavkothari33/" },
  { title: "X", icon: <IconBrandTwitter />, href: "https://x.com/VaibhavKotharii" },
  // The dock swaps in a sun/moon icon and the target theme's name for this
  // entry, so the icon and title here are only placeholders.
  { title: "Theme", icon: null, href: "#", id: "theme-switcher" },
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      themes={THEME_IDS}
      // Every theme is a deliberate design; none of them should be
      // overridden by the OS preference.
      enableSystem={false}
      // The picker runs its own scoped cross-fade instead.
      disableTransitionOnChange
    >
      <ToastProvider>
        <ViewTransitionsProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <NoiseOverlay />
          <Analytics />
          <FloatingDock items={dockItems} />
          <CommandPalette />
          <Toaster />
        </ViewTransitionsProvider>
      </ToastProvider>
    </ThemeProvider>
  );
} 