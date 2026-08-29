"use client";

import { useEffect, useState } from "react";
import type { DaySchedule } from "@/lib/hours";

// Live open or closed badge for the studio's own timezone, so a visitor abroad
// still sees Chennai time. It renders nothing until after mount: the server has
// no reliable clock for the viewer, and a guessed value would hydrate wrong.
export function OpenStatus({ schedule }: { schedule: DaySchedule[] }) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());

      const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
      const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
      const now = hour * 60 + minute;

      const today = schedule.find((day) => day.day === weekday);
      if (!today) {
        setStatus(null);
        return;
      }

      if (now >= today.openMinutes && now < today.closeMinutes) {
        setStatus({ open: true, label: `Open now until ${today.closes}` });
      } else if (now < today.openMinutes) {
        setStatus({ open: false, label: `Opens at ${today.opens}` });
      } else {
        const index = schedule.findIndex((day) => day.day === weekday);
        const next = schedule[(index + 1) % schedule.length];
        setStatus({ open: false, label: `Closed, opens ${next.short} at ${next.opens}` });
      }
    };

    compute();
    const timer = setInterval(compute, 60000);
    return () => clearInterval(timer);
  }, [schedule]);

  if (!status) {
    return null;
  }

  return (
    <p className="inline-flex items-center gap-2.5 rounded-button bg-surface-raised px-4 py-2 type-small text-ink">
      <span
        aria-hidden="true"
        className={`size-2.5 rounded-button ${status.open ? "bg-accent" : "bg-secondary"}`}
      />
      {status.label}
    </p>
  );
}
