"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

/**
 * Cinematic scroll-expanding hero.
 *
 * ARCHITECTURE FIX: This component uses a tall scrollable container (300vh)
 * and framer-motion's useScroll to calculate progress based on the component's
 * position in the viewport. NO global scroll hijacking (window.scrollTo).
 * Users can scroll naturally past the component at any time.
 */
export default function ScrollExpandMedia({
  mediaSrc,
  title,
  subtitle,
  children,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to visual properties
  // Phase 1 (0-0.5): Media expands from centered card to full-width
  // Phase 2 (0.5-1.0): Content fades in, title moves out
  const mediaScale = useTransform(scrollYProgress, [0, 0.4], [0.45, 1]);
  const mediaBorderRadius = useTransform(scrollYProgress, [0, 0.35], [24, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0.3]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.55], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.45, 0.65], [60, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky viewport — stays in view while user scrolls the 300vh container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Expanding media */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            scale: isMobile ? 1 : mediaScale,
            borderRadius: mediaBorderRadius,
          }}
        >
          <Image
            src={mediaSrc}
            alt={title || "Hero image"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Title text — split words for cinematic effect */}
        {title && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-difference"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <h1 className="sr-only">{title}</h1>
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter"
              aria-hidden="true"
            >
              {firstWord}
            </span>
            {restOfTitle && (
              <span
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter"
                aria-hidden="true"
              >
                {restOfTitle}
              </span>
            )}
            {subtitle && (
              <span className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-300 mt-4">
                {subtitle}
              </span>
            )}
          </motion.div>
        )}

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium">
            Scroll to explore
          </span>
          <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Children content — fades in as hero expands */}
        {children && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
