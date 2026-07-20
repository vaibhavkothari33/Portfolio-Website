import React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // indigo focus ring has no token equivalent; mapped to the brand accent role
        "block w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-strong placeholder:text-subtle focus:border-brand focus:outline-none focus:ring-brand sm:text-sm",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
