import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProjectStatus;
}

const statusStyles: Record<ProjectStatus, string> = {
  Completed: "border-tertiary text-tertiary",
  "In Progress": "border-primary text-primary",
  Planning: "border-outline text-on-surface-variant",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded border bg-background px-2.5 py-1 font-mono text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
