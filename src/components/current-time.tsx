"use client";

import { useEffect, useState } from "react";

export function CurrentTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return <time>{time}</time>;
}
