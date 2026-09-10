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
      {/* A segmented control: equal columns at every width, so two long branch */}
      {/* names can never wrap the control onto a second row the way a flex-wrap */}
      {/* row did on a phone. The grid is built from the number of branches */}
      {/* rather than hard coded to two. */}
      <div
        role="tablist"
        aria-label="Opening hours by branch"
        onKeyDown={onKeyDown}
        className="relative grid rounded-button bg-surface-raised p-1.5 sm:max-w-lg"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {/* The selected fill is one element that slides, rather than a */}
        {/* background switching off one button and on to another. That is what */}
        {/* makes the change read as a movement instead of a flicker. It sits */}
        {/* under the labels, so it is hidden and the buttons carry the state. */}
        <span
          aria-hidden="true"
          className="branch-tab-indicator absolute inset-y-1.5 left-1.5 rounded-button bg-accent"
          style={{
            // The control's own padding is p-1.5, which is one and a half
            // spacing units a side and so three across. Subtracting it is what
            // makes the fill exactly one segment wide, which in turn makes a
            // translate of 100 percent land it exactly on the next one.
            width: `calc((100% - (var(--t-spacing-unit) * 3)) / ${tabs.length})`,
            transform: `translateX(${active * 100}%)`,
          }}
        />

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
              className={`relative z-10 cursor-pointer rounded-button px-3 py-2.5 text-center type-button transition-colors ease-brand sm:px-5 ${
                selected ? "text-on-accent" : "text-ink-muted hover:text-accent"
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
        className="panel-swap mt-10"
      >
        {tabs[active].panel}
      </div>
    </div>
  );
}
