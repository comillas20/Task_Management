"use client";

import { ColumnDef } from "@tanstack/react-table";
import { priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "../../../components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { Prisma } from "@prisma/client";

/* This  is a custom column definition that extends the base `Column` definition */
export type TaskColumnType = Prisma.TaskGetPayload<{
  include: { assignedEmployee: true };
}>;
/* We use this to define our typed column and specify what data it should pull out of each row*/
export const taskColumns: ColumnDef<TaskColumnType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="truncate font-medium">{row.getValue("title")}</span>
      </div>
    ),
  },
  {
    id: "employee",
    accessorFn: (row) => row.assignedEmployee.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && <priority.icon className="mr-2 h-4 w-4" />}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "Created",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => format(row.original.createdAt, "PP"),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
