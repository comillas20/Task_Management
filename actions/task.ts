"use server";
import { mkdir, readdir, writeFile } from "fs/promises";
import { join } from "path";
import prisma from "@/lib/db";
import { TaskType } from "@/schema/task-form-schema";
import { utcToZonedTime } from "date-fns-tz";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// had to do this because prisma auto converts Dates to UTC timezone
// and I can't do anything to make it use local time zone
// so Im converting every Dates I get from Prisma to local

const localTimezone = "Asia/Manila";

type ModdifiedTask = {
  image?: FormData;
} & TaskType;

export async function createOrUpdateTask(values: ModdifiedTask) {
  const { id, image, ...others } = values;
  const imageFile = image?.get("file") as File | undefined;
  const filename = imageFile?.name;

  if (filename && imageFile) {
    // trying to read the directory to see its existence before actually uploading images to it
    try {
      await readdir(join(process.cwd(), "public/images"));
    } catch (error) {
      // then create the directory if not read/found
      console.log("Creating directory for images...");
      await mkdir(join(process.cwd(), "public/images"));
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), "public/images", imageFile.name);

    const task = await Promise.all([
      prisma.task.upsert({
        create: {
          ...others,
          imageURL: filename,
        },
        where: {
          id: id,
        },
        update: {
          ...others,
          imageURL: filename,
        },
      }),
      writeFile(path, buffer),
    ]);
    revalidatePath("/", "page");
    return task[0];
  } else {
    const newTask = await prisma.task.upsert({
      create: {
        ...others,
      },
      where: {
        id: id,
      },
      update: {
        ...others,
      },
    });
    return newTask;
  }
}

// Just in case, they would require unique titles
// type EmployeeTask = Prisma.TaskGetPayload<{
//   include: { assignedEmployee: true };
// }>;

// export async function getTask(title: string): Promise<EmployeeTask | null> {
//   const task = await prisma.task.findFirst({
//     where: {
//       title: title,
//     },
//     include: {
//       assignedEmployee: true,
//     },
//   });

//   const fullDir = task?.imageURL
//     ? join(process.cwd(), "/public/images", task.imageURL)
//     : null;
//   const moddified = task
//     ? {
//         ...task,
//         imageURL: fullDir,
//         createdAt: task.createdAt, //utcToZonedTime(task.createdAt, localTimezone),
//       }
//     : null;
//   return moddified;
// }
/**
 * @param  id - Task ID to update 
 * @returns this returns task that  is not completed and has an employee assigned to it 
 */

export async function getTasks() {
  const tasks = await prisma.task.findMany({
    include: {
      assignedEmployee: true,
    },
    where: {
      isDeleted: false,
    },
  });
  revalidatePath("/", "page");
  return tasks;
}

/*This function is used for deleting task  from the database*/
export async function deleteTask(id: number) {
  await prisma.task.update({
    data: {
      isDeleted: true,
    },
    where: {
      id,
    },
  });
  revalidatePath("/", "page");
}

/* This function and the function below is used 
to update the task  in the databases */
export async function updateStatus(id: number, status: string) {
  await prisma.task.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });

  revalidatePath("/", "page");
}

export async function updatePriority(id: number, priority: string) {
  await prisma.task.update({
    data: {
      priority,
    },
    where: {
      id,
    },
  });

  revalidatePath("/", "page");
}
