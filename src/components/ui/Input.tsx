import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="font-mono text-sm font-medium text-on-surface-variant">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={errorId}
        className={cn(
          "rounded border border-primary-container bg-background px-4 py-2.5 font-sans text-sm text-body-text outline-none transition-colors",
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
