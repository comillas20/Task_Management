"use server";
import prisma from "@/lib/db";
import { TaskType } from "@/schema/task-form-schema";
import { access, mkdir, readdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join, parse } from "path";

type ModdifiedTask = {
  image?: FormData;
} & Omit<TaskType, "image">;

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
      await mkdir(join(process.cwd(), "public/images"));
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const moddifiedFileName = await modifyFilename(imageFile.name);
    const path = join(process.cwd(), "public/images", moddifiedFileName);

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
    revalidatePath("/(tasks)", "page");
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
    revalidatePath("/(tasks)", "page");
    return newTask;
  }
}

async function modifyFilename(filename: string) {
  let fileExists = true;
  let newFilename = filename;

  for (var i = 2; fileExists; i++) {
    try {
      await access(join(process.cwd(), "public/images", newFilename));
      const parsedPath = parse(filename);
      newFilename = join(
        parsedPath.dir,
        `${parsedPath.name} (${i})${parsedPath.ext}`
      );
    } catch (err) {
      fileExists = false;
    }
  }
  return newFilename;
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
