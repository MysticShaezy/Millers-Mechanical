"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Calendar, Clock, Menu } from "lucide-react";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";

interface HeroPillsProps {
  /** 0 = fully visible, 1 = fully hidden (merge transition) */
  progress: number;
  /** 0→1 as workshop image expands — pills glide upward to stay in black padding */
  expandProgress?: number;
  /** Trigger to open the mobile nav drawer */
  onMobileMenuOpen: () => void;
}

/**
 * Floating pill buttons that overlay the hero section.
 *
 * LEFT pill: Brand logo + "MILLER ENGINES" + hours
 * RIGHT pill: Phone number + "Book Service" CTA + mobile hamburger
 *
 * As `progress` goes from 0→1, the pills fade out and slide up,
 * visually merging into the sticky nav bar that appears.
 */
export default function HeroPills({
  progress,
  expandProgress = 0,
  onMobileMenuOpen,
}: HeroPillsProps) {
  const opacity = Math.max(1 - progress * 2, 0); // fully gone by progress 0.5
  // Combine: glide up ~16px during expansion + slide up further during merge
  const expandOffset = expandProgress * -16;
  const mergeOffset = -(progress * 24);
  const translateY = expandOffset + mergeOffset;

  return (
    <div
      className="absolute inset-x-0 top-0 z-40 pointer-events-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
      }}
    >
      <div className="flex items-start justify-between px-4 pt-4 md:px-6 md:pt-5">
        {/* ── LEFT PILL — Brand + Hours ─────────────────────────────── */}
        <div className="pointer-events-auto flex items-center gap-2 bg-brand-black/90 backdrop-blur-md rounded-full px-3 py-2 md:px-4 md:py-2.5 border border-border-dark shadow-2xl">
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[36px]"
            aria-label="Miller Engines & Mechanical — Home"
          >
            <Image
              src="/assets/transparent-logo-white-removebg-preview.png"
              alt=""
              width={32}
              height={32}
              className="w-7 h-7 md:w-8 md:h-8 object-contain flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-white font-bold text-xs md:text-sm tracking-tight whitespace-nowrap">
              MILLER ENGINES
            </span>
          </Link>

          {/* Divider + hours — desktop only */}
          <span
            className="hidden md:block text-white/20 text-lg select-none"
            aria-hidden="true"
          >
            |
          </span>
          <div className="hidden md:flex items-center gap-1.5 text-white/60">
            <Clock size={14} aria-hidden="true" />
            <span className="text-xs whitespace-nowrap">
              {siteConfig.hours.formatted}
            </span>
          </div>
        </div>

        {/* ── RIGHT PILL — Phone + Book + Mobile Menu ──────────────── */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-brand-black/90 backdrop-blur-md rounded-full px-2 py-2 md:px-2.5 md:py-2.5 border border-border-dark shadow-2xl">
          {/* Phone */}
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => analytics.ctaClick("hero_pill_call")}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-white font-semibold hover:text-primary transition-colors rounded-full min-h-[36px]"
            aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
          >
            <Phone size={16} />
            <span className="hidden md:inline text-sm">
              {siteConfig.phoneFormatted}
            </span>
          </a>

          {/* Book Service CTA */}
          <a
            href="/contact"
            onClick={() => analytics.ctaClick("hero_pill_book")}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-4 py-2 md:px-5 md:py-2 rounded-full transition-colors shadow-glow min-h-[36px] text-sm"
          >
            <Calendar size={16} />
            <span className="whitespace-nowrap">Book Service</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-white hover:text-primary transition-colors rounded-full min-w-[36px] min-h-[36px]"
            onClick={onMobileMenuOpen}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
