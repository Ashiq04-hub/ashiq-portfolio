import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  href?: string;
  external?: boolean;
  download?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-body-text border border-primary-container hover:bg-tertiary-hover hover:border-tertiary-hover",
  secondary:
    "bg-transparent text-body-text border-2 border-secondary-border hover:bg-primary-container hover:border-primary-container",
  ghost:
    "bg-transparent text-primary border border-outline-variant hover:border-tertiary hover:text-tertiary",
};

export function Button({
  variant = "primary",
  children,
  className,
  href,
  external,
  download,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded px-4 py-2.5 font-mono text-sm font-medium transition-colors",
    variantStyles[variant],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={styles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <a href={href} className={styles} download={download || undefined}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
