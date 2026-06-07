import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  size?: "xl" | "lg" | "md" | "sm";
  accent?: boolean;
}

const sizeMap: Record<NonNullable<HeadingProps["size"]>, string> = {
  xl: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
  lg: "text-3xl md:text-4xl font-bold leading-tight",
  md: "text-2xl md:text-3xl font-semibold leading-snug",
  sm: "text-xl md:text-2xl font-semibold leading-snug",
};

const defaultSizeForLevel: Record<Level, HeadingProps["size"]> = {
  1: "xl",
  2: "lg",
  3: "md",
  4: "sm",
};

export function Heading({
  level = 2,
  size,
  accent = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const resolvedSize = size ?? defaultSizeForLevel[level];

  return (
    <Tag
      className={cn(
        sizeMap[resolvedSize!],
        "text-balance",
        accent && "accent-underline",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
