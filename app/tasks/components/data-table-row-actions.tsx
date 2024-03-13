"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { priorities, statuses } from "../data/data";
import { Task } from "@prisma/client";
import { TaskDialog, TaskDialogTrigger } from "./task-dialog";
import { deleteTask, updatePriority, updateStatus } from "@/actions/task";

interface DataTableRowActionsProps {
  row: Row<Task>;
}
/*This  component is responsible for rendering the actions 
dropdown menu in each table row.*/
export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const task = row.original;

  return (
    <TaskDialog data={task}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <TaskDialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </TaskDialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.status}>
                {statuses.map((status) => (
                  <DropdownMenuRadioItem
                    key={status.value}
                    value={status.value}
                    onSelect={() =>
                      updateStatus(row.original.id, status.value)
                    }>
                    {status.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.priority}>
                {priorities.map((priority) => (
                  <DropdownMenuRadioItem
                    key={priority.value}
                    value={priority.value}
                    onSelect={() =>
                      updatePriority(row.original.id, priority.value)
                    }>
                    {priority.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onSelect={() => deleteTask(row.original.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TaskDialog>
  );
}
