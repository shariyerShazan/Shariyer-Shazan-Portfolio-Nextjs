import { NextRequest, NextResponse } from "next/server";
import { getHero, updateHero } from "@/services/hero.service";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const hero = await getHero();
    return NextResponse.json(hero);
  } catch {
    return NextResponse.json({ error: "Failed to fetch hero" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const hero = await updateHero(body);
    return NextResponse.json(hero);
  } catch {
    return NextResponse.json({ error: "Failed to update hero" }, { status: 500 });
  }
}
