import * as z from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must have atleast 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export type Register = z.infer<typeof registerFormSchema>;
