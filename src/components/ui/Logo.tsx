"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showShimmer?: boolean;
}

export default function Logo({
  variant = "dark",
  className = "",
  showShimmer = true,
}: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-brand-black";

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 group ${className}`}
      aria-label="Miller Engines & Mechanical — Home"
    >
      {/* Logo image — swap src to /assets/logo.png when available */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src="/assets/logo.png"
          alt="Miller Engines & Mechanical logo"
          width={40}
          height={40}
          className="object-contain"
          onError={(e) => {
            // Fallback: hide broken image, text logo will remain
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <div className="relative overflow-hidden font-bold text-xl tracking-tighter py-1">
        <span className={textColor}>MILLER </span>
        <span className="text-primary">ENGINES</span>

        {/* Shimmer sweep effect */}
        {showShimmer && (
          <div
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    </Link>
  );
}
