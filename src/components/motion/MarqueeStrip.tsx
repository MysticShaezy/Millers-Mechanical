import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  children: ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
}

export default function MarqueeStrip({
  children,
  className,
  speed = "normal",
  pauseOnHover = false,
}: MarqueeStripProps) {
  const speedClass = {
    slow: "[--marquee-duration:45s]",
    normal: "[--marquee-duration:30s]",
    fast: "[--marquee-duration:18s]",
  };

  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex whitespace-nowrap animate-marquee",
          speedClass[speed],
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `var(--marquee-duration, 30s)` }}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
      </div>
    </div>
  );
}
