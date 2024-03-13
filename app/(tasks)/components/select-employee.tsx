"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useEmployees } from "@/hooks/employees";
import { Employee } from "@prisma/client";
import { useState } from "react";

type SelectEmployeeProps = {
  employeeId: number;
  onEmployeeIdChange: (value: number) => void;
} & React.ComponentProps<typeof Select>;
export function SelectEmployee({
  employeeId,
  onEmployeeIdChange,
}: SelectEmployeeProps) {
  const { data, error, isLoading, getEmployeeById } = useEmployees();
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(getEmployeeById(employeeId));
  return (
    <Select
      value={String(employeeId)}
      disabled={isLoading}
      onValueChange={(value) => {
        const id = parseInt(value, 10);
        if (!isNaN(id)) {
          onEmployeeIdChange(id);
          setSelectedEmployee(getEmployeeById(id));
        }
      }}>
      <SelectTrigger className="min-w-48">
        {employeeId === -1 ? (
          <span>Select employee</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-medium">{selectedEmployee?.name}</span>
            {selectedEmployee?.position && (
              <>
                <span>—</span>
                <span className="text-xs">{selectedEmployee.position}</span>
              </>
            )}
          </div>
        )}
      </SelectTrigger>
      <SelectContent>
        {data?.map((employee) => (
          <SelectItem key={String(employee.id)} value={String(employee.id)}>
            {employee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
