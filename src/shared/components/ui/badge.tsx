import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-primary/10 text-primary",
        accent:      "bg-[--color-brand-accent]/15 text-[--color-brand-accent]",
        secondary:   "bg-secondary text-secondary-foreground",
        success:     "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        warning:     "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        destructive: "bg-destructive/10 text-destructive",
        outline:     "border border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
