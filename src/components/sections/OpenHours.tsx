import { Motif } from "@/components/motif/Motif";
import { Section } from "@/components/ui/Section";
import { chartRange, weekSchedule } from "@/lib/hours";
import { OpenStatus } from "./OpenStatus";

function label(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${suffix}`;
}

// The week drawn to scale rather than listed as text: each day is a bar across
// a shared timeline, so the long weekday hours and the short Sunday read at a
// glance. The bars are decorative, so the same hours are also given as text
// for screen readers and for anyone who wants the exact times.
export function OpenHours() {
  const schedule = weekSchedule();
  const { start, end } = chartRange(schedule);
  const span = end - start;
  const ticks: number[] = [];
  for (let minute = start; minute <= end; minute += 180) {
    ticks.push(minute);
  }

  return (
    <Section id="hours" className="bg-accent-tint">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="type-eyebrow text-accent">Opening hours</p>
          <h2 className="mt-4 type-h2 text-ink">We are open</h2>
          <Motif id="clock-five" className="mt-6 w-12 text-secondary" />
          <p className="mt-6 max-w-sm type-body text-ink-muted">
            Open all seven days. The floor opens at 5:00 AM on weekdays, so a full session fits in
            before work.
          </p>
          <div className="mt-6">
            <OpenStatus schedule={schedule} />
          </div>
        </div>

        <div className="mt-12 lg:col-span-8 lg:mt-0">
          <div aria-hidden="true">
            <div className="relative mb-2 hidden h-5 sm:block">
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

            {schedule.map((day) => (
              <div key={day.day} className="flex items-center gap-3 py-1.5 sm:gap-4">
                <span className="w-9 shrink-0 type-small text-ink-muted">{day.short}</span>
                <div className="relative h-7 flex-1 overflow-hidden rounded-button bg-surface-raised">
                  <div
                    className="absolute inset-y-0 rounded-button bg-accent"
                    style={{
                      left: `${((day.openMinutes - start) / span) * 100}%`,
                      width: `${((day.closeMinutes - day.openMinutes) / span) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-36 shrink-0 text-right whitespace-nowrap type-small text-ink">
                  {day.opens} to {day.closes}
                </span>
              </div>
            ))}
          </div>

          <table className="sr-only">
            <caption>Opening hours</caption>
            <tbody>
              {schedule.map((day) => (
                <tr key={day.day}>
                  <th scope="row">{day.day}</th>
                  <td>
                    {day.opens} to {day.closes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
