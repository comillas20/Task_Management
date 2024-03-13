import { Metadata } from "next";
import { NavigationButton, UserNav } from "@/components/user-nav";
import { Employee } from "./components/employee";
import { getEmployees } from "@/actions/employee";
import { getUser } from "@/actions/session";
import { redirect } from "next/navigation";
import { LOGIN } from "@/routes";

export const metadata: Metadata = {
  title: "Employees",
};

export default async function EmployeePage() {
  const user = await getUser();
  const employees = await getEmployees();
  if (user)
    return (
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
            <p className="text-muted-foreground">
              Manage employee&apos;s details
            </p>
          </div>
          <UserNav navBtns={navBtns} username={user?.username} />
        </div>
        <Employee data={employees} />
      </div>
    );
  else redirect(LOGIN);
}

const navBtns: NavigationButton[] = [
  {
    label: "Tasks",
    href: "/",
  },
];
