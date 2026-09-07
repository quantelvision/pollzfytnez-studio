import { Motif } from "@/components/motif/Motif";
import { Section } from "@/components/ui/Section";
import { site, type HoursSlot } from "@/config/site";
import { branchSchedule, chartRange, type DaySchedule } from "@/lib/hours";
import { BranchTabs } from "./BranchTabs";
import { OpenStatus } from "./OpenStatus";

function label(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${suffix}`;
}

// One branch's week. On a phone the chart is dropped entirely: between a day
// label and a column of times there is no width left for a bar, and a squeezed
// bar says less than the words do. Narrow screens get the grouped hours, which
// is two lines rather than seven. The chart returns when there is room for it.
// Both are marked decorative and the table underneath carries the hours for
// screen readers, so the same thing is never announced twice.
function WeekPanel({
  slots,
  schedule,
  start,
  span,
  ticks,
}: {
  slots: readonly HoursSlot[];
  schedule: DaySchedule[];
  start: number;
  span: number;
  ticks: number[];
}) {
  return (
    <div>
      <div className="mb-6">
        <OpenStatus schedule={schedule} />
      </div>

      <div aria-hidden="true">
        <dl className="stagger sm:hidden">
          {slots.map((slot) => (
            <div
              key={slot.label}
              className="reveal flex items-baseline justify-between gap-4 border-t border-border-strong py-4 last:border-b"
            >
              <dt className="type-body text-ink-muted">{slot.label}</dt>
              <dd
                className={`text-right type-h3 ${slot.closed ? "text-ink-muted" : "text-ink"}`}
              >
                {slot.closed ? "Closed" : `${slot.opens} to ${slot.closes}`}
              </dd>
            </div>
          ))}
        </dl>

        <div className="hidden sm:block">
          <div className="relative mb-2 h-5">
            {ticks.map((tick, index) => {
              const edge =
                index === 0
                  ? "translate-x-0"
                  : index === ticks.length - 1
                    ? "-translate-x-full"
                    : "-translate-x-1/2";
              return (
                <span
                  key={tick}
                  className={`absolute whitespace-nowrap type-small text-ink-muted ${edge}`}
                  style={{ left: `${((tick - start) / span) * 100}%` }}
                >
                  {label(tick)}
                </span>
              );
            })}
          </div>

          <div className="stagger">
            {schedule.map((day) => (
              <div key={day.day} className="flex items-center gap-4 py-1.5">
                <span className="w-9 shrink-0 type-small text-ink-muted">{day.short}</span>
                <div className="relative h-7 flex-1 overflow-hidden rounded-button bg-surface-raised">
                  {day.closed ? null : (
                    <div
                      className="bar-draw absolute inset-y-0 rounded-button bg-accent"
                      style={{
                        left: `${((day.openMinutes - start) / span) * 100}%`,
                        width: `${((day.closeMinutes - day.openMinutes) / span) * 100}%`,
                      }}
                    />
                  )}
                </div>
                <span className="w-36 shrink-0 text-right whitespace-nowrap type-small text-ink">
                  {day.closed ? "Closed" : `${day.opens} to ${day.closes}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <table className="sr-only">
        <caption>Opening hours</caption>
        <tbody>
          {schedule.map((day) => (
            <tr key={day.day}>
              <th scope="row">{day.day}</th>
              <td>{day.closed ? "Closed" : `${day.opens} to ${day.closes}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The two branches keep different hours, so one is picked at a time rather than
// both charts competing for the same glance. Every branch's hours are also
// written out in full on its card in the locations section, so nothing is only
// reachable through a tab.
export function OpenHours() {
  const schedules = site.branches.map((branch) => branchSchedule(branch));
  const { start, end } = chartRange(schedules);
  const span = end - start;
  const ticks: number[] = [];
  for (let minute = start; minute <= end; minute += 180) {
    ticks.push(minute);
  }

  const tabs = site.branches.map((branch, index) => ({
    id: branch.id,
    label: branch.name,
    panel: (
      <WeekPanel
        slots={branch.hours}
        schedule={schedules[index]}
        start={start}
        span={span}
        ticks={ticks}
      />
    ),
  }));

  return (
    <Section id="hours" className="bg-accent-tint">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="stagger lg:col-span-4">
          <p className="reveal type-eyebrow text-accent">Opening hours</p>
          <h2 className="reveal mt-4 type-h2 text-ink">When you can come</h2>
          <Motif id="clock-five" className="reveal-land mt-6 w-12 text-secondary" />
          <p className="reveal mt-6 max-w-sm type-body text-ink-muted">
            Both branches open at 5:00 AM on weekdays, so a full session fits in before work. They
            differ at the end of the day and on Sunday, so pick the one you train at.
          </p>
        </div>

        <div className="mt-10 lg:col-span-8 lg:mt-0">
          <BranchTabs tabs={tabs} />
        </div>
      </div>
    </Section>
  );
}
