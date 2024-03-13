import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { Register } from "@/schema/register-form-schema";
import prisma from "@/lib/db";

export async function registerAccount(values: Register) {
  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateId(15);

  // checking for username existence
  const user = await prisma.user.findUnique({
    where: {
      username: values.username,
    },
  });
  if (user) return null;

  const isFirst = (await prisma.user.count()) === 0;
  const newUser = await prisma.user.create({
    data: {
      id: userId,
      username: values.username,
      hashed_password: hashedPassword,
      role: isFirst ? "ADMIN" : "USER",
    },
  });
  return newUser;
}
