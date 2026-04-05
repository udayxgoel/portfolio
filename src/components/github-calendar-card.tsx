"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface GitHubCalendarCardProps {
  username: string;
}

export function GitHubCalendarCard({ username }: GitHubCalendarCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const currentYear = new Date().getFullYear();
  const yearStart = new Date(currentYear, 0, 1);
  const yearEnd = new Date(currentYear, 11, 31);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="github-calendar-wrap w-full overflow-x-hidden overflow-y-hidden pb-1">
        <p className="text-sm text-muted-foreground">
          Loading contributions...
        </p>
      </div>
    );
  }

  return (
    <div className="github-calendar-wrap w-full overflow-x-hidden overflow-y-hidden pb-1">
      <GitHubCalendar
        username={username}
        year={currentYear}
        showWeekdayLabels
        transformData={(contributions) =>
          contributions.filter((day) => {
            const contributionDate = new Date(day.date);
            return contributionDate >= yearStart && contributionDate <= yearEnd;
          })
        }
        blockSize={14}
        blockMargin={4}
        fontSize={14}
        labels={{
          totalCount: "This year, I achieved {{count}} contributions",
        }}
        theme={{
          light: ["#1f2937", "#14532d", "#166534", "#15803d", "#22c55e"],
          dark: ["#1f2937", "#14532d", "#166534", "#15803d", "#22c55e"],
        }}
      />
    </div>
  );
}
