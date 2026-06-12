import { cn } from "@/lib/utils";

type NoiseOverlayProps = {
  className?: string;
};

export function NoiseOverlay({ className }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed -left-1/2 -top-1/2 z-[9999] h-[200vh] w-[200vw] animate-grain bg-[url('/noise.png')] bg-repeat",
        className,
      )}
      style={{ opacity: 0.04 }}
    />
  );
}
