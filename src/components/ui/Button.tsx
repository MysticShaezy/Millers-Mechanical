"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-glow active:scale-[0.97]",
  secondary:
    "bg-brand-black text-white hover:bg-brand-dark shadow-md active:scale-[0.97]",
  outline:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.97]",
  ghost:
    "bg-transparent text-text-secondary hover:text-primary hover:bg-primary-light active:scale-[0.97]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      icon,
      fullWidth = false,
      glow = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-normal",
          "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "min-h-[44px]", // Touch target minimum
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          glow && variant === "primary" && "animate-pulse-glow",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
