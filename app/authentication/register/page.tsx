import { Register } from "@/schema/register-form-schema";
import { RegistrationForm } from "./registration-form";
import { registerAccount } from "@/actions/register";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ENABLE_REGISTRATION } from "@/routes";
import { Separator } from "@/components/ui/separator";

export default async function RegistrationPage() {
  if (ENABLE_REGISTRATION) return <RegistrationForm handler={authorize} />;
  else
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted sm:-my-4">
        <div className="flex gap-4">
          <h5 className="text-xl font-semibold">404</h5>
          <Separator orientation="vertical" className="h-auto" />
          <h5 className="text-lg font-medium">Nuh uh</h5>
        </div>
      </main>
    );
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
