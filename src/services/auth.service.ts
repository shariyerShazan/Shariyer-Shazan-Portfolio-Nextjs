import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function validatePassword(plain: string, hashed: string) {
  return await bcrypt.compare(plain, hashed);
}

export async function createUser(email: string, password: string) {
  const hashed = await bcrypt.hash(password, 12);
  return await prisma.user.create({ data: { email, password: hashed } });
}
