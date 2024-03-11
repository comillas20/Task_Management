"use server";

import prisma from "@/lib/db";

export async function getEmployees() {
    const employees = await prisma.employee.findMany();
    return employees;
}
