import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { updateWishStatus, deleteWish } from "@/lib/store";
import { validateSessionValue } from "@/lib/auth";

async function requireAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("alf_session")?.value;
  const secret = process.env.SESSION_SECRET;
  if (!secret || !session) return null;
  return validateSessionValue(session, secret);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await requireAuth();
  if (!session?.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = (await request.json()) as { status?: string };
  if (!["pending", "approved", "hidden"].includes(status ?? "")) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const wish = await updateWishStatus(
    id,
    status as "pending" | "approved" | "hidden",
  );
  if (!wish) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ wish });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await requireAuth();
  if (!session?.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const removed = await deleteWish(id);
  if (!removed) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
