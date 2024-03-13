"use client";

import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateEmployee } from "./btn-create-employee";

import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { useEmployees } from "@/hooks/employees";
import { Employee } from "@prisma/client";
import { cn } from "@/lib/utils";
import { statuses } from "../data/data";

interface DataTableToolbarProps {
  table: Table<Employee>;
  className?: string;
}
/*A reset  button that resets all filters and sorts.*/
export function DataTableToolbar({ className, table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const employees = useEmployees();
  const employeePositionAsOptions =
    employees.data && employees.data.length > 0
      ? employees.data
          .filter((employee) => employee.position != null)
          .map((employee) => ({
            label: employee.position as string,
            value: employee.position as string,
          }))
      : [];

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter employees..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("position") && !employees.isLoading && (
          <DataTableFacetedFilter
            column={table.getColumn("position")}
            title="Position"
            options={employeePositionAsOptions}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <DataTableViewOptions table={table} />
        <CreateEmployee />
      </div>
    </div>
  );
}
