import { Register } from "@/schema/register-form-schema";
import { RegistrationForm } from "./registration-form";
import { registerAccount } from "@/actions/register";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegistrationPage() {
  return <RegistrationForm handler={authorize} />;
}

// Note: Cookies (or the next/header package) are only allowed in Server Components
async function authorize(data: Register) {
  "use server";
  const newUser = await registerAccount(data);

  if (newUser) {
    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    redirect("/");
  } else {
    return { error: "Username is already taken." };
  }
}
