"use client";

import { useId, useRef, useState, type ReactNode } from "react";

// Switches between the branches' opening hours. The panels are rendered on the
// server and passed in as props, so nothing but the toggle is client side.
// Follows the tabs keyboard contract: arrow keys move between tabs, Home and
// End jump to the ends, and only the selected tab is in the tab order.

export interface BranchTab {
  id: string;
  label: string;
  panel: ReactNode;
}

export function BranchTabs({ tabs }: { tabs: BranchTab[] }) {
  const base = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) {
      return;
    }
    event.preventDefault();
    select(next);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Opening hours by branch"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 rounded-button bg-surface-raised p-1.5 sm:inline-flex"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`grow cursor-pointer rounded-button px-5 py-2.5 type-button transition-[background-color,color] ease-brand sm:grow-0 ${
                selected
                  ? "bg-accent text-on-accent"
                  : "text-ink-muted hover:bg-accent-tint hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Only the selected panel is rendered, rather than the others being */}
      {/* hidden. Mounting it afresh is what replays the bars drawing, which is */}
      {/* the whole point of switching, and a hidden panel cannot animate anyway. */}
      <div
        key={tabs[active].id}
        role="tabpanel"
        id={`${base}-panel-${tabs[active].id}`}
        aria-labelledby={`${base}-tab-${tabs[active].id}`}
        tabIndex={0}
        className="mt-10"
      >
        {tabs[active].panel}
      </div>
    </div>
  );
}
