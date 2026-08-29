"use client";

import { useEffect, useState } from "react";
import { openStateAt, type DaySchedule, type OpenState } from "@/lib/hours";

// Reads like the sign on the studio door rather than a status dot: the word
// carries the meaning, and the rule underneath shows how far through today's
// opening window we are, with the day's times at either end of it.
// The server supplies the first value so nothing shifts or pops in, then the
// client keeps it current.
export function HeroOpenStatus({
  schedule,
  initial,
}: {
  schedule: DaySchedule[];
  initial: OpenState;
}) {
  const [state, setState] = useState(initial);

  useEffect(() => {
    const tick = () => setState(openStateAt(new Date(), schedule));
    tick();
    const timer = setInterval(tick, 60000);
    return () => clearInterval(timer);
  }, [schedule]);

  return (
    <p className="flex flex-col gap-2.5">
      <span className="type-h3 text-surface">{state.open ? "Open now" : "Closed"}</span>

      <span aria-hidden="true" className="flex items-center gap-2">
        <span className="type-small text-surface/60">{state.opens}</span>
        <span className="relative h-1 w-32 overflow-hidden rounded-button bg-surface/30">
          <span
            className={`absolute inset-y-0 left-0 rounded-button ${
              state.open ? "bg-surface" : "bg-surface/45"
            }`}
            style={{ width: `${Math.round(state.progress * 100)}%` }}
          />
        </span>
        <span className="type-small text-surface/60">{state.closes}</span>
      </span>
    </p>
  );
}
