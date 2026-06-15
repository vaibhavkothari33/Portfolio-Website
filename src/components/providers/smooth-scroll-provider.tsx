"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "lenis/dist/lenis.css";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

function scrollToTop(lenis?: ReturnType<typeof useLenis>) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function ScrollToTopWithLenis() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    scrollToTop(lenis);
  }, [pathname, lenis]);

  return null;
}

function ScrollToTopPlain() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (reduceMotion) {
    return (
      <>
        <ScrollToTopPlain />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <ScrollToTopWithLenis />
      {children}
    </ReactLenis>
  );
}
