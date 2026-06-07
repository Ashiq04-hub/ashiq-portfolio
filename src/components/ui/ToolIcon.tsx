import {
  Bot,
  Code,
  Image,
  MousePointer,
  Palette,
  Search,
} from "lucide-react";
import { GitHubIcon } from "./BrandIcons";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";

const iconMap = {
  code: Code,
  "mouse-pointer": MousePointer,
  figma: Palette,
  palette: Palette,
  image: Image,
  bot: Bot,
  search: Search,
};

interface ToolIconProps {
  tool: Tool;
  className?: string;
}

function renderToolIcon(iconName: string) {
  if (iconName === "github") {
    return <GitHubIcon width={22} height={22} />;
  }

  const Icon = iconMap[iconName as keyof typeof iconMap] ?? Code;
  return <Icon size={22} />;
}

export function ToolIcon({ tool, className }: ToolIconProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-primary-container bg-surface p-4 transition-colors hover:border-tertiary",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant bg-background text-primary">
        {renderToolIcon(tool.icon)}
      </div>
      <span className="font-mono text-xs font-medium text-on-surface-variant">
        {tool.name}
      </span>
    </div>
  );
}
