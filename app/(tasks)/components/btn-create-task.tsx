"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "./task-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
/*This button is  used to open a dialog for creating new tasks.*/
export function CreateTask() {
  return (
    <TaskDialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto h-8 shadow-md lg:flex">
          <PlusIcon className="mr-2 h-4 w-4" />
          Task
        </Button>
      </DialogTrigger>
    </TaskDialog>
  );
}
