import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border px-3 py-2 outline-none focus:border-primary",
        className
      )}
      {...props}
    />
  );
}
