import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-secondary text-white hover:opacity-90",
    outline: "border border-primary text-primary"
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md transition-all",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
