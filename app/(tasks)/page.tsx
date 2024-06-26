import { Metadata } from "next";

import { NavigationButton, UserNav } from "@/components/user-nav";
import { Tasks } from "./components/tasks";
import { getTasks } from "@/actions/task";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LOGIN } from "@/routes";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function TaskPage() {
  const result = await validateRequest();
  const tasks = await getTasks();

  if (result.user)
    return (
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks
            </p>
          </div>
          <UserNav navBtns={navBtns} user={result.user} />
        </div>
        <Tasks data={tasks} />
      </div>
    );
  else redirect(LOGIN);
}

const navBtns: NavigationButton[] = [
  {
    label: "Employees",
    href: "/employees",
  },
];
