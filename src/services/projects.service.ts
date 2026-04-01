import prisma from "@/lib/db";

export async function getAllProjects() {
  return await prisma.project.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: {
  title: string;
  description: string;
  image?: string;
  liveLink?: string;
  repoLink?: string;
  tags: string[];
}) {
  return await prisma.project.create({ data });
}

export async function updateProject(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    image: string;
    liveLink: string;
    repoLink: string;
    tags: string[];
  }>
) {
  return await prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({ where: { id } });
}
