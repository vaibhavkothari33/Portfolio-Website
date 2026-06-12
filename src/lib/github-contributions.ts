export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
  monthLabel: string | null;
};

export type GitHubContributions = {
  weeks: ContributionWeek[];
  totalContributions: number;
};

type ApiContribution = {
  date: string;
  count: number;
  level: number;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildWeeks(contributions: ApiContribution[]): ContributionWeek[] {
  const todayKey = getTodayKey();
  const filtered = contributions.filter((day) => day.date <= todayKey);
  if (filtered.length === 0) return [];

  const byDate = new Map(
    filtered.map((day) => [
      day.date,
      {
        date: day.date,
        count: day.count,
        level: Math.min(4, Math.max(0, day.level)) as ContributionDay["level"],
      },
    ]),
  );

  const sortedDates = [...filtered.map((day) => day.date)].sort();
  const rangeStart = new Date(`${sortedDates[0]}T12:00:00`);
  const today = new Date(`${todayKey}T12:00:00`);

  const cursor = new Date(rangeStart);
  cursor.setDate(cursor.getDate() - cursor.getDay());

  const weeks: ContributionWeek[] = [];
  let lastMonth: number | null = null;

  while (cursor.getTime() <= today.getTime()) {
    const days: ContributionDay[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      if (cursor.getTime() > today.getTime()) break;

      const key = toLocalDateKey(cursor);
      days.push(
        byDate.get(key) ?? {
          date: key,
          count: 0,
          level: 0,
        },
      );
      cursor.setDate(cursor.getDate() + 1);
    }

    if (days.length === 0) break;

    const weekStart = new Date(`${days[0].date}T12:00:00`);
    const month = weekStart.getMonth();
    const monthLabel = month !== lastMonth ? MONTHS[month] : null;
    lastMonth = month;

    weeks.push({ days, monthLabel });
  }

  return weeks;
}

export async function getGitHubContributions(
  username: string,
): Promise<GitHubContributions | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(12_000),
      },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      contributions?: ApiContribution[];
    };

    const todayKey = getTodayKey();
    const contributions = (data.contributions ?? []).filter(
      (day) => day.date <= todayKey,
    );
    if (contributions.length === 0) return null;

    const totalContributions = contributions.reduce(
      (sum, day) => sum + day.count,
      0,
    );

    return {
      weeks: buildWeeks(contributions),
      totalContributions,
    };
  } catch {
    return null;
  }
}
