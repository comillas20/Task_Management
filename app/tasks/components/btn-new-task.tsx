"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "./dialog-task";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function NewTask() {
    return (
        <TaskDialog>
            <DialogTrigger asChild>
                <Button size="sm" className="ml-auto hidden h-8 lg:flex">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </DialogTrigger>
        </TaskDialog>
    );
}
