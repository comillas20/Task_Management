import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";
import { TaskColumnType } from "./task-columns";
import { priorities } from "../data/data";
import { cn } from "@/lib/utils";
type TaskCardProps = {
  data: TaskColumnType;
};

export function TaskCard({ data }: TaskCardProps) {
  const priorityColor = priorities.find(
    (priority) => priority.value === data.priority
  )?.color;
  return (
    <Card className="flex min-h-96 flex-col pb-4 shadow-md">
      <CardHeader className="flex-row justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h5 className="text-sm font-medium">
              {data?.assignedEmployee.name}
            </h5>
            <p className="text-xs">
              {data.assignedEmployee.position ?? "<No position>"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h5 className="text-sm">{format(data.createdAt, "PPPP")}</h5>
          <div className={cn("justify-end text-xs capitalize", priorityColor)}>
            {data.priority.concat(" Priority")}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 space-y-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{data.title}</h3>
          <span className="text-sm capitalize">{data.status} Task</span>
        </div>

        <p className="w-full whitespace-pre-wrap break-words text-sm">
          {data.description ?? "<No description>"}
        </p>
        {data.imageURL && (
          <div className="flex w-1/2 flex-col gap-2">
            <span className="text-sm font-medium">Attachment</span>
            <AspectRatio
              ratio={16 / 9}
              className="flex items-center justify-center border border-primary bg-muted">
              <Image
                src={"/images/" + data.imageURL}
                alt={data.imageURL}
                fill
                className="object-cover"
                loading="lazy"
              />
            </AspectRatio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
