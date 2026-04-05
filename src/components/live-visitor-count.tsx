"use client";

import { useEffect, useMemo, useState } from "react";

type LiveVisitorCountProps = {
  namespace: string;
  keyName: string;
  displayMode?: "ordinal" | "views";
  className?: string;
};

function toOrdinal(value: number): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return `${value}th`;
  }

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export function LiveVisitorCount({
  namespace,
  keyName,
  displayMode = "ordinal",
  className,
}: LiveVisitorCountProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const updateFromResponse = (value: unknown) => {
      if (!cancelled && typeof value === "number") {
        setCount(value);
        setIsUnavailable(false);
      }
    };

    const incrementCount = async () => {
      try {
        const response = await fetch(
          `/api/visitor-count?namespace=${encodeURIComponent(namespace)}&keyName=${encodeURIComponent(keyName)}`,
          {
            method: "POST",
            cache: "no-store",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to increment visitor count");
        }
        const data = (await response.json()) as { count?: number };
        updateFromResponse(data.count);
      } catch {
        if (!cancelled) {
          setIsUnavailable(true);
        }
      }
    };

    const refreshCount = async () => {
      try {
        const response = await fetch("/api/visitor-count", {
          cache: "no-store",
        });
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { count?: number };
        updateFromResponse(data.count);
      } catch {
        // Silent fail: keep last known value.
      }
    };

    incrementCount();
    const intervalId = window.setInterval(refreshCount, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [namespace, keyName]);

  const label = useMemo(() => {
    if (count === null && !isUnavailable) {
      return displayMode === "views"
        ? "Views #..."
        : "Checking live visitors...";
    }

    if (count === null || isUnavailable) {
      return displayMode === "views"
        ? "Views #..."
        : "Live visitor counter is unavailable right now.";
    }

    return displayMode === "views"
      ? `Views #${count}`
      : `You are the ${toOrdinal(count)} visitor.`;
  }, [count, displayMode, isUnavailable]);

  return (
    <p
      className={className ?? "text-sm text-zinc-300 tabular-nums sm:text-base"}
    >
      {label}
    </p>
  );
}
