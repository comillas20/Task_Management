import { Metadata } from "next";

import { UserNav } from "./components/user-nav";
import { TaskDisplay } from "./task-display";
import { getTasks } from "@/actions/task";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks!
          </p>
        </div>
        <UserNav />
      </div>
      <TaskDisplay data={tasks} />
    </div>
  );
}
