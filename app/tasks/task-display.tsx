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
import { TaskCard } from "./components/card-task";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { TaskColumn } from "./components/columns";
import { Card } from "@/components/ui/card";
import { DataTableToolbar } from "./components/data-table-toolbar";

type TaskDisplayProps = {
  data: TaskColumn[];
};
export function TaskDisplay({ data }: TaskDisplayProps) {
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
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (o: TaskColumn, index: number) => {
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
          <Card className="flex min-h-96 items-center justify-center">
            <span>Nothing is selected</span>
          </Card>
        )}
      </div>
      <div className="col-span-3">
        {isMounted && <DataTable columns={columns} table={table} />}
      </div>
    </div>
  );
}
