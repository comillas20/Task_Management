import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { faker } from "@faker-js/faker";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Button, buttonVariants } from "@/components/ui/button";
import { priorities, statuses } from "../data/data";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskType, taskFormSchema } from "@/schema/task-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";
import { createOrUpdateTask } from "@/actions/task";
import { imageWrapper } from "@/lib/utils";
import { Task as T } from "@prisma/client";
import { SelectEmployee } from "./select-employee";
import {
  FormRequiredLabel,
  FormRequiredMark,
} from "@/components/form-required-field-mark";

type TaskDialogProps = {
  data?: T;
  children: React.ReactNode;
};
export function TaskDialog({ data, children }: TaskDialogProps) {
  const { toast } = useToast();
  const form = useForm<TaskType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: data
      ? {
          ...data,
        }
      : {
          id: -1,
          title: "",
          description: null,
          priority: "low",
          status: "ongoing",
          assignedEmployeeId: -1,
        },
  });

  async function onSubmit(values: TaskType) {
    // server actions can't take complex objects such as Files
    // so I had to wrap the image with FormDatas
    const image = values.image ? imageWrapper(values.image as File) : undefined;
    const task = await createOrUpdateTask({ ...values, image });

    if (task) {
      toast({
        title: "Success",
        description: data ? "Updated successfully. " : "Created successfully",
        duration: 5000,
      });
    } else {
      toast({
        title: "Failed",
        description: data ? "Update failed. " : "Create failed",
        duration: 5000,
        variant: "destructive",
      });
    }

    setSelectedImage(undefined);
    form.reset();
  }

  const defaultImage =
    data && data.imageURL ? "/images/" + data.imageURL : undefined;
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    defaultImage
  );
  return (
    <Dialog>
      {children}
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{data ? "Update task" : "Create task"}</DialogTitle>
            </DialogHeader>
            <FormField
              name="assignedEmployeeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Employee
                    <FormRequiredMark />
                  </FormLabel>
                  <FormControl>
                    <SelectEmployee
                      employeeId={field.value}
                      onEmployeeIdChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>
                    Title
                    <FormRequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? undefined} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Priority
                      <FormRequiredMark />
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem
                              key={priority.value}
                              value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Status
                      <FormRequiredMark />
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid flex-1 grid-cols-3 gap-4">
                  <FormLabel>
                    <AspectRatio
                      ratio={16 / 9}
                      className="relative border border-primary bg-muted">
                      {selectedImage && (
                        <Image
                          src={selectedImage}
                          alt={data?.imageURL ?? "No image"}
                          fill
                          sizes="350px"
                          className="peer rounded-md object-cover"
                        />
                      )}
                      <div className="absolute flex h-full w-full items-center justify-center bg-transparent">
                        <Upload className="text-primary" size={20} />
                      </div>
                    </AspectRatio>
                  </FormLabel>
                  <div className="col-span-2 flex flex-col gap-2">
                    <FormLabel>Attachment (Image)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files[0];

                            // Despite what it says, const file could actually be undefined
                            // One scenario where it goes undefined is when you
                            // Select and upload image, then select another image and cancel it.
                            if (file)
                              setSelectedImage(URL.createObjectURL(file));
                            field.onChange(file);
                          } else {
                            setSelectedImage(undefined);
                          }
                        }}
                        accept="image/png, image/jpeg"
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormRequiredLabel />
            <DialogFooter>
              <DialogClose
                type="button"
                className={buttonVariants({
                  variant: "outline",
                })}
                onClick={() => {
                  setSelectedImage(defaultImage);
                  form.reset();
                }}>
                Cancel
              </DialogClose>
              <DialogClose
                type="submit"
                className={buttonVariants({
                  className: "space-x-2",
                })}
                disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
                Save
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export const TaskDialogTrigger = DialogTrigger;
