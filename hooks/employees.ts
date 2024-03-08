import { getEmployees } from "@/actions/employee";
import useSWR from "swr";

export function useEmployees() {
    const { data, error, isLoading } = useSWR("all-employees", getEmployees);
    const getEmployeeById = (id: number) => {
        return data?.find((employee) => employee.id === id);
    };
    return { data, error, isLoading, getEmployeeById };
}
