import prisma from "@/lib/db";

export async function getAbout() {
  return await prisma.about.findFirst();
}

export async function updateAbout(data: {
  content: string;
  image?: string;
  email?: string;
  role?: string;
  phone?: string;
}) {
  const about = await prisma.about.findFirst();
  if (about) {
    return await prisma.about.update({ where: { id: about.id }, data });
  } else {
    return await prisma.about.create({ data });
  }
}
