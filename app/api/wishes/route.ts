import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createWish, getWishes } from "@/lib/store";
import { rateLimit } from "@/lib/rate-limit";

function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function hasTooManyLinks(text: string): boolean {
  const matches = text.match(/https?:\/\/[^\s]+|www\.[^\s]+/g);
  return !!(matches && matches.length > 1);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 50, 1), 100);

  const wishes = await getWishes();
  const approved = wishes
    .filter((w) => w.status === "approved")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return NextResponse.json({
    wishes: approved.slice(0, limit),
    count: approved.length,
  });
}

export async function POST(request: Request) {
  const headersList = request.headers;
  const ip = clientIp(headersList as unknown as Headers);
  const limited = rateLimit(ip);
  if (!limited.allowed) {
    return NextResponse.json(
      {
        error:
          "Too many submissions. Please wait a little while before sending another wish.",
      },
      { status: 429 },
    );
  }

  let body: {
    name?: string;
    relationship?: string;
    message?: string;
    location?: string;
    _hp?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body._hp && String(body._hp).trim().length > 0) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  const name = String(body.name ?? "").trim();
  const relationship = String(body.relationship ?? "").trim();
  const message = String(body.message ?? "").trim();
  const location = String(body.location ?? "").trim();

  if (!name) fields.name = "Please tell us your name.";
  else if (name.length < 2 || name.length > 60)
    fields.name = "Name must be between 2 and 60 characters.";

  if (relationship.length > 80)
    fields.relationship = "Relationship is too long.";

  if (!message) fields.message = "Please share a few words.";
  else if (message.length < 5 || message.length > 2000)
    fields.message = "Message must be between 5 and 2,000 characters.";
  else if (hasTooManyLinks(message))
    fields.message = "Messages cannot contain multiple links.";

  if (location.length > 80) fields.location = "Location is too long.";

  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields },
      { status: 400 },
    );
  }

  const wish = await createWish({ name, relationship, message, location });

  return NextResponse.json(
    {
      wish,
      message:
        "Your love has been added to their story. Thank you for being part of this journey.",
    },
    { status: 201 },
  );
}
