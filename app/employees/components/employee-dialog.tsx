import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Employee } from "@prisma/client";
import { employeeFormSchema } from "@/schema/employee-form-schema";
import { createOrUpdateEmployee } from "@/actions/employee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statuses } from "../data/data";
import {
  FormRequiredLabel,
  FormRequiredMark,
} from "@/components/form-required-field-mark";

type EmployeeDialogProps = {
  data?: Employee;
  children: React.ReactNode;
};
/* A  dialog for creating or updating an employee */
export function EmployeeDialog({ data, children }: EmployeeDialogProps) {
  const { toast } = useToast();
  const form = useForm<Employee>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: data
      ? {
          ...data,
        }
      : {
          id: -1,
          name: "",
          contactNo: null,
          email: null,
          position: null,
          status: "working",
        },
  });

  async function onSubmit(values: Employee) {
    const employee = await createOrUpdateEmployee(values);
    if (employee) {
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

    form.reset();
  }

  return (
    <Dialog>
      {children}
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {data ? "Update employee" : "Create employee"}
              </DialogTitle>
            </DialogHeader>

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>
                    Name
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
              name="position"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contactNo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact No.</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Status
                    <FormRequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
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
            <FormRequiredLabel />
            <DialogFooter>
              <DialogClose
                type="button"
                className={buttonVariants({
                  variant: "outline",
                })}>
                Cancel
              </DialogClose>
              <Button
                type="submit"
                className="space-x-2"
                disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export const EmployeeDialogTrigger = DialogTrigger;
