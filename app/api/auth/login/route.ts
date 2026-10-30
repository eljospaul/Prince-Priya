import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";

import { createSession, removeSession } from "@/lib/store";
import { hashPassword, buildSessionValue, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedHash) {
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 500 },
    );
  }

  if (!password || hashPassword(password) !== expectedHash) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  const existing = cookieStore.get(SESSION_COOKIE)?.value;
  if (existing) {
    const token = existing.split(".")[0];
    if (token) await removeSession(token);
  }

  const token = crypto.randomBytes(24).toString("hex");
  const ttlMs = 1000 * 60 * 60 * 24;
  await createSession(token, ttlMs);

  const response = NextResponse.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE}=${buildSessionValue(token, process.env.SESSION_SECRET!)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(ttlMs / 1000)}`,
  );
  return response;
}
