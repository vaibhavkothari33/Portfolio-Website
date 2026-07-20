import { cn } from "@/lib/utils";

type NoiseOverlayProps = {
  className?: string;
};

export function NoiseOverlay({ className }: NoiseOverlayProps) {
  // grain strength is per-theme so lighter themes can carry a stronger grain
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed -left-1/2 -top-1/2 z-[9999] h-[200vh] w-[200vw] animate-grain bg-[url('/noise.png')] bg-repeat",
        className,
      )}
      style={{ opacity: "var(--noise-opacity)" }}
    />
  );
}
