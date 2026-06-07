import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-destructive ms-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "flex min-h-[120px] w-full rounded-xl border bg-background px-4 py-3",
            "text-sm placeholder:text-muted-foreground resize-y",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
            error
              ? "border-destructive focus-visible:outline-destructive"
              : "border-input hover:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
