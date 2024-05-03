import { getEmployees } from "@/actions/employee";
import useSWR from "swr";

export function useEmployees() {
  const { data, error, isLoading } = useSWR("all-employees", getEmployees);
  const getEmployeeById = (id: number) => {
    return data?.find((employee) => employee.id === id);
  };
  const getOccupiedPositions = () => {
    return data
      ? new Set(
          data
            .filter((employee) => employee.position !== null)
            .map((employee) => employee.position as string)
        )
      : undefined;
  };
  return { data, error, isLoading, getEmployeeById, getOccupiedPositions };
}
