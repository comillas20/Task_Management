import { Metadata } from "next";

import { NavigationButton, UserNav } from "@/components/user-nav";
import { Tasks } from "./components/tasks";
import { getTasks } from "@/actions/task";

export const metadata: Metadata = {
  title: "Tasks",
};
/*This part used to display the tasks that are assigned to a user.*/
export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks
          </p>
        </div>
        <UserNav navBtns={navBtns} />
      </div>
      <Tasks data={tasks} />
    </div>
  );
}

const navBtns: NavigationButton[] = [
  {
    label: "Employees",
    href: "/employees",
  },
];
