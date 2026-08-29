import { site } from "@/config/site";

export interface DaySchedule {
  day: string;
  short: string;
  opens: string;
  closes: string;
  openMinutes: number;
  closeMinutes: number;
}

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function toMinutes(time24: string): number {
  const [hours, minutes] = time24.split(":").map(Number);
  return hours * 60 + minutes;
}

// Expands the grouped opening hours into one row per day, in week order,
// so the schedule can be drawn as a bar per day against a shared scale.
export function weekSchedule(): DaySchedule[] {
  return DAY_ORDER.map((day) => {
    const slot = site.hours.find((entry) => entry.schemaDays.some((name) => name === day));
    if (!slot) {
      throw new Error(`No opening hours configured for ${day}`);
    }
    return {
      day,
      short: day.slice(0, 3),
      opens: slot.opens,
      closes: slot.closes,
      openMinutes: toMinutes(slot.opens24),
      closeMinutes: toMinutes(slot.closes24),
    };
  });
}

// The window the schedule chart spans, padded either side of the real hours
export function chartRange(schedule: DaySchedule[]): { start: number; end: number } {
  const earliest = Math.min(...schedule.map((day) => day.openMinutes));
  const latest = Math.max(...schedule.map((day) => day.closeMinutes));
  return { start: Math.floor((earliest - 60) / 60) * 60, end: Math.ceil((latest + 60) / 60) * 60 };
}

export interface OpenState {
  open: boolean;
  // the day's window, for drawing how far through it we are
  opens: string;
  closes: string;
  // 0 to 1 through today's opening window, clamped
  progress: number;
  // what to say next to the status word
  detail: string;
}

// The studio's own timezone, so a visitor abroad still sees Chennai time.
const STUDIO_TIMEZONE = "Asia/Kolkata";

function studioNow(date: Date): { weekday: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: STUDIO_TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    weekday: read("weekday"),
    minutes: Number(read("hour")) * 60 + Number(read("minute")),
  };
}

// Shared by the server render and the client tick, so the two always agree.
export function openStateAt(date: Date, schedule: DaySchedule[]): OpenState {
  const { weekday, minutes } = studioNow(date);
  const index = schedule.findIndex((day) => day.day === weekday);
  const today = schedule[index] ?? schedule[0];
  const next = schedule[(index + 1) % schedule.length];
  const span = today.closeMinutes - today.openMinutes;
  const progress = Math.min(1, Math.max(0, (minutes - today.openMinutes) / span));

  if (minutes >= today.openMinutes && minutes < today.closeMinutes) {
    return {
      open: true,
      opens: today.opens,
      closes: today.closes,
      progress,
      detail: `Closes ${today.closes}`,
    };
  }

  if (minutes < today.openMinutes) {
    return {
      open: false,
      opens: today.opens,
      closes: today.closes,
      progress: 0,
      detail: `Opens ${today.opens}`,
    };
  }

  return {
    open: false,
    opens: today.opens,
    closes: today.closes,
    progress: 1,
    detail: `Opens ${next.short} ${next.opens}`,
  };
}
