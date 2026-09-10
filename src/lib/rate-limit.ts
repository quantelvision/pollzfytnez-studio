import "server-only";

// A sliding window limiter for the contact form. Three enquiries an hour from
// one address, which is well above what a person sends and well below what a
// script would try.
//
// **This is in process memory, and that has a real consequence.** Each
// serverless instance keeps its own map, so the ceiling is per instance rather
// than per site, and an instance that recycles forgets everything it had seen.
// It is proportionate to what it defends against here, which is a bot finding
// the form, not a targeted attack. Moving it to Vercel KV or Upstash would make
// it exact, at the cost of a service and the environment variables this project
// deliberately does not require.

const WINDOW_MS = 60 * 60 * 1000;
const MAX_IN_WINDOW = 3;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  // How long until the oldest attempt falls out of the window, rounded up so
  // the number shown to someone is never sooner than the truth.
  retryAfterMinutes: number;
}

// Drops keys with nothing left in the window, so the map cannot grow without
// bound on a long lived instance.
function prune(now: number): void {
  for (const [key, times] of hits) {
    const live = times.filter((time) => now - time < WINDOW_MS);
    if (live.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, live);
    }
  }
}

export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  prune(now);

  const times = hits.get(key) ?? [];
  if (times.length < MAX_IN_WINDOW) {
    return { allowed: true, retryAfterMinutes: 0 };
  }

  const oldest = Math.min(...times);
  const remaining = WINDOW_MS - (now - oldest);
  return { allowed: false, retryAfterMinutes: Math.max(1, Math.ceil(remaining / 60000)) };
}

// Called once an enquiry is about to be sent, rather than on every submit, so
// someone correcting a typo does not spend an attempt on a form that never went
// anywhere.
export function recordAttempt(key: string, now: number = Date.now()): void {
  const times = hits.get(key) ?? [];
  times.push(now);
  hits.set(key, times);
}
