"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeDialog } from "./employee-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function CreateTask() {
  return (
    <EmployeeDialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto hidden h-8 shadow-md lg:flex">
          <PlusIcon className="mr-2 h-4 w-4" />
          Employee
        </Button>
      </DialogTrigger>
    </EmployeeDialog>
  );
}
