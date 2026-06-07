import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  tight?: boolean;
}

export function Section({
  className,
  as: Tag = "section",
  tight = false,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(tight ? "py-10 md:py-14" : "py-16 md:py-24", className)}
      {...props}
    />
  );
}
