import { NextRequest, NextResponse } from "next/server";
import { getAllSkills, createSkill } from "@/services/skills.service";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const skills = await getAllSkills();
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, icon, level, category } = body;
    if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

    const skill = await createSkill({ name, icon, level, category });
    return NextResponse.json(skill, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
