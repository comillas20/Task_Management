import * as z from "zod";

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(8, {
    message: "Password must have atleast 8 characters",
  }),
});

export type Login = z.infer<typeof loginFormSchema>;
