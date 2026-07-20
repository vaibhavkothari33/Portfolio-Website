"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

/**
 * Routes that are NOT served by the app router. `src/pages/links.tsx` lives
 * in the pages directory, so navigating there is a full document load and
 * can't participate in a client-side view transition.
 */
const NON_APP_ROUTES = ["/links"];

/**
 * Longest we'll hold a transition open waiting for the new route to render.
 * Without this, a navigation that never completes (an error, a redirect to
 * a non-app route) would leave the view-transition snapshot frozen over the
 * page — the whole UI would appear locked up.
 */
const NAVIGATION_TIMEOUT = 1200;

/**
 * Wraps client-side navigation in a view transition.
 *
 * Implemented as a document-level click listener rather than a custom Link
 * component, so every existing `next/link` and plain `<a>` on the site is
 * covered without touching them.
 *
 * The tricky part is timing: `router.push` gives us no signal for "the new
 * route has painted", but the browser needs the DOM updated before the
 * transition callback resolves. So the promise is held open and resolved by
 * the pathname effect below, once React has actually committed the route.
 */
type ViewTransitionRouter = { navigate: (href: string) => void };

const ViewTransitionContext = createContext<ViewTransitionRouter | null>(null);

/**
 * Navigate with the same transition the click interceptor uses. Falls back
 * to a plain location change if used outside the provider.
 */
export function useViewTransitionRouter(): ViewTransitionRouter {
  const ctx = useContext(ViewTransitionContext);
  return (
    ctx ?? {
      navigate: (href: string) => {
        if (typeof window !== "undefined") window.location.href = href;
      },
    }
  );
}

export function ViewTransitionsProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const resolveRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  // The new route has rendered — let the transition play.
  useEffect(() => {
    if (!resolveRef.current) return;

    window.clearTimeout(timerRef.current);
    resolveRef.current();
    resolveRef.current = null;
  }, [pathname]);

  const navigate = useCallback(
    (destination: string) => {
      if (typeof document.startViewTransition !== "function") {
        router.push(destination);
        return;
      }

      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolveRef.current = resolve;
            timerRef.current = window.setTimeout(() => {
              resolveRef.current = null;
              resolve();
            }, NAVIGATION_TIMEOUT);

            startTransition(() => router.push(destination));
          }),
      );
    },
    [router],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Respect anything that already handled the click, and let the browser
      // own modified clicks (new tab, download, context menu).
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (/^(mailto:|tel:|#)/i.test(href)) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      // Same page — this is an in-page anchor, leave it to smooth scrolling.
      if (url.pathname === window.location.pathname) return;
      if (NON_APP_ROUTES.some((r) => url.pathname.startsWith(r))) return;
      // Firefox and older Safari: fall through to Next's normal navigation.
      if (typeof document.startViewTransition !== "function") return;

      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(timerRef.current);
    };
  }, [navigate]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <ViewTransitionContext.Provider value={value}>
      {children}
    </ViewTransitionContext.Provider>
  );
}
