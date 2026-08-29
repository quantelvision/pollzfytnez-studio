"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

// A themed dropdown, since a native select cannot be styled to match. It keeps
// the native keyboard contract: Enter, Space, Up, Down, Home, End and Escape,
// with the chosen value mirrored into a hidden input so the form still posts
// the same field.
export function Select({
  name,
  options,
  defaultValue,
  labelledBy,
}: {
  name: string;
  options: SelectOption[];
  defaultValue: string;
  labelledBy: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const choose = (index: number) => {
    setValue(options[index].value);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (event.key === "Enter" || event.key === " " || event.key === "ArrowDown")) {
      event.preventDefault();
      setActive(options.findIndex((option) => option.value === value));
      setOpen(true);
      return;
    }
    if (!open) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(active);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelledBy}
        onClick={() => {
          setActive(options.findIndex((option) => option.value === value));
          setOpen((current) => !current);
        }}
        onKeyDown={onKeyDown}
        className="flex w-full items-center justify-between gap-3 rounded-input border border-border bg-surface-raised px-4 py-3 text-left type-body text-ink transition-[border-color] ease-brand hover:border-border-strong"
      >
        {selected.label}
        <ChevronDown
          aria-hidden="true"
          className={`size-5 shrink-0 text-ink-muted transition-transform ease-brand ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          tabIndex={-1}
          className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-card border border-border bg-surface-raised py-2"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(index)}
                  onMouseEnter={() => setActive(index)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left type-body transition-colors ease-brand ${
                    index === active ? "bg-accent-tint text-accent" : "text-ink"
                  }`}
                >
                  {option.label}
                  {isSelected ? <Check aria-hidden="true" className="size-4 shrink-0" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
