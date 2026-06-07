import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={textareaId}
        className="font-mono text-sm font-medium text-on-surface-variant"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-describedby={errorId}
        className={cn(
          "min-h-32 resize-y rounded border border-primary-container bg-background px-4 py-2.5 font-sans text-sm text-body-text outline-none transition-colors",
          "focus:border-tertiary-focus focus:border-l-2 focus:border-l-tertiary-focus",
          error && "border-error",
          className,
        )}
        {...props}
      />
      {error && <p id={errorId} className="text-sm text-error">{error}</p>}
    </div>
  );
}
