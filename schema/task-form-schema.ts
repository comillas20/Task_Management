import { isImage } from "@/lib/utils";
import { z } from "zod";

export const taskFormSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  image: z
    .instanceof(File)
    .refine(
      (value) => {
        console.log(isImage(value));
        return isImage(value);
      },
      { message: "Invalid image" }
    )
    .optional()
    .nullable(),
  assignedEmployeeId: z
    .number()
    .min(0, { message: "Please select an employee" }),
});
// Just in case, they would require unique titles
// .refine(
//     async (value) => {
//         const task = await getTask(value.title);
//         if (task) {
//             // System should exempt this task's own title when checking for task title existence
//             const isSameTask = task.id === value.id;
//             const titleAlreadyExists = isSameTask
//                 ? false // Technically it exists, but again, system should exempt this task's own title
//                 : task.title === value.title;
//             return isSameTask || !titleAlreadyExists;
//         }
//         // Task is non-existent
//         return true;
//     },
//     {
//         message: "Title already exists!",
//         path: ["title"],
//     }
// );

export type TaskType = z.infer<typeof taskFormSchema>;
