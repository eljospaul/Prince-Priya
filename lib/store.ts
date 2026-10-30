/**
 * A Little Forever — persistent file-based store.
 *
 * Guest wishes are persisted to data/wishes.json so messages survive page
 * reloads without any external service. Sessions live in data/sessions.json.
 *
 * For production, replace this layer with Supabase (see lib/supabase.ts
 * stub) — the API routes above it stay the same.
 */

import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const WISHES_FILE = path.join(DATA_DIR, "wishes.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");

export type WishStatus = "pending" | "approved" | "hidden";

export interface Wish {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  location?: string;
  status: WishStatus;
  createdAt: string;
}

interface SessionRecord {
  token: string;
  expiresAt: number;
}

let wishesCache: Wish[] | null = null;
let sessionsCache: SessionRecord[] | null = null;

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readWishes(): Promise<Wish[]> {
  if (wishesCache) return wishesCache;
  await ensureDir();
  try {
    const raw = await fs.readFile(WISHES_FILE, "utf8");
    wishesCache = JSON.parse(raw);
    if (!Array.isArray(wishesCache)) wishesCache = [];
  } catch {
    wishesCache = [];
  }
  return wishesCache;
}

async function writeWishes(wishes: Wish[]) {
  wishesCache = wishes;
  await ensureDir();
  await fs.writeFile(WISHES_FILE, JSON.stringify(wishes, null, 2));
}

async function readSessions(): Promise<SessionRecord[]> {
  if (sessionsCache) return sessionsCache;
  await ensureDir();
  try {
    const raw = await fs.readFile(SESSIONS_FILE, "utf8");
    sessionsCache = JSON.parse(raw);
    if (!Array.isArray(sessionsCache)) sessionsCache = [];
  } catch {
    sessionsCache = [];
  }
  return sessionsCache;
}

async function writeSessions(sessions: SessionRecord[]) {
  sessionsCache = sessions;
  await ensureDir();
  await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

export async function getWishes(): Promise<Wish[]> {
  return readWishes();
}

export async function getWish(id: string): Promise<Wish | null> {
  const wishes = await readWishes();
  return wishes.find((w) => w.id === id) ?? null;
}

export async function createWish(input: Omit<Wish, "id" | "status" | "createdAt">): Promise<Wish> {
  const wishes = await readWishes();
  const wish: Wish = {
    id: `wish_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    ...input,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  wishes.unshift(wish);
  await writeWishes(wishes);
  return wish;
}

export async function updateWishStatus(id: string, status: WishStatus): Promise<Wish | null> {
  const wishes = await readWishes();
  const index = wishes.findIndex((w) => w.id === id);
  if (index === -1) return null;
  wishes[index].status = status;
  await writeWishes(wishes);
  return wishes[index];
}

export async function deleteWish(id: string): Promise<boolean> {
  const wishes = await readWishes();
  const filtered = wishes.filter((w) => w.id !== id);
  if (filtered.length === wishes.length) return false;
  await writeWishes(filtered);
  return true;
}

export async function getValidSession(token: string): Promise<SessionRecord | null> {
  const sessions = await readSessions();
  const now = Date.now();
  const valid = sessions.filter((s) => s.expiresAt > now);
  if (valid.length !== sessions.length) await writeSessions(valid);
  return valid.find((s) => s.token === token) ?? null;
}

export async function createSession(token: string, ttlMs: number): Promise<void> {
  const sessions = await readSessions();
  sessions.push({ token, expiresAt: Date.now() + ttlMs });
  await writeSessions(sessions);
}

export async function removeSession(token: string): Promise<void> {
  const sessions = await readSessions();
  const filtered = sessions.filter((s) => s.token !== token);
  await writeSessions(filtered);
}
