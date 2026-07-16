import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  dark = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-8 transition-all duration-normal",
        dark
          ? "bg-surface-dark-elevated border-border-dark"
          : "bg-surface-elevated border-border",
        hover && [
          "hover:shadow-xl hover:-translate-y-1",
          dark
            ? "hover:border-primary/40 hover:shadow-primary/5"
            : "hover:border-primary/30 hover:shadow-primary/5",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
