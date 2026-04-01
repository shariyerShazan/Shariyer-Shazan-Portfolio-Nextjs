import prisma from "@/lib/db";

export async function getAllEducation() {
  return await prisma.education.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getEducationById(id: string) {
  return await prisma.education.findUnique({ where: { id } });
}

export async function createEducation(data: {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}) {
  return await prisma.education.create({ data });
}

export async function updateEducation(
  id: string,
  data: Partial<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description: string;
  }>
) {
  return await prisma.education.update({ where: { id }, data });
}

export async function deleteEducation(id: string) {
  return await prisma.education.delete({ where: { id } });
}
