import { Activity } from "lucide-react";
import { GITHUB_CONTRIBUTIONS_LOADING_GIF } from "@/lib/github-contributions";

export function GitHubActivityLoading() {
  return (
    <section
      id="activity"
      className="border-t border-line bg-canvas px-4 py-16 md:px-10"
      aria-labelledby="activity-heading"
      aria-busy="true"
    >
      <div className="mx-auto max-w-5xl rounded-xl border border-line bg-canvas/80 p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
          <Activity className="h-5 w-5 text-strong" strokeWidth={1.75} />
          <h2
            id="activity-heading"
            className="text-xl font-semibold tracking-tight text-strong md:text-2xl"
          >
            Activity
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GITHUB_CONTRIBUTIONS_LOADING_GIF}
            alt="Loading GitHub contributions"
            className="h-16 w-16"
          />
          <p className="mt-4 font-mono text-sm text-subtle">
            Fetching commits...
          </p>
        </div>
      </div>
    </section>
  );
}
