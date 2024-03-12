import { cn } from "@/lib/utils";

export function FormRequiredMark() {
  return <span className="text-destructive">*</span>;
}

export function FormRequiredLabel(props: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("text-xs text-destructive", props.className)}>
      * Required
    </div>
  );
}
