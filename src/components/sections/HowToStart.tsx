import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// A single connected track rather than three detached columns. The numbered
// nodes sit on one rule, which runs horizontally on wide screens and vertically
// on narrow ones, so the sequence is carried by the line instead of by arrows.
export function HowToStart() {
  return (
    <Section id="start" className="bg-accent-tint">
      <div className="stagger max-w-2xl">
        <p className="reveal type-eyebrow text-accent">Getting started</p>
        <h2 className="reveal mt-4 type-h2 text-ink">How to start</h2>
      </div>

      {/* The step index set on each item is inherited by the track, the node and */}
      {/* the copy inside it, so a step's whole cluster follows the one before it. */}
      <ol className="stagger mt-14 grid gap-y-10 sm:grid-cols-3 sm:gap-x-8">
        {site.steps.map((step, index) => (
          <li key={step.id} className="relative flex gap-5 sm:block">
            {index < site.steps.length - 1 ? (
              <>
                <div
                  aria-hidden="true"
                  className="reveal-wipe-x absolute top-6 left-6 hidden h-0.5 w-full bg-border-strong sm:block"
                />
                <div
                  aria-hidden="true"
                  className="reveal-wipe-y absolute top-12 left-6 h-full w-0.5 bg-border-strong sm:hidden"
                />
              </>
            ) : null}

            <span className="reveal-land reveal-late relative z-10 flex size-12 shrink-0 items-center justify-center rounded-button border-2 border-accent bg-surface type-h3 text-accent">
              {index + 1}
            </span>

            <div className="reveal reveal-late pb-2 sm:mt-6 sm:pb-0">
              <h3 className="type-h3 text-ink">{step.title}</h3>
              <p className="mt-2 max-w-xs type-body text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
