import { Mail } from "lucide-react";
import type { SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

interface SocialLinkProps {
  platform: SocialPlatform;
  url: string;
  label: string;
  className?: string;
}

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export function SocialLink({
  platform,
  url,
  label,
  className,
}: SocialLinkProps) {
  const Icon = iconMap[platform];

  return (
    <a
      href={url}
      target={platform === "email" ? undefined : "_blank"}
      rel={platform === "email" ? undefined : "noopener noreferrer"}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg border border-primary-container bg-surface text-primary transition-colors hover:border-tertiary hover:text-tertiary",
        className,
      )}
    >
      <Icon width={18} height={18} />
    </a>
  );
}
