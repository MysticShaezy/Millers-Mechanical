"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import Logo from "@/components/ui/Logo";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-sticky w-full transition-all duration-normal",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-white border-b border-border"
        )}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Logo variant="dark" />

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-semibold text-brand-black hover:text-primary transition-colors duration-fast group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-normal group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Phone CTA — visible on tablet+ */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors min-h-[44px]"
              onClick={() => analytics.phoneClick()}
              aria-label={`Call us at ${siteConfig.phoneFormatted}`}
            >
              <Phone size={20} aria-hidden="true" />
              <span className="hidden lg:inline">{siteConfig.phoneFormatted}</span>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-brand-black hover:text-primary transition-colors rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
