import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-stone-50 dark:bg-neutral-950 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full animate-spin">
          {/* Inner circle - blue gradient */}
          <div className="absolute top-0 right-0 w-4 h-4 -mt-1 -mr-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
        </div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    </div>
  );
} 