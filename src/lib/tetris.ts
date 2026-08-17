/**
 * Tetris rules engine — pure, no React, no DOM.
 *
 * The board is a flat array of `TOTAL_ROWS * COLS`, indexed `y * COLS + x`,
 * with y growing downwards. The first `HIDDEN_ROWS` rows sit above the
 * visible field so a piece can spawn without overlapping the stack; the UI
 * only ever draws the rows below them.
 *
 * Rotation follows SRS (Super Rotation System) — the same offsets and wall
 * kicks players expect from a modern Tetris — so a piece can twist into a
 * gap next to a wall instead of silently refusing to turn.
 */

export const COLS = 10;
export const ROWS = 20;
export const HIDDEN_ROWS = 2;
export const TOTAL_ROWS = ROWS + HIDDEN_ROWS;

export type PieceId = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export const PIECE_IDS: PieceId[] = ["I", "J", "L", "O", "S", "T", "Z"];

/** A cell holds the id of the piece that filled it, so it keeps its colour. */
export type Board = (PieceId | null)[];

export type Piece = {
  id: PieceId;
  /** 0-3, clockwise from spawn. */
  rot: number;
  /** Column of the shape matrix's left edge. */
  x: number;
  /** Row of the shape matrix's top edge, counting from the hidden rows. */
  y: number;
};

/** Spawn orientations. Matrices are square so rotation is a transpose+flip. */
const SPAWN_SHAPES: Record<PieceId, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

function rotateCW(matrix: number[][]): number[][] {
  const n = matrix.length;
  return matrix.map((row, y) => row.map((_, x) => matrix[n - 1 - x][y]));
}

/** All four orientations of every piece, built once at module load. */
const ROTATIONS: Record<PieceId, number[][][]> = PIECE_IDS.reduce(
  (acc, id) => {
    const states = [SPAWN_SHAPES[id]];
    for (let i = 1; i < 4; i++) states.push(rotateCW(states[i - 1]));
    acc[id] = states;
    return acc;
  },
  {} as Record<PieceId, number[][][]>,
);

export function shapeOf(piece: Piece): number[][] {
  return ROTATIONS[piece.id][piece.rot];
}

/** Absolute board coordinates of the four filled cells. */
export function cellsOf(piece: Piece): Array<[number, number]> {
  const shape = shapeOf(piece);
  const out: Array<[number, number]> = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) out.push([piece.x + x, piece.y + y]);
    }
  }
  return out;
}

export function collides(board: Board, piece: Piece): boolean {
  for (const [x, y] of cellsOf(piece)) {
    if (x < 0 || x >= COLS || y >= TOTAL_ROWS) return true;
    // Above the ceiling is legal — that is where pieces spawn.
    if (y < 0) continue;
    if (board[y * COLS + x]) return true;
  }
  return false;
}

/**
 * SRS wall kicks. Offsets are in SRS's y-up convention; `tryRotate` flips
 * the sign when applying them to our y-down board.
 */
const KICKS_JLSTZ: Record<string, Array<[number, number]>> = {
  "01": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "10": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "12": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "21": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  "23": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  "32": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "30": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  "03": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
};

const KICKS_I: Record<string, Array<[number, number]>> = {
  "01": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  "10": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  "12": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  "21": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  "23": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  "32": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  "30": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  "03": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
};

/** Returns the rotated piece, or null when every kick is blocked. */
export function tryRotate(board: Board, piece: Piece, dir: 1 | -1): Piece | null {
  // O is rotationally symmetric — turning it would only shuffle its cells.
  if (piece.id === "O") return piece;

  const from = piece.rot;
  const to = (from + dir + 4) % 4;
  const table = piece.id === "I" ? KICKS_I : KICKS_JLSTZ;
  const kicks = table[`${from}${to}`] ?? [[0, 0]];

  for (const [dx, dy] of kicks) {
    const candidate: Piece = {
      ...piece,
      rot: to,
      x: piece.x + dx,
      y: piece.y - dy,
    };
    if (!collides(board, candidate)) return candidate;
  }
  return null;
}

/** Returns the moved piece, or null when the move is blocked. */
export function move(board: Board, piece: Piece, dx: number, dy: number): Piece | null {
  const candidate: Piece = { ...piece, x: piece.x + dx, y: piece.y + dy };
  return collides(board, candidate) ? null : candidate;
}

/** How many rows the piece can fall before it lands. */
export function dropDistance(board: Board, piece: Piece): number {
  let distance = 0;
  while (!collides(board, { ...piece, y: piece.y + distance + 1 })) distance++;
  return distance;
}

/** The landing position, used to draw the ghost outline. */
export function ghostOf(board: Board, piece: Piece): Piece {
  return { ...piece, y: piece.y + dropDistance(board, piece) };
}

export function emptyBoard(): Board {
  return new Array(TOTAL_ROWS * COLS).fill(null);
}

/** Stamps the piece into a copy of the board. */
export function lockPiece(board: Board, piece: Piece): Board {
  const next = board.slice();
  for (const [x, y] of cellsOf(piece)) {
    if (y >= 0 && y < TOTAL_ROWS && x >= 0 && x < COLS) next[y * COLS + x] = piece.id;
  }
  return next;
}

export function fullRows(board: Board): number[] {
  const rows: number[] = [];
  for (let y = 0; y < TOTAL_ROWS; y++) {
    let full = true;
    for (let x = 0; x < COLS; x++) {
      if (!board[y * COLS + x]) {
        full = false;
        break;
      }
    }
    if (full) rows.push(y);
  }
  return rows;
}

/** Drops everything above each cleared row down by one. */
export function clearRows(board: Board, rows: number[]): Board {
  if (rows.length === 0) return board;
  const doomed = new Set(rows);
  const kept: Array<PieceId | null>[] = [];

  for (let y = 0; y < TOTAL_ROWS; y++) {
    if (doomed.has(y)) continue;
    kept.push(board.slice(y * COLS, y * COLS + COLS));
  }
  while (kept.length < TOTAL_ROWS) {
    kept.unshift(new Array(COLS).fill(null));
  }
  return kept.flat();
}

/**
 * 7-bag randomiser: every piece appears once per bag, so droughts are
 * bounded — the reason modern Tetris feels fair where the original didn't.
 */
export function newBag(): PieceId[] {
  const bag = PIECE_IDS.slice();
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

export function spawn(id: PieceId): Piece {
  // Centre the shape matrix: 4-wide I and 2-wide O need their own offsets.
  const x = id === "O" ? 4 : 3;
  // y=1 leaves the piece's top row hidden and its bottom row on the first
  // visible line, so a new piece is immediately readable instead of falling
  // in out of nowhere.
  return { id, rot: 0, x, y: 1 };
}

/** Guideline scoring, multiplied by the current level. */
export const LINE_SCORES = [0, 100, 300, 500, 800];

export const LINES_PER_LEVEL = 10;

export function levelFor(lines: number): number {
  return Math.floor(lines / LINES_PER_LEVEL) + 1;
}

/** Milliseconds per gravity step. Floors at 60ms so it stays playable. */
export function gravityMs(level: number): number {
  return Math.max(60, 800 - (level - 1) * 70);
}
