"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconColorPicker } from "@tabler/icons-react";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "Linked-in", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/vaibhavkothari33/" },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/vaibhavkothari33/" },
  { title: "X", icon: <IconBrandTwitter />, href: "https://x.com/VaibhavKotharii" },
  { title: "Theme", icon: <IconColorPicker />, href: "#", id: "theme-switcher" },
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
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