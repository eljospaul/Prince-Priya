/**
 * A Little Forever — in-memory rate limiter for wish submissions.
 *
 * Limits submissions per IP address. Not a substitute for a proper service,
 * but sufficient for a small site without external credentials.
 */

interface Hit {
  timestamp: number;
}

const hits = new Map<string, Hit[]>();
const WINDOW_MS = 1000 * 60 * 10; // 10 minutes
const MAX_HITS = 5;

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowHits = (hits.get(ip) ?? []).filter((h) => now - h.timestamp < WINDOW_MS);
  if (windowHits.length >= MAX_HITS) {
    hits.set(ip, windowHits);
    return { allowed: false, remaining: 0 };
  }
  windowHits.push({ timestamp: now });
  hits.set(ip, windowHits);
  return { allowed: true, remaining: MAX_HITS - windowHits.length };
}
