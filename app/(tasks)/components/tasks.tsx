"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as T,
  Row,
  RowSelectionState,
} from "@tanstack/react-table";
import { TaskCard } from "./task-card";
import { taskColumns, TaskColumnType } from "./task-columns";
import { DataTable } from "../../../components/data-table";
import { Card } from "@/components/ui/card";
import { DataTableToolbar } from "./data-table-toolbar";

type TasksProps = {
  data: TaskColumnType[];
};
export function Tasks({ data }: TasksProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ priority: false });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns: taskColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (o: TaskColumnType) => {
      return o.id.toString();
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
/*This  is the main component that renders the entire table by utilizing react-table*/
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const selectedTask = isMounted
    ? table
        .getSelectedRowModel()
        .rows.find(
          (row) => String(row.original.id) === Object.keys(rowSelection)[0]
        )?.original
    : undefined;
      /*This part is responsible for displaying the selected task in the right
    panel by passing it as a prop to the RightPanel component and the 
    following functions are used to handle user interactions with the
    table such as clicking a cell or pressing keys on their keyboard */
  return (
    <div className="grid grid-cols-5 gap-4">
      <DataTableToolbar className="col-span-full" table={table} />
      <div className="col-span-2">
        {selectedTask ? (
          <TaskCard key={selectedTask.id} data={selectedTask} />
        ) : (
          <Card className="flex min-h-96 items-center justify-center shadow-md">
            <span>Nothing is selected</span>
          </Card>
        )}
      </div>
      <div className="col-span-3">
        {isMounted && (
          <DataTable columns={taskColumns} table={table} enableRowSelection />
        )}
      </div>
    </div>
    /* The part above this line handles rendering of the table components*/
  );
}
