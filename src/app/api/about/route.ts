import { NextRequest, NextResponse } from "next/server";
import { getAbout, updateAbout } from "@/services/about.service";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const about = await getAbout();
    return NextResponse.json(about);
  } catch {
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const about = await updateAbout(body);
    return NextResponse.json(about);
  } catch {
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
  }
}
