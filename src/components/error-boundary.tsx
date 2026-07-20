'use client';

import React from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-strong">
            Something went wrong!
          </h1>
          <p className="text-lg text-dim">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="pt-4">
            {/* no blue token exists; this is the page's only CTA, so it takes
                the brand role each theme defines */}
            <button
              onClick={reset}
              className="px-6 py-3 bg-invert hover:bg-invert-hover text-invert-fg rounded-lg transition-colors duration-200 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 