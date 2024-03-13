"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MoveLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Login, loginFormSchema } from "@/schema/login-form-schema";
import { useState } from "react";

type LoginFormProps = {
  handler: (data: Login) => Promise<{ error: string }>;
};
export default function LoginForm({ handler }: LoginFormProps) {
  const form = useForm<Login>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: Login) => {
    const result = await handler(data);
    if (result) setMessage(result.error);
  };
  const [message, setMessage] = useState<string>();
  const router = useRouter();
  return (
    <div className="relative flex h-full items-center justify-center lg:p-8">
      <Button
        className="absolute left-4 top-4 md:left-8 md:top-8"
        variant="ghost"
        onClick={() => router.back()}>
        <MoveLeftIcon className="mr-2" /> Back
      </Button>
      <Link
        href="/authentication/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}>
        Register
      </Link>
      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in with your account
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="joemama28" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {message && (
              <p className="text-sm font-medium text-destructive">{message}</p>
            )}
            <div className="flex flex-col gap-4">
              <div className="w-full space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin" />
                  )}
                  Log in
                </Button>
              </div>

              {/* <div className="flex w-full justify-between">
                <Button
                  variant={"link"}
                  className="flex items-end justify-start p-0 text-xs text-accent-foreground">
                  Forgot Password?
                </Button>
                <Link
                  href="/authentication/register"
                  className="flex items-end text-xs text-primary">
                  Don&apos;t have an account?
                </Link>
              </div> */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
