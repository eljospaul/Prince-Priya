/**
 * A Little Forever — session authentication for the admin area.
 *
 * Passwords are compared as SHA-256 hashes. The expected hash is configured
 * via ADMIN_PASSWORD_HASH in .env.local. Session tokens are HMAC-signed
 * cookies verified against SESSION_SECRET.
 *
 * Never commit real secrets to this repository.
 */

import crypto from "node:crypto";

export const SESSION_COOKIE = "alf_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function makeSessionToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export function signSession(token: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(token).digest("hex");
}

export function buildSessionValue(token: string, secret: string): string {
  return `${token}.${signSession(token, secret)}`;
}

export function validateSessionValue(
  value: string | undefined,
  secret: string,
): { valid: boolean; token?: string } {
  if (!value || typeof value !== "string") return { valid: false };
  const [token, sig] = value.split(".");
  if (!token || !sig) return { valid: false };
  const expected = signSession(token, secret);
  try {
    const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    return { valid: ok, token: ok ? token : undefined };
  } catch {
    return { valid: false };
  }
}

export function sessionCookieOptions(token: string, secret: string): string {
  const value = buildSessionValue(token, secret);
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(
    SESSION_TTL_MS / 1000,
  )}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export const SESSION_TTL_MS_CONST = SESSION_TTL_MS;
