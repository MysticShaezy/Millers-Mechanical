"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import ScrollExpandMedia from "@/components/blocks/ScrollExpandMedia";
import HeroBannerTransition from "@/components/sections/HeroBannerTransition";
import HeroPills from "@/components/sections/HeroPills";
import MobileNav from "@/components/layout/MobileNav";

/**
 * Cinematic hero scroll sequence — restructured phases.
 *
 * Phase 1 (ScrollExpandMedia, custom scroll lock):
 *   Workshop image expands from card → full viewport.
 *   Text ("MILLER" / "ENGINES") splits apart.
 *   Logo fades/scales in SIMULTANEOUSLY (synced to expandProgress).
 *   Floating hero pills visible throughout.
 *
 * Phase 2 (window.scrollY 0→400):
 *   Red services marquee banner parallaxes upward into frame.
 *   Backdrop gradually darkens.
 *
 * Phase 3 (window.scrollY 400→600):
 *   Hero pills fade out (merge into NavShell's sticky bar).
 *   After ~500px scrollY, NavShell becomes visible.
 *
 * The hero viewport stays sticky while the scroll runway is consumed,
 * then scrolls away naturally as page content takes over.
 */
export default function CinematicHero() {
  const scrollY = useMotionValue(0);
  const [expandProgress, setExpandProgress] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  // Track window scroll for Phase 2 & 3
  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  // Callback from ScrollExpandMedia — drives logo opacity + scale
  const handleProgressChange = useCallback((progress: number) => {
    setExpandProgress(progress);
  }, []);

  // ── Logo: synced to expansion progress (Phase 1) ─────────────────────
  const logoOpacity = expandProgress;
  const logoScale = 0.3 + expandProgress * 0.7;

  // ── Phase 2: Banner parallax — scrollY 0→400px ───────────────────────
  const phase2Progress = useTransform(scrollY, (v: number) =>
    Math.min(Math.max(v / 400, 0), 1)
  );
  const bannerY = useTransform(
    phase2Progress,
    (p: number) => `${(1 - p) * 100}%`
  );
  const backdropOpacity = useTransform(
    phase2Progress,
    (p: number) => p * 0.7
  );

  // ── Phase 3: Pill merge — scrollY 400→600px ──────────────────────────
  const pillMergeProgress = useTransform(scrollY, (v: number) =>
    Math.min(Math.max((v - 400) / 200, 0), 1)
  );
  const [pillProgress, setPillProgress] = useState(0);
  useEffect(() => {
    const unsubscribe = pillMergeProgress.on("change", setPillProgress);
    return unsubscribe;
  }, [pillMergeProgress]);

  return (
    <div
      className="relative w-full"
      style={{ height: "calc(100dvh + 600px)" }}
    >
      {/* ── Sticky viewport ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-[1] h-dvh w-full overflow-hidden bg-black">
        {/* Phase 1: Workshop expansion + text split */}
        <div className="absolute inset-0 z-0">
          <ScrollExpandMedia
            mediaType="image"
            mediaSrc="/assets/workshop.jpg"
            bgImageSrc="/assets/hero-car.jpg"
            title="MILLER ENGINES"
            date="TOOWOOMBA QLD"
            scrollToExpand="SCROLL TO EXPLORE"
            textBlend={true}
            onProgressChange={handleProgressChange}
          />
        </div>

        {/* Phase 2: Backdrop darken */}
        <motion.div
          className="absolute inset-0 z-[12] bg-black pointer-events-none"
          style={{ opacity: backdropOpacity }}
        />

        {/* Phase 1 (synced): Logo reveal — scales/fades with expansion */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: logoOpacity }}
        >
          <div
            style={{ transform: `scale(${logoScale})` }}
            className="w-[70vw] max-w-[600px] flex flex-col items-center gap-4"
          >
            <Image
              src="/assets/transparent-logo-white-removebg-preview.png"
              alt="Miller Engines & Mechanical"
              width={600}
              height={600}
              className="w-full h-auto drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Floating hero pills — above everything except modals */}
        <HeroPills
          progress={pillProgress}
          onMobileMenuOpen={() => setIsMobileNavOpen(true)}
        />

        {/* Phase 2: Red banner parallax — slides up from below */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 z-[30]"
          style={{ y: bannerY }}
        >
          <HeroBannerTransition />
        </motion.div>
      </div>

      {/* Mobile nav drawer (triggered by pill hamburger) */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </div>
  );
}
