import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border px-3 py-2 outline-none focus:border-primary",
        className
      )}
      {...props}
    />
  );
}
