import type { Branch } from "@/config/site";

export interface DaySchedule {
  day: string;
  short: string;
  // A closed day carries no times. openMinutes and closeMinutes are zero on
  // one and must never be read without checking this first.
  closed: boolean;
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

// Expands one branch's grouped opening hours into a row per day, in week order,
// so the week can be drawn as a bar per day against a shared scale.
export function branchSchedule(branch: Branch): DaySchedule[] {
  return DAY_ORDER.map((day) => {
    const slot = branch.hours.find((entry) => entry.schemaDays.some((name) => name === day));
    if (!slot) {
      throw new Error(`No opening hours configured for ${day} at ${branch.name}`);
    }
    if (slot.closed) {
      return {
        day,
        short: day.slice(0, 3),
        closed: true,
        opens: "",
        closes: "",
        openMinutes: 0,
        closeMinutes: 0,
      };
    }
    return {
      day,
      short: day.slice(0, 3),
      closed: false,
      opens: slot.opens,
      closes: slot.closes,
      openMinutes: toMinutes(slot.opens24),
      closeMinutes: toMinutes(slot.closes24),
    };
  });
}

// The window every chart spans. It takes all the branches at once, so the
// charts share one scale and can be read against each other; a per branch range
// would draw two different days at the same width.
export function chartRange(schedules: DaySchedule[][]): { start: number; end: number } {
  const open = schedules.flat().filter((day) => !day.closed);
  const earliest = Math.min(...open.map((day) => day.openMinutes));
  const latest = Math.max(...open.map((day) => day.closeMinutes));
  return { start: Math.floor((earliest - 60) / 60) * 60, end: Math.ceil((latest + 60) / 60) * 60 };
}

export interface OpenState {
  open: boolean;
  // the day's window, for drawing how far through it we are. Empty on a day
  // the branch does not open at all.
  opens: string;
  closes: string;
  // 0 to 1 through today's opening window, clamped
  progress: number;
  // what to say next to the status word
  detail: string;
  // minutes from the start of the week, used to compare branches against
  // each other. Null when the branch is not open right now.
  closesAt: number | null;
  // minutes from now until this branch next opens, for the same comparison
  opensIn: number;
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

const MINUTES_IN_DAY = 24 * 60;

// The next day the branch actually opens, which is not always tomorrow now that
// a branch can be shut for a whole day. Returns how many days ahead it is, so
// the caller can say how long the wait is.
function nextOpenDay(
  schedule: DaySchedule[],
  fromIndex: number,
): { day: DaySchedule; daysAhead: number } {
  for (let ahead = 1; ahead <= schedule.length; ahead += 1) {
    const day = schedule[(fromIndex + ahead) % schedule.length];
    if (!day.closed) {
      return { day, daysAhead: ahead };
    }
  }
  throw new Error("A branch must open on at least one day of the week");
}

// Shared by the server render and the client tick, so the two always agree.
export function openStateAt(date: Date, schedule: DaySchedule[]): OpenState {
  const { weekday, minutes } = studioNow(date);
  const index = Math.max(
    schedule.findIndex((day) => day.day === weekday),
    0,
  );
  const today = schedule[index];

  if (!today.closed && minutes >= today.openMinutes && minutes < today.closeMinutes) {
    const span = today.closeMinutes - today.openMinutes;
    return {
      open: true,
      opens: today.opens,
      closes: today.closes,
      progress: Math.min(1, Math.max(0, (minutes - today.openMinutes) / span)),
      detail: `Closes ${today.closes}`,
      closesAt: today.closeMinutes,
      opensIn: 0,
    };
  }

  // Still to open today
  if (!today.closed && minutes < today.openMinutes) {
    return {
      open: false,
      opens: today.opens,
      closes: today.closes,
      progress: 0,
      detail: `Opens ${today.opens}`,
      closesAt: null,
      opensIn: today.openMinutes - minutes,
    };
  }

  // Shut for the day, or shut all day
  const { day: next, daysAhead } = nextOpenDay(schedule, index);
  return {
    open: false,
    opens: today.closed ? next.opens : today.opens,
    closes: today.closed ? next.closes : today.closes,
    progress: today.closed ? 0 : 1,
    detail: `Opens ${next.short} ${next.opens}`,
    closesAt: null,
    opensIn: daysAhead * MINUTES_IN_DAY - minutes + next.openMinutes,
  };
}
