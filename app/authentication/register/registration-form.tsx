"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Register, registerFormSchema } from "@/schema/register-form-schema";
import { Loader2, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegistrationFormProps = {
  handler: (data: Register) => Promise<{ error: string }>;
};
export function RegistrationForm({ handler }: RegistrationFormProps) {
  const form = useForm<Register>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: Register) {
    const result = await handler(data);
    if (result) setMessage(result.error);
  }
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
        href="/authentication/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}>
        Login
      </Link>
      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Example: joemama28" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Atleast 8 characters"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
              </Button>
              <Link
                href="/authentication/sign-in"
                className="flex items-end self-center text-xs text-primary hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
