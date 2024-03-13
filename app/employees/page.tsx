import { Metadata } from "next";
import { NavigationButton, UserNav } from "@/components/user-nav";
import { Employee } from "./components/employee";
import { getEmployees } from "@/actions/employee";

export const metadata: Metadata = {
  title: "Employees",
};
/* A page to display all employees in the database */
export default async function EmployeePage() {
  const employees = await getEmployees();
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Manage employee&apos;s details
          </p>
        </div>
        <UserNav navBtns={navBtns} />
      </div>
      <Employee data={employees} />
    </div>
  );
}

const navBtns: NavigationButton[] = [
  {
    label: "Tasks",
    href: "/",
  },
];
