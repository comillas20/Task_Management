"use server";

import prisma from "@/lib/db";
import { Employee } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getEmployees() {
  const employees = await prisma.employee.findMany();
  return employees;
}
/* This code is used to create or update employees*/
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
/*This is used to update the status of employees*/
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
