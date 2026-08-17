/**
 * Opening the game from anywhere on the page.
 *
 * The modal lives in one place (TetrisLauncher, mounted by the client
 * layout), but several entry points want to trigger it — the contact form,
 * the hero's social row, the scroll-bottom pill. A window event keeps those
 * callers free of any import of the game itself, so a button in the hero
 * doesn't drag the launcher's dependencies into its own module graph.
 */

export const TETRIS_OPEN_EVENT = "tetris:open";

export function openTetris() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TETRIS_OPEN_EVENT));
}
