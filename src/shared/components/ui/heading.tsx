import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4;
};

export function Heading({
  level = 2,
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as any;

  const sizes = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold",
    3: "text-2xl font-semibold",
    4: "text-xl font-medium"
  };

  return (
    <Tag
      className={cn(sizes[level], "text-primary", className)}
      {...props}
    />
  );
}
