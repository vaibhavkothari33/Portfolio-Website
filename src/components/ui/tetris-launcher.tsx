"use client";

/**
 * Host for the Tetris modal.
 *
 * Mounted once by the client layout. It renders no trigger of its own — the
 * entry points live where they make sense in the page (the hero's social
 * row, the contact form) and open it through the `tetris:open` event. The
 * game is code-split, so a visitor who never opens it pays nothing for it.
 */

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { IconDeviceGamepad2, IconX } from "@tabler/icons-react";

import { TETRIS_OPEN_EVENT } from "@/lib/tetris-open";

const TetrisGame = dynamic(() => import("@/components/ui/tetris-game"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(60vh,460px)] items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
        Loading
      </span>
    </div>
  ),
});

export function TetrisLauncher() {
  const [open, setOpen] = useState(false);

  // Every entry point on the page opens the modal through this event.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(TETRIS_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(TETRIS_OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Tetris"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-3 shadow-2xl sm:p-5 lg:w-auto lg:p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-brand sm:text-[10px]">
                    <IconDeviceGamepad2 className="h-3.5 w-3.5" stroke={1.75} />
                    Coffee break
                  </p>
                  <h2 className="mt-0.5 text-base font-semibold text-strong sm:mt-1 sm:text-lg">
                    Tetris
                  </h2>
                  <p className="hidden text-xs text-subtle sm:block">
                    Arrow keys or WASD · Space drops · C holds · P pauses
                  </p>
                </div>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="shrink-0 rounded-lg border border-line p-1.5 text-subtle transition-colors hover:border-line-hover hover:text-strong"
                >
                  <IconX className="h-4 w-4" stroke={1.75} />
                </button>
              </div>

              <TetrisGame onClose={close} />
            </motion.div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TetrisLauncher;
