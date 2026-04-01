import { NextRequest, NextResponse } from "next/server";
import { getAllExperiences, createExperience } from "@/services/experience.service";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const experiences = await getAllExperiences();
    return NextResponse.json(experiences);
  } catch {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { company, role, startDate, endDate, isCurrent, description } = body;
    if (!company || !role || !startDate) {
      return NextResponse.json({ error: "company, role, and startDate are required" }, { status: 400 });
    }
    const exp = await createExperience({ company, role, startDate, endDate, isCurrent, description });
    return NextResponse.json(exp, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
