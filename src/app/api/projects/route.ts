import { NextRequest, NextResponse } from "next/server";
import {
  getAllProjects,
  createProject,
} from "@/services/projects.service";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { title, description, image, liveLink, repoLink, tags } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "title and description are required" }, { status: 400 });
    }

    const project = await createProject({
      title,
      description,
      image,
      liveLink,
      repoLink,
      tags: Array.isArray(tags) ? tags : [],
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
