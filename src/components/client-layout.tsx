"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconColorPicker } from "@tabler/icons-react";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

// =============================================================================
// LIGHT MODE TOGGLE - Set to true to enable light mode / theme switching
// =============================================================================
const ENABLE_LIGHT_MODE = false;
// =============================================================================

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "Linked-in", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/vaibhavkothari33/" },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/vaibhavkothari33/" },
  { title: "X", icon: <IconBrandTwitter />, href: "https://x.com/VaibhavKotharii" },
  // Theme switcher - only shown when ENABLE_LIGHT_MODE is true
  ...(ENABLE_LIGHT_MODE ? [{ title: "Theme", icon: <IconColorPicker />, href: "#", id: "theme-switcher" }] : []),
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      // When ENABLE_LIGHT_MODE is false, forcedTheme locks the site to dark mode
      forcedTheme={ENABLE_LIGHT_MODE ? undefined : "dark"}
      enableSystem={ENABLE_LIGHT_MODE}
      disableTransitionOnChange
    >
      <ToastProvider>
        {children}
        <Analytics />
        <FloatingDock items={dockItems} />
        <ToastViewport />
      </ToastProvider>
    </ThemeProvider>
  );
} 