import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getWishes } from "@/lib/store";
import { validateSessionValue } from "@/lib/auth";

async function requireAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("alf_session")?.value;
  const secret = process.env.SESSION_SECRET;
  if (!secret || !session) return null;
  return validateSessionValue(session, secret);
}

export async function GET() {
  const session = await requireAuth();
  if (!session?.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const wishes = await getWishes();
  return NextResponse.json({ wishes });
}
