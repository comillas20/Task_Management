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

import { Employee } from "@prisma/client";
import { EmployeeDialog, EmployeeDialogTrigger } from "./employee-dialog";
import { updateStatus } from "@/actions/employee";
import { statuses } from "../data/data";

interface DataTableRowActionsProps {
  row: Row<Employee>;
}

/*This code is used to  render the dropdown menu for each row in the table.
And edit information about the employee*/
export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const employee = row.original;

  return (
    <EmployeeDialog data={employee}>
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
          <EmployeeDialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </EmployeeDialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={employee.status}>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </EmployeeDialog>
  );
}
