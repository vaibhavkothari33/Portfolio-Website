/**
 * Single source of truth for the site's themes.
 *
 * `id` is the class next-themes puts on <html>, and must match a block in
 * src/app/globals.css. `swatch` is only used to draw the picker preview —
 * it mirrors the canvas / surface / brand tokens of each theme.
 */
export type ThemeId = "dark" | "peach";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  blurb: string;
  /**
   * Whether the theme reads as light or dark. Needed by surfaces that can't
   * consume CSS variables — third-party embeds, WebGL, canvas textures.
   */
  scheme: "dark" | "light";
  swatch: { canvas: string; surface: string; brand: string };
};

export const THEMES: ThemeMeta[] = [
  {
    id: "dark",
    label: "Midnight",
    blurb: "The original. Ink black, red signal.",
    scheme: "dark",
    swatch: { canvas: "#0a0a0a", surface: "#171717", brand: "#ef4444" },
  },
  {
    id: "peach",
    label: "Peach",
    blurb: "Sunset coral on soft blush.",
    scheme: "light",
    swatch: { canvas: "#fff2e8", surface: "#fffaf6", brand: "#ce3812" },
  },
];

export const THEME_IDS = THEMES.map((t) => t.id);

export const DEFAULT_THEME: ThemeId = "dark";

/** Light/dark reading of a theme id, for surfaces that can't use CSS vars. */
export function getScheme(theme: string | undefined): "dark" | "light" {
  return THEMES.find((t) => t.id === theme)?.scheme ?? "dark";
}

/** Swaps the theme class on <html> synchronously. */
function applyThemeClass(id: ThemeId) {
  const root = document.documentElement;
  root.classList.remove(...THEME_IDS);
  root.classList.add(id);
}

/**
 * Swaps the theme behind a view transition — a circle wiping in from the
 * top-right corner. See the `::view-transition-*` rules in globals.css.
 *
 * The class is applied directly rather than waiting on React, because the
 * browser snapshots the DOM the moment the callback returns; a state
 * update wouldn't have painted yet and the sweep would reveal the old
 * theme. `persist` then syncs next-themes (state + localStorage), and its
 * own effect re-applies the identical class, which is a visual no-op.
 */
export function switchTheme(id: ThemeId, persist: (id: ThemeId) => void) {
  if (typeof document === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || typeof document.startViewTransition !== "function") {
    applyThemeClass(id);
    persist(id);
    return;
  }

  const root = document.documentElement;
  root.classList.add("theme-swapping");

  const transition = document.startViewTransition(() => {
    applyThemeClass(id);
    persist(id);
  });

  transition.finished
    .catch(() => {})
    .finally(() => root.classList.remove("theme-swapping"));
}
