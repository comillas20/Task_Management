"use server";

import prisma from "@/lib/db";
import { Employee } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getEmployees() {
  const employees = await prisma.employee.findMany();
  return employees;
}

export async function createOrUpdateEmployee(data: Employee) {
  const { id, ...others } = data;
  const employee = await prisma.employee.upsert({
    create: {
      ...others,
    },
    where: {
      id,
    },
    update: {
      ...others,
    },
  });
  revalidatePath("/employee", "page");
  return employee;
}

export async function updateStatus(id: number, status: string) {
  const employee = await prisma.employee.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });
  revalidatePath("/employee", "page");
  return employee;
}
