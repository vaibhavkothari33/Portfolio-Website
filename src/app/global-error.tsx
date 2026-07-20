"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // NOTE: deliberately NOT migrated to theme tokens. global-error renders its
  // own <html>/<body>, replacing the root layout entirely, so ThemeProvider
  // never mounts and no theme class is on <html>. The `--canvas`/`--text-*`
  // custom properties would be undefined here and the page would render
  // unstyled. Hardcoded dark colours are the safe fallback.
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-white">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="max-w-md text-center text-sm text-neutral-400">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
