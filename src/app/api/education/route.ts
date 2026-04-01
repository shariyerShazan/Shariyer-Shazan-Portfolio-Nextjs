import { NextRequest, NextResponse } from "next/server";
import { getAllEducation, createEducation } from "@/services/education.service";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const education = await getAllEducation();
    return NextResponse.json(education);
  } catch {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { institution, degree, field, startDate, endDate, description } = body;
    if (!institution || !degree || !startDate) {
      return NextResponse.json({ error: "institution, degree, and startDate are required" }, { status: 400 });
    }
    const edu = await createEducation({ institution, degree, field, startDate, endDate, description });
    return NextResponse.json(edu, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
  }
}
