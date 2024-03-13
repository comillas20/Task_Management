import prisma from "@/lib/db";
import { Login } from "@/schema/login-form-schema";
import { Argon2id } from "oslo/password";

export async function verifyLogin(data: Login) {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (user) {
    const validPassword = await new Argon2id().verify(
      user.hashed_password,
      data.password
    );
    if (validPassword) {
      return user;
    } else {
      return null;
    }
  }

  return null;
}
