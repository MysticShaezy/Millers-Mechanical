"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl border border-border",
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchMove={(e) => handleTouchMove(e.nativeEvent)}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* After image (background) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 right-4 bg-success/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
          AFTER
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
          BEFORE
        </div>
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-brand-black rounded-full" />
            <div className="w-0.5 h-4 bg-brand-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Full Before/After section with heading */
export default function BeforeAfter() {
  return (
    <section className="py-section bg-surface">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn>
          <SectionHeading
            title="See the Difference"
            subtitle="Drag the slider to compare before and after our repair work."
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Using hero and team images as demo — replace with actual before/after photos */}
          <BeforeAfterSlider
            beforeSrc="/assets/hero-car.jpg"
            afterSrc="/assets/team-photo.jpg"
            beforeAlt="Vehicle before repair work"
            afterAlt="Vehicle after repair work at Miller Engines"
          />
          <p className="text-center text-text-muted text-sm mt-4">
            Placeholder images — replace with actual before/after repair photos
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export { BeforeAfterSlider };
