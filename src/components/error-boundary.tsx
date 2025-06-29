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
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Something went wrong!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="pt-4">
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 