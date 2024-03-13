import { z } from "zod";

export const employeeFormSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Employee name is required"),
  position: z.string().nullable(),
  contactNo: z.string().nullable(),
  email: z.string().email().nullable(),
  status: z.string(),
});

export type EmployeeType = z.infer<typeof employeeFormSchema>;
