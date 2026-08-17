/**
 * Tetris sound effects, synthesised with the Web Audio API.
 *
 * No audio files: every cue is a short oscillator blip with an envelope, so
 * this adds nothing to the bundle, nothing to fetch, and never blocks the
 * game on a network request. The AudioContext is created lazily on the first
 * sound — by then a key or tap has already happened, which is what browser
 * autoplay policy requires.
 */

export type SoundName =
  | "move"
  | "softDrop"
  | "rotate"
  | "hold"
  | "lock"
  | "hardDrop"
  | "clear"
  | "tetris"
  | "levelUp"
  | "gameOver"
  | "pause";

export const SOUND_KEY = "vk-tetris-sound";

/**
 * Master level. Quiet enough to sit under someone's music, loud enough that
 * the short movement ticks actually register — the first pass at 0.07 made
 * anything under ~50ms inaudible on laptop speakers.
 */
const MASTER_GAIN = 0.16;

/**
 * Minimum gap between two plays of the same cue. Held left/right repeats
 * every 45ms, and stacking that many oscillators turns the tick into a buzz.
 */
const THROTTLE_MS = 28;

type Blip = {
  freq: number;
  /** Seconds from now. */
  at?: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
  /** Glide to this frequency over the blip's duration. */
  slideTo?: number;
};

const RECIPES: Record<SoundName, Blip[]> = {
  // Pitched high and given a little length: a short low tick reads as
  // silence on small speakers.
  move: [{ freq: 380, duration: 0.055, type: "square", gain: 0.85 }],
  // The one cue that fires on repeat while a key is held, so it stays the
  // quietest and shortest of the set.
  softDrop: [{ freq: 200, duration: 0.03, type: "square", gain: 0.4 }],
  rotate: [{ freq: 520, duration: 0.07, type: "triangle", gain: 1, slideTo: 620 }],
  hold: [{ freq: 460, duration: 0.09, type: "triangle", slideTo: 700 }],
  lock: [{ freq: 190, duration: 0.09, type: "square", gain: 0.9, slideTo: 90 }],
  hardDrop: [{ freq: 420, duration: 0.12, type: "sawtooth", slideTo: 70 }],
  clear: [
    { freq: 523, duration: 0.07, type: "triangle" },
    { freq: 659, duration: 0.07, type: "triangle", at: 0.06 },
    { freq: 784, duration: 0.1, type: "triangle", at: 0.12 },
  ],
  // Four lines at once earns a longer, brighter arpeggio.
  tetris: [
    { freq: 523, duration: 0.07, type: "square", gain: 0.8 },
    { freq: 659, duration: 0.07, type: "square", gain: 0.8, at: 0.06 },
    { freq: 784, duration: 0.07, type: "square", gain: 0.8, at: 0.12 },
    { freq: 1047, duration: 0.16, type: "square", gain: 0.9, at: 0.18 },
  ],
  levelUp: [
    { freq: 392, duration: 0.08, type: "triangle" },
    { freq: 587, duration: 0.08, type: "triangle", at: 0.08 },
    { freq: 784, duration: 0.14, type: "triangle", at: 0.16 },
  ],
  gameOver: [
    { freq: 392, duration: 0.16, type: "sawtooth", gain: 0.7 },
    { freq: 294, duration: 0.16, type: "sawtooth", gain: 0.7, at: 0.15 },
    { freq: 180, duration: 0.4, type: "sawtooth", gain: 0.7, at: 0.3, slideTo: 90 },
  ],
  pause: [{ freq: 300, duration: 0.06, type: "sine", slideTo: 200 }],
};

export class SoundKit {
  enabled: boolean;

  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private lastPlayed = new Map<SoundName, number>();

  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  /** Creates the context on demand; returns null where audio isn't available. */
  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const legacy = window as Window & { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? legacy.webkitAudioContext;
      if (!Ctor) return null;

      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = MASTER_GAIN;
      this.master.connect(this.ctx.destination);
    }

    // Safari suspends the context until a gesture, and again on tab switch.
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  play(name: SoundName) {
    if (!this.enabled) return;

    const ctx = this.ensure();
    if (!ctx || !this.master) return;

    const now = ctx.currentTime;
    const previous = this.lastPlayed.get(name);
    if (previous !== undefined && now - previous < THROTTLE_MS / 1000) return;
    this.lastPlayed.set(name, now);

    for (const blip of RECIPES[name]) {
      const start = now + (blip.at ?? 0);
      const duration = blip.duration ?? 0.06;
      const peak = blip.gain ?? 1;

      const osc = ctx.createOscillator();
      osc.type = blip.type ?? "square";
      osc.frequency.setValueAtTime(blip.freq, start);
      if (blip.slideTo !== undefined) {
        osc.frequency.exponentialRampToValueAtTime(blip.slideTo, start + duration);
      }

      // Tiny attack, exponential release — a hard stop would click.
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, start);
      env.gain.exponentialRampToValueAtTime(peak, start + 0.006);
      env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(env).connect(this.master);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    }
  }

  dispose() {
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
  }
}
