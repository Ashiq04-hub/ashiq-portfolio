"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { siteInfo, about } from "@/lib/data";
import { SocialLink } from "@/components/ui/SocialLink";
import {
  ReactIcon,
  TypeScriptIcon,
  NodeJsIcon,
  PostgreSQLIcon,
  MongoDBIcon,
  PythonIcon,
  NextJsIcon,
  TailwindIcon,
} from "@/components/ui/BrandIcons";

const ease = [0.25, 0.1, 0.25, 1] as const;

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease },
  }),
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, delay: 0.35, ease },
  },
};

// Each tech icon: label, color, position (% from top-left of column), float delay
const TECH_ICONS = [
  { id: "react",      Icon: ReactIcon,      color: "#61DAFB", top: "8%",  left: "2%",  delay: 0    },
  { id: "typescript", Icon: TypeScriptIcon, color: "#3178C6", top: "5%",  right: "8%", delay: 0.6  },
  { id: "nodejs",     Icon: NodeJsIcon,     color: "#68A063", top: "30%", left: "0%",  delay: 1.2  },
  { id: "postgresql", Icon: PostgreSQLIcon, color: "#336791", top: "28%", right: "2%", delay: 0.3  },
  { id: "mongodb",    Icon: MongoDBIcon,    color: "#4DB33D", top: "55%", left: "4%",  delay: 0.9  },
  { id: "python",     Icon: PythonIcon,     color: "#F7C948", top: "60%", right: "0%", delay: 1.5  },
  { id: "nextjs",     Icon: NextJsIcon,     color: "#FFFFFF", top: "78%", left: "8%",  delay: 0.4  },
  { id: "tailwind",   Icon: TailwindIcon,   color: "#38BDF8", top: "80%", right: "6%", delay: 1.1  },
] as const;

function FloatingIcon({
  Icon,
  color,
  delay,
  style,
  reduced,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  delay: number;
  style: React.CSSProperties;
  reduced: boolean;
}) {
  const content = (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant"
      style={{ backgroundColor: "#1D2024" }}
    >
      <Icon width={22} height={22} style={{ color }} />
    </div>
  );

  if (reduced) {
    return (
      <div className="absolute" style={style}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute"
      style={style}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {content}
    </motion.div>
  );
}

function HeroPhoto({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex h-full min-h-[500px] items-end justify-end">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 aspect-square w-[110%] translate-y-[5%]"
        style={{
          background:
            "radial-gradient(circle, rgba(29, 158, 117, 0.15) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      {/* Floating tech icons */}
      {TECH_ICONS.map(({ id, Icon, color, top, delay, ...pos }) => {
        const style: React.CSSProperties = { top };
        if ("left" in pos) style.left = pos.left;
        if ("right" in pos) style.right = pos.right;
        return (
          <FloatingIcon
            key={id}
            Icon={Icon}
            color={color}
            delay={delay}
            style={style}
            reduced={reduced}
          />
        );
      })}

      {/* Photo */}
      <Image
        src="/images/myphoto.png"
        alt={about.avatar.alt}
        width={431}
        height={462}
        priority
        sizes="(max-width: 1024px) 50vw, 560px"
        className="relative z-10 h-full min-h-[500px] w-auto object-contain object-bottom"
      />
    </div>
  );
}

function HeroPhotoColumn({ animated, reduced }: { animated: boolean; reduced: boolean }) {
  if (!animated) {
    return <HeroPhoto reduced={reduced} />;
  }
  return (
    <motion.div
      className="h-full min-h-[500px] w-full"
      initial="hidden"
      animate="visible"
      variants={slideFromRight}
    >
      <HeroPhoto reduced={reduced} />
    </motion.div>
  );
}

function HeroMotion({
  delay,
  children,
  className,
}: {
  delay: number;
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={slideFromLeft}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  return (
    <section
      id="hero"
      className="relative min-h-screen scroll-mt-16 overflow-hidden pt-16"
      style={{
        backgroundColor: "#111318",
        backgroundImage:
          "radial-gradient(rgba(225, 226, 233, 0.045) 1px, transparent 1px), linear-gradient(rgba(225, 226, 233, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 226, 233, 0.025) 1px, transparent 1px)",
        backgroundSize: "28px 28px, 56px 56px, 56px 56px",
      }}
    >
      <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[1280px] items-center px-4 md:px-20">
        <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
          <div className="flex h-full flex-col justify-center">
            <HeroMotion delay={0}>
              <p className="font-mono text-sm font-medium text-[#1D9E75]">
                // available for hire
              </p>
            </HeroMotion>
            <HeroMotion delay={0.1}>
              <p className="mt-4 font-sans text-3xl text-body-text md:text-4xl">
                Hey There,
              </p>
            </HeroMotion>
            <HeroMotion delay={0.2}>
              <h1 className="mt-2 font-mono text-4xl font-bold leading-tight tracking-tight text-body-text md:text-5xl lg:text-6xl">
                I&apos;m Ashiq Alsinawi
              </h1>
            </HeroMotion>
            <HeroMotion delay={0.3}>
              <p className="mt-4 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-[#1D9E75] md:text-base">
                Aspiring Software Engineer
              </p>
            </HeroMotion>
            <HeroMotion delay={0.4}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-text md:text-lg">
                I build clean and scalable software solutions, and I love what I do.
              </p>
            </HeroMotion>
            <HeroMotion delay={0.5}>
<div className="mt-8 flex flex-wrap gap-4">
  <a
    href="/projects"
    className="inline-flex items-center justify-center rounded bg-[#1D9E75] px-6 py-3 font-mono text-sm font-medium text-body-text transition-colors hover:bg-[#68dbae]"
  >
    View Projects
  </a>

  <a
    href={siteInfo.resumePath}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded border-2 border-[#1D9E75] px-6 py-3 font-mono text-sm font-medium text-[#1D9E75] transition-colors hover:bg-[#1D9E75]/10"
  >
    Download Resume
  </a>
</div>
            </HeroMotion>
            <HeroMotion delay={0.6}>
              <div className="mt-8 flex gap-3">
                {siteInfo.socialLinks.map((link) => (
                  <SocialLink
                    key={link.platform}
                    platform={link.platform}
                    url={link.url}
                    label={link.label}
                  />
                ))}
              </div>
            </HeroMotion>
          </div>
          <HeroPhotoColumn animated={!prefersReducedMotion} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}