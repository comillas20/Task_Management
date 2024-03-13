import { Login } from "@/schema/login-form-schema";
import LoginForm from "./login-form";
import { verifyLogin } from "@/actions/login";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  return <LoginForm handler={authorize} />;
}

// Note: Cookies (or the next/header package) are only allowed in Server Components
async function authorize(data: Login) {
  "use server";
  const newUser = await verifyLogin(data);

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
    return { error: "Invalid username or password!" };
  }
}
