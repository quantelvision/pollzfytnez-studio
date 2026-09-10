"use client";

import { useEffect, useState } from "react";
import { openStateAt, type DaySchedule } from "@/lib/hours";

// Live open or closed badge for one branch, in the gym's own timezone, so a
// visitor abroad still sees Chennai time. It renders nothing until after mount:
// the server has no reliable clock for the viewer, and a guessed value would
// hydrate wrong.
export function OpenStatus({ schedule }: { schedule: DaySchedule[] }) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const compute = () => {
      const state = openStateAt(new Date(), schedule);
      setStatus({
        open: state.open,
        label: state.open ? `Open now until ${state.closes}` : `Closed. ${state.detail}`,
      });
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
