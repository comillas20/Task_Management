"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
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
  VisibilityState,
} from "@tanstack/react-table";
import { employeeColumns } from "./employee-columns";
import { DataTable } from "@/components/data-table";
import { Employee as em } from "@prisma/client";
import { DataTableToolbar } from "./data-table-toolbar";

type EmployeeProps = {
  data: em[];
};
export function Employee({ data }: EmployeeProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
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
    columns: employeeColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (employee: em) => {
      return employee.id.toString();
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
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

  if (isMounted)
    return (
      <div className="space-y-4">
        <DataTableToolbar table={table} />
        <DataTable columns={employeeColumns} table={table} />
      </div>
    );
  else return <div></div>;
}
