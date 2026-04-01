import prisma from "@/lib/db";

export async function getAllExperiences() {
  return await prisma.experience.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getExperienceById(id: string) {
  return await prisma.experience.findUnique({ where: { id } });
}

export async function createExperience(data: {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}) {
  return await prisma.experience.create({ data });
}

export async function updateExperience(
  id: string,
  data: Partial<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
  }>
) {
  return await prisma.experience.update({ where: { id }, data });
}

export async function deleteExperience(id: string) {
  return await prisma.experience.delete({ where: { id } });
}
