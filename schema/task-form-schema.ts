import { z } from "zod";

export const taskFormSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  image: z
    .custom((value) => value instanceof File, {
      message: "Invalid File!",
    })
    .optional()
    .nullable(),
  assignedEmployeeId: z.number(),
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

export type Task = z.infer<typeof taskFormSchema>;
