import { Activity } from "lucide-react";
import Link from "next/link";
import { getGitHubContributions } from "@/lib/github-contributions";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "vaibhavkothari33";

const LEVEL_CLASSES = [
  "bg-[#161b22]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

function ContributionGrid({
  weeks,
  totalContributions,
}: {
  weeks: NonNullable<Awaited<ReturnType<typeof getGitHubContributions>>>["weeks"];
  totalContributions: number;
}) {
  const columnTemplate = {
    gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
  };

  return (
    <>
      <div className="w-full pb-2">
        <div className="mb-2 grid w-full gap-[3px]" style={columnTemplate}>
          {weeks.map((week, weekIndex) => (
            <div
              key={`month-${weekIndex}`}
              className="min-w-0 text-[10px] leading-none text-subtle"
            >
              {week.monthLabel ? <span>{week.monthLabel}</span> : null}
            </div>
          ))}
        </div>

        <div className="grid w-full gap-[3px]" style={columnTemplate}>
          {weeks.map((week, weekIndex) => (
            <div
              key={`week-${weekIndex}`}
              className="flex min-w-0 flex-col gap-[3px]"
            >
              {week.days.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={cn(
                    "aspect-square w-full rounded-[2px]",
                    LEVEL_CLASSES[day.level],
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
        <div className="flex items-center gap-2 font-mono">
          <span>Less</span>
          <div className="flex gap-[3px]">
            {LEVEL_CLASSES.map((levelClass, index) => (
              <div
                key={index}
                className={cn("h-[11px] w-[11px] rounded-[2px]", levelClass)}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </>
  );
}

export default async function GitHubActivitySection() {
  const data = await getGitHubContributions(GITHUB_USERNAME);

  return (
    <section
      id="activity"
      className="border-t border-line bg-canvas px-4 py-16 md:px-10"
      aria-labelledby="activity-heading"
    >
      <div className="mx-auto max-w-5xl rounded-xl border border-line bg-canvas/80 p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-strong" strokeWidth={1.75} />
            <h2
              id="activity-heading"
              className="text-xl font-semibold tracking-tight text-strong md:text-2xl"
            >
              Activity
            </h2>
          </div>
          {/* <p className="font-mono text-xs text-neutral-600 sm:text-sm">
            {`// FETCH_COMMITS({ USER: "VAIBHAV" })`}
          </p> */}
        </div>

        {data ? (
          <ContributionGrid
            weeks={data.weeks}
            totalContributions={data.totalContributions}
          />
        ) : (
          <div className="rounded-lg border border-dashed border-line px-4 py-10 text-center">
            <p className="text-sm text-dim">
              Couldn&apos;t load contribution graph right now.
            </p>
            <Link
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-[#39d353] transition-colors hover:text-[#26a641]"
            >
              View profile on GitHub →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
