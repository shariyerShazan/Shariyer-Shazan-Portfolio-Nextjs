import prisma from "@/lib/db";

export async function getAllSkills() {
  return await prisma.skill.findMany({ orderBy: { category: "asc" } });
}

export async function getSkillById(id: string) {
  return await prisma.skill.findUnique({ where: { id } });
}

export async function createSkill(data: {
  name: string;
  icon?: string;
  level?: string;
  category?: string;
}) {
  return await prisma.skill.create({ data });
}

export async function updateSkill(
  id: string,
  data: Partial<{ name: string; icon: string; level: string; category: string }>
) {
  return await prisma.skill.update({ where: { id }, data });
}

export async function deleteSkill(id: string) {
  return await prisma.skill.delete({ where: { id } });
}
