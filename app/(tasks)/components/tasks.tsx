"use client";

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { DataTableToolbar } from "./data-table-toolbar";
import { TaskCard } from "./task-card";
import { TaskColumnType, taskColumns } from "./task-columns";

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

  /*This is used for the  filter dropdowns in the header of each column*/
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
  );
}
