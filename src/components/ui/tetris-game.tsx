"use client";

/**
 * The game itself: a modal arcade cabinet.
 *
 * The board is deliberately its own dark surface in every theme rather than
 * a themed one — a game screen reads as a screen, and it keeps the piece
 * palette (one orange ramp) legible whether the site is on Midnight or
 * Peach.
 *
 * All mutable game state lives in refs and is stepped by a single rAF loop;
 * React is only asked to re-render when a frame actually changed something.
 * Driving 200 cells through useState at 60fps would spend most of the frame
 * budget in the reconciler for no visual gain.
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useLenis } from "lenis/react";

import { cn } from "@/lib/utils";
import { SOUND_KEY, SoundKit } from "@/lib/tetris-audio";
import {
  COLS,
  HIDDEN_ROWS,
  ROWS,
  clearRows,
  cellsOf,
  dropDistance,
  emptyBoard,
  fullRows,
  ghostOf,
  gravityMs,
  levelFor,
  lockPiece,
  move,
  newBag,
  spawn,
  tryRotate,
  LINES_PER_LEVEL,
  LINE_SCORES,
  type Board,
  type Piece,
  type PieceId,
} from "@/lib/tetris";

/**
 * Amber ramp. The seven pieces are separated by lightness rather than hue so
 * they stay distinguishable while keeping to the site's warm accent.
 */
const PIECE_COLORS: Record<PieceId, string> = {
  I: "#ffb020",
  O: "#f97316",
  T: "#c2410c",
  S: "#fcd34d",
  Z: "#9a4a14",
  J: "#e2842e",
  L: "#fde8b0",
};

const ACCENT = "#f97316";
const ACCENT_BRIGHT = "#ffb020";

const HIGH_SCORE_KEY = "vk-tetris-high-score";

/** Horizontal auto-shift: delay before repeat, then repeat interval. */
const DAS_MS = 150;
const ARR_MS = 45;
const SOFT_DROP_MS = 45;
/** Grace period after landing, so a piece can still be slid into place. */
const LOCK_DELAY_MS = 500;
const MAX_LOCK_RESETS = 15;
const CLEAR_FLASH_MS = 130;

type Status = "running" | "paused" | "over";

type Action =
  | "left"
  | "right"
  | "softDrop"
  | "rotateCW"
  | "rotateCCW"
  | "hardDrop"
  | "hold";

/** Every key that drives the game, mapped to the action it performs. */
const KEY_MAP: Record<string, Action> = {
  arrowleft: "left",
  a: "left",
  arrowright: "right",
  d: "right",
  arrowdown: "softDrop",
  s: "softDrop",
  arrowup: "rotateCW",
  w: "rotateCW",
  x: "rotateCW",
  z: "rotateCCW",
  q: "rotateCCW",
  " ": "hardDrop",
  c: "hold",
  shift: "hold",
};

/** Interval between repeats while a key is held. */
const REPEATING: Partial<Record<Action, number>> = {
  left: ARR_MS,
  right: ARR_MS,
  softDrop: SOFT_DROP_MS,
};

/**
 * Wait before the first repeat. Movement gets the longer DAS delay so a tap
 * nudges the piece one column instead of skidding it across the board; soft
 * drop repeats immediately, since holding it down is the whole point.
 */
const FIRST_REPEAT: Partial<Record<Action, number>> = {
  left: DAS_MS,
  right: DAS_MS,
  softDrop: SOFT_DROP_MS,
};

type GameRef = {
  board: Board;
  piece: Piece | null;
  queue: PieceId[];
  hold: PieceId | null;
  canHold: boolean;
  score: number;
  lines: number;
  level: number;
  status: Status;
  /** Rows mid-flash; the board is frozen until the flash ends. */
  clearing: { rows: number[]; until: number } | null;
  gravityAcc: number;
  lockAcc: number;
  lockResets: number;
  grounded: boolean;
  /** Snapshot of the record when this run started, for the "new best" badge. */
  bestAtStart: number;
};

function initialGame(bestAtStart: number): GameRef {
  const queue = [...newBag(), ...newBag()];
  const first = queue.shift()!;
  return {
    board: emptyBoard(),
    piece: spawn(first),
    queue,
    hold: null,
    canHold: true,
    score: 0,
    lines: 0,
    level: 1,
    status: "running",
    clearing: null,
    gravityAcc: 0,
    lockAcc: 0,
    lockResets: 0,
    grounded: false,
    bestAtStart,
  };
}

