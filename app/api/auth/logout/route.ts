import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { removeSession } from "@/lib/store";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(SESSION_COOKIE)?.value;
  if (existing) {
    const token = existing.split(".")[0];
    if (token) await removeSession(token);
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
  return response;
}
