import prisma from "@/lib/db";

export async function getHero() {
  return await prisma.hero.findFirst();
}

export async function updateHero(data: {
  heading: string;
  subheading?: string;
  description?: string;
  image?: string;
}) {
  const hero = await prisma.hero.findFirst();
  if (hero) {
    return await prisma.hero.update({ where: { id: hero.id }, data });
  } else {
    return await prisma.hero.create({ data });
  }
}