export default function TetrisGame({ onClose }: { onClose: () => void }) {
  const game = useRef<GameRef>(initialGame(0));
  const highScore = useRef(0);
  const [, render] = useReducer((n: number) => n + 1, 0);

  const lenis = useLenis();

  // Held inputs (keyboard or touch) and how long until each repeats.
  const held = useRef(new Map<Action, number>());

  // Sound is on by default — the visitor opened a game — but the preference
  // is remembered, so muting it once is enough.
  const sound = useRef<SoundKit>(new SoundKit(true));

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0);
    if (Number.isFinite(stored) && stored > 0) {
      highScore.current = stored;
      game.current.bestAtStart = stored;
      render();
    }

    if (window.localStorage.getItem(SOUND_KEY) === "off") {
      sound.current.enabled = false;
      render();
    }
  }, []);

  // The context holds an audio device open; closing the modal should release it.
  useEffect(() => {
    const kit = sound.current;
    return () => kit.dispose();
  }, []);

  const toggleSound = useCallback(() => {
    const next = !sound.current.enabled;
    sound.current.enabled = next;
    try {
      window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    } catch {
      // Storage disabled — the toggle still works for this session.
    }
    if (next) sound.current.play("rotate");
    render();
  }, []);

  const saveHighScore = useCallback((score: number) => {
    if (score <= highScore.current) return;
    highScore.current = score;
    try {
      window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
    } catch {
      // Private mode / storage disabled — the run still counts, it just
      // won't survive a reload.
    }
  }, []);

  /** Pulls the next piece off the queue, refilling the bag as it drains. */
  const nextPiece = useCallback(
    (g: GameRef) => {
      if (g.queue.length <= 7) g.queue.push(...newBag());
      const piece = spawn(g.queue.shift()!);

      // Blocked at spawn is the classic top-out condition.
      if (cellsOf(piece).some(([x, y]) => y >= 0 && g.board[y * COLS + x])) {
        g.piece = piece;
        g.status = "over";
        saveHighScore(g.score);
        sound.current.play("gameOver");
        return;
      }

      g.piece = piece;
      g.canHold = true;
      g.gravityAcc = 0;
      g.lockAcc = 0;
      g.lockResets = 0;
      g.grounded = false;
    },
    [saveHighScore],
  );

  const lockCurrent = useCallback(
    (g: GameRef) => {
      if (!g.piece) return;

      g.board = lockPiece(g.board, g.piece);
      g.piece = null;

      const rows = fullRows(g.board);
      if (rows.length > 0) {
        const previousLevel = g.level;
        g.lines += rows.length;
        g.level = levelFor(g.lines);
        g.score += LINE_SCORES[rows.length] * g.level;
        saveHighScore(g.score);
        g.clearing = { rows, until: performance.now() + CLEAR_FLASH_MS };
        sound.current.play(rows.length === 4 ? "tetris" : "clear");
        if (g.level > previousLevel) sound.current.play("levelUp");
        return;
      }

      sound.current.play("lock");
      nextPiece(g);
    },
    [nextPiece, saveHighScore],
  );

  /** Runs one action against the live game. Returns true if anything moved. */
  const apply = useCallback(
    (action: Action): boolean => {
      const g = game.current;
      if (g.status !== "running" || !g.piece || g.clearing) return false;

      const resetLock = () => {
        if (g.grounded && g.lockResets < MAX_LOCK_RESETS) {
          g.lockAcc = 0;
          g.lockResets++;
        }
      };

      switch (action) {
        case "left":
        case "right": {
          const moved = move(g.board, g.piece, action === "left" ? -1 : 1, 0);
          if (!moved) return false;
          g.piece = moved;
          resetLock();
          sound.current.play("move");
          return true;
        }
        case "softDrop": {
          const moved = move(g.board, g.piece, 0, 1);
          if (!moved) return false;
          g.piece = moved;
          g.score += 1;
          g.gravityAcc = 0;
          sound.current.play("softDrop");
          return true;
        }
        case "rotateCW":
        case "rotateCCW": {
          const rotated = tryRotate(g.board, g.piece, action === "rotateCW" ? 1 : -1);
          if (!rotated) return false;
          g.piece = rotated;
          resetLock();
          sound.current.play("rotate");
          return true;
        }
        case "hardDrop": {
          const distance = dropDistance(g.board, g.piece);
          g.piece = { ...g.piece, y: g.piece.y + distance };
          g.score += distance * 2;
          sound.current.play("hardDrop");
          lockCurrent(g);
          return true;
        }
        case "hold": {
          if (!g.canHold) return false;
          const current = g.piece.id;
          if (g.hold) {
            g.piece = spawn(g.hold);
            g.hold = current;
            g.gravityAcc = 0;
            g.lockAcc = 0;
            g.lockResets = 0;
            g.grounded = false;
          } else {
            g.hold = current;
            nextPiece(g);
          }
          g.canHold = false;
          sound.current.play("hold");
          return true;
        }
        default:
          return false;
      }
    },
    [lockCurrent, nextPiece],
  );

  const togglePause = useCallback(() => {
    const g = game.current;
    if (g.status === "running") g.status = "paused";
    else if (g.status === "paused") g.status = "running";
    else return;
    held.current.clear();
    sound.current.play("pause");
    render();
  }, []);

  const restart = useCallback(() => {
    game.current = initialGame(highScore.current);
    held.current.clear();
    render();
  }, []);

  /** Shared by the touch pad: press starts the action and its repeat timer. */
  const press = useCallback(
    (action: Action) => {
      held.current.set(action, FIRST_REPEAT[action] ?? Infinity);
      apply(action);
      render();
    },
    [apply],
  );

  const release = useCallback((action: Action) => {
    held.current.delete(action);
  }, []);

  // ---------------------------------------------------------------- loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);

      // Capped so a backgrounded tab doesn't dump a multi-second delta into
      // the loop and drop the piece straight to the floor on return.
      const dt = Math.min(now - last, 100);
      last = now;
      const g = game.current;
      let dirty = false;

      if (g.status === "running") {
        // Key repeat.
        for (const [action, remaining] of held.current) {
          const interval = REPEATING[action];
          if (interval === undefined) continue;
          const left = remaining - dt;
          if (left <= 0) {
            held.current.set(action, interval);
            if (apply(action)) dirty = true;
          } else {
            held.current.set(action, left);
          }
        }

        if (g.clearing) {
          if (now >= g.clearing.until) {
            g.board = clearRows(g.board, g.clearing.rows);
            g.clearing = null;
            nextPiece(g);
            dirty = true;
          }
        } else if (g.piece) {
          g.gravityAcc += dt;
          const step = gravityMs(g.level);

          while (g.gravityAcc >= step && g.piece) {
            g.gravityAcc -= step;
            const moved = move(g.board, g.piece, 0, 1);
            if (moved) {
              g.piece = moved;
              dirty = true;
            } else {
              break;
            }
          }

          // Lock delay: only counts down while the piece is actually resting.
          if (g.piece) {
            const resting = move(g.board, g.piece, 0, 1) === null;
            g.grounded = resting;
            if (resting) {
              g.lockAcc += dt;
              if (g.lockAcc >= LOCK_DELAY_MS) {
                lockCurrent(g);
                dirty = true;
              }
            } else {
              g.lockAcc = 0;
            }
          }
        }
      }

      if (dirty) render();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [apply, lockCurrent, nextPiece]);

  // ------------------------------------------------------------- keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (key === "p") {
        e.preventDefault();
        togglePause();
        return;
      }
      if (key === "r") {
        e.preventDefault();
        restart();
        return;
      }
      if (key === "enter" && game.current.status === "over") {
        e.preventDefault();
        restart();
        return;
      }

      const action = KEY_MAP[key];
      if (!action) return;

      // Arrows and space would otherwise scroll the page behind the modal.
      e.preventDefault();
      if (e.repeat) return; // repeat is driven by the loop, not the OS

      press(action);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const action = KEY_MAP[e.key.toLowerCase()];
      if (action) release(action);
    };

    // Alt-tabbing away shouldn't leave a key stuck down.
    const onBlur = () => held.current.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [onClose, press, release, restart, togglePause]);

  // Pause when the tab is hidden — otherwise a run dies while you're away.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && game.current.status === "running") {
        game.current.status = "paused";
        held.current.clear();
        render();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Freeze the page underneath. Lenis drives its own scroll, so stopping the
  // body alone isn't enough.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [lenis]);

  // ---------------------------------------------------------------- render
  const g = game.current;
  const best = Math.max(highScore.current, g.score);
  const isNewBest = g.status === "over" && g.score > g.bestAtStart && g.score > 0;
  const levelProgress = ((g.lines % LINES_PER_LEVEL) / LINES_PER_LEVEL) * 100;

  // Rebuilt on every render — which only happens when the loop marked the
  // frame dirty, so this is not the hot path it looks like.
  const grid = (() => {
    const cells: Array<{ id: PieceId | null; ghost: boolean; flash: boolean }> = [];
    const flashing = new Set(g.clearing?.rows ?? []);

    const ghostCells = new Set<number>();
    if (g.piece && !g.clearing && g.status === "running") {
      const ghost = ghostOf(g.board, g.piece);
      for (const [x, y] of cellsOf(ghost)) ghostCells.add(y * COLS + x);
    }

    const active = new Map<number, PieceId>();
    if (g.piece) {
      for (const [x, y] of cellsOf(g.piece)) active.set(y * COLS + x, g.piece.id);
    }

    for (let y = HIDDEN_ROWS; y < HIDDEN_ROWS + ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const index = y * COLS + x;
        cells.push({
          id: active.get(index) ?? g.board[index] ?? null,
          ghost: !active.has(index) && !g.board[index] && ghostCells.has(index),
          flash: flashing.has(y),
        });
      }
    }
    return cells;
  })();

  const board = (
    <div className="relative shrink-0" style={{ height: "100%" }}>
      <div
        className="relative h-full overflow-hidden rounded-lg ring-1 ring-white/10"
        style={{ aspectRatio: `${COLS} / ${ROWS}`, background: "#101010" }}
      >
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {grid.map((cell, i) => (
            <div
              key={i}
              className="relative"
              style={{ boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.035)" }}
            >
              {cell.id && !cell.flash && (
                <span
                  className="absolute inset-[0.5px] rounded-[2px]"
                  style={{
                    background: PIECE_COLORS[cell.id],
                    // A lit top-left and shaded bottom-right fakes a bevel
                    // without a second element per cell.
                    boxShadow:
                      "inset 1.5px 1.5px 0 rgba(255,255,255,0.32), inset -1.5px -1.5px 0 rgba(0,0,0,0.32)",
                  }}
                />
              )}
              {cell.flash && (
                <span className="absolute inset-0 bg-white/90" />
              )}
              {cell.ghost && (
                <span
                  className="absolute inset-[1.5px] rounded-[2px] border"
                  style={{
                    borderColor: "rgba(255,176,32,0.35)",
                    background: "rgba(255,176,32,0.05)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Top fade: pieces enter through it instead of popping in. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/50 to-transparent"
          aria-hidden
        />

        <AnimatePresence>
          {g.status !== "running" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/85 px-4 text-center backdrop-blur-[2px]"
            >
              {isNewBest && (
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-black"
                  style={{ background: ACCENT_BRIGHT }}
                >
                  New best
                </span>
              )}
              <p
                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: ACCENT_BRIGHT }}
              >
                {g.status === "over" ? "Game over" : "Paused"}
              </p>
              {g.status === "over" && (
                <div>
                  <p className="text-3xl font-semibold tabular-nums text-white">
                    {g.score.toLocaleString()}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-neutral-400">
                    {g.lines} lines · level {g.level}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={g.status === "over" ? restart : togglePause}
                className="rounded-lg px-4 py-2 text-xs font-medium text-black transition-transform hover:scale-[1.03]"
                style={{ background: ACCENT }}
              >
                {g.status === "over" ? "Play again" : "Resume"}
              </button>
              <p className="font-mono text-[10px] text-neutral-500">
                {g.status === "over" ? "ENTER / R" : "P"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Mobile status strip: hold + score + next, all in one line so the
          board keeps as much vertical room as possible. */}
      <div className="flex w-full items-stretch gap-2 lg:hidden">
        <Panel label="Hold" className="w-[86px] shrink-0">
          <PiecePreview id={g.hold} dim={!g.canHold} size={10} />
        </Panel>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 rounded-lg border border-line bg-canvas-2 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-mono text-xl tabular-nums leading-none"
              style={{ color: ACCENT }}
            >
              {g.score.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-faint">
                best {best.toLocaleString()}
              </span>
              <SoundToggle enabled={sound.current.enabled} onClick={toggleSound} />
            </div>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] text-subtle">
            <span>LV {g.level}</span>
            <span>{g.lines} lines</span>
          </div>
          <ProgressBar value={levelProgress} />
        </div>

        <Panel label="Next" className="w-[92px] shrink-0">
          <div className="flex items-center justify-center gap-2">
            {g.queue.slice(0, 2).map((id, i) => (
              <PiecePreview key={`${id}-${i}`} id={id} size={i === 0 ? 10 : 7} />
            ))}
          </div>
        </Panel>
      </div>

      <div className="flex items-stretch justify-center gap-3 lg:gap-5">
        {/* ------------------------------------------------ left rail (lg) */}
        <aside className="hidden w-[150px] flex-col gap-3 lg:flex">
          <Panel label="Hold">
            <div className="flex h-[68px] items-center justify-center">
              <PiecePreview id={g.hold} dim={!g.canHold} size={16} />
            </div>
          </Panel>

          <div className="rounded-lg border border-line bg-canvas-2 px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
              Score
            </p>
            <p
              className="font-mono text-2xl tabular-nums leading-tight"
              style={{ color: ACCENT }}
            >
              {g.score.toLocaleString()}
            </p>
            <p className="mt-1 font-mono text-[10px] text-faint">
              best {best.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border border-line bg-canvas-2 px-3 py-2.5">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                Level
              </p>
              <p className="font-mono text-sm tabular-nums text-strong">{g.level}</p>
            </div>
            <div className="mt-2">
              <ProgressBar value={levelProgress} />
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-faint">
              {g.lines} lines
            </p>
          </div>
        </aside>

        {/* The board is sized by height so it always fits the viewport; the
            aspect ratio then decides its width. */}
        <div className="h-[min(52vh,380px)] sm:h-[min(58vh,460px)] lg:h-[min(64vh,520px)]">
          {board}
        </div>

        {/* ----------------------------------------------- right rail (lg) */}
        <aside className="hidden w-[150px] flex-col gap-3 lg:flex">
          <Panel label="Next">
            <div className="flex flex-col items-center gap-3 py-1">
              {g.queue.slice(0, 3).map((id, i) => (
                // The upcoming piece is the one you plan around, so it is
                // drawn larger than the two behind it.
                <div
                  key={`${id}-${i}`}
                  className={cn(
                    "flex w-full items-center justify-center",
                    i === 0 ? "h-[68px]" : "h-[46px] opacity-70",
                  )}
                >
                  <PiecePreview id={id} size={i === 0 ? 16 : 12} />
                </div>
              ))}
            </div>
          </Panel>

          <div className="flex gap-2">
            <GhostButton onClick={togglePause}>
              {g.status === "paused" ? "Resume" : "Pause"}
            </GhostButton>
            <GhostButton onClick={restart}>Restart</GhostButton>
            <SoundToggle enabled={sound.current.enabled} onClick={toggleSound} />
          </div>

          <dl className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-1 font-mono text-[10px] leading-relaxed text-faint">
            <dt className="text-subtle">←→ / AD</dt>
            <dd>Move</dd>
            <dt className="text-subtle">↑ / W</dt>
            <dd>Rotate</dd>
            <dt className="text-subtle">Z / Q</dt>
            <dd>Rotate ↺</dd>
            <dt className="text-subtle">↓ / S</dt>
            <dd>Soft drop</dd>
            <dt className="text-subtle">Space</dt>
            <dd>Hard drop</dd>
            <dt className="text-subtle">C / ⇧</dt>
            <dd>Hold</dd>
            <dt className="text-subtle">P · R</dt>
            <dd>Pause · Restart</dd>
          </dl>
        </aside>
      </div>

      {/* -------------------------------------------- touch pad (mobile) */}
      <div className="grid w-full max-w-[420px] grid-cols-4 gap-2 lg:hidden">
        <TouchButton onPress={() => press("rotateCCW")} label="↺" hint="Rotate" />
        <TouchButton onPress={() => press("rotateCW")} label="↻" hint="Rotate" />
        <TouchButton onPress={() => press("hold")} label="⇄" hint="Hold" />
        <TouchButton
          onPress={togglePause}
          label={g.status === "paused" ? "▶" : "❚❚"}
          hint={g.status === "paused" ? "Resume" : "Pause"}
        />

        <TouchButton
          onPress={() => press("left")}
          onRelease={() => release("left")}
          label="←"
        />
        <TouchButton
          onPress={() => press("softDrop")}
          onRelease={() => release("softDrop")}
          label="↓"
        />
        <TouchButton
          onPress={() => press("right")}
          onRelease={() => release("right")}
          label="→"
        />
        <TouchButton onPress={() => press("hardDrop")} label="⤓" hint="Drop" accent />
      </div>
    </div>
  );
}

function Panel({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-canvas-2 px-2.5 py-2",
        className,
      )}
    >
      <p className="mb-1.5 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
        {label}
      </p>
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-line">
      <div
        className="h-full rounded-full transition-[width] duration-300"
        style={{ width: `${value}%`, background: ACCENT }}
      />
    </div>
  );
}

/** Draws a piece in its spawn orientation, trimmed of empty rows. */
function PiecePreview({
  id,
  dim,
  size,
}: {
  id: PieceId | null;
  dim?: boolean;
  size: number;
}) {
  if (!id) {
    return (
      <div
        className="flex items-center justify-center font-mono text-[10px] text-faint"
        style={{ height: size * 2 }}
      >
        —
      </div>
    );
  }

  const cells = cellsOf(spawn(id));
  const minX = Math.min(...cells.map(([x]) => x));
  const minY = Math.min(...cells.map(([, y]) => y));
  const width = Math.max(...cells.map(([x]) => x)) - minX + 1;
  const height = Math.max(...cells.map(([, y]) => y)) - minY + 1;

  return (
    <div
      className="mx-auto grid transition-opacity"
      style={{
        gridTemplateColumns: `repeat(${width}, ${size}px)`,
        gridTemplateRows: `repeat(${height}, ${size}px)`,
        opacity: dim ? 0.3 : 1,
      }}
    >
      {Array.from({ length: width * height }, (_, i) => {
        const x = minX + (i % width);
        const y = minY + Math.floor(i / width);
        const filled = cells.some(([cx, cy]) => cx === x && cy === y);
        return (
          <div key={i} style={{ padding: size >= 12 ? 1.5 : 0.5 }}>
            {filled && (
              <div
                className="h-full w-full rounded-[2px]"
                style={{
                  background: PIECE_COLORS[id],
                  boxShadow:
                    "inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.3)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function GhostButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 rounded-lg border border-line bg-canvas-2 px-2 py-1.5 text-[11px] text-dim transition-colors hover:border-line-hover hover:text-strong"
    >
      {children}
    </button>
  );
}

function SoundToggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={enabled ? "Mute sound" : "Unmute sound"}
      aria-pressed={enabled}
      className="shrink-0 rounded-lg border border-line bg-canvas-2 p-1.5 text-subtle transition-colors hover:border-line-hover hover:text-strong"
      style={enabled ? { color: ACCENT } : undefined}
    >
      {enabled ? (
        <IconVolume className="h-3.5 w-3.5" stroke={1.75} />
      ) : (
        <IconVolumeOff className="h-3.5 w-3.5" stroke={1.75} />
      )}
    </button>
  );
}

function TouchButton({
  onPress,
  onRelease,
  label,
  hint,
  accent,
}: {
  onPress: () => void;
  onRelease?: () => void;
  label: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      // Pointer events rather than click: the response lands on touch-down,
      // and holding a direction repeats through the game loop.
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        onPress();
      }}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "flex touch-none select-none flex-col items-center justify-center gap-0.5 rounded-xl border py-3 transition-colors active:scale-[0.97]",
        accent
          ? "border-transparent text-black"
          : "border-line bg-canvas-2 text-body active:border-line-hover",
      )}
      style={accent ? { background: ACCENT } : undefined}
      aria-label={hint ?? label}
    >
      <span className="text-base leading-none">{label}</span>
      {hint && (
        <span
          className={cn(
            "font-mono text-[8px] uppercase tracking-[0.15em]",
            accent ? "text-black/70" : "text-faint",
          )}
        >
          {hint}
        </span>
      )}
    </button>
  );
}
