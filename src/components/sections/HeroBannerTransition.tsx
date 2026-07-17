import MarqueeStrip from "@/components/motion/MarqueeStrip";
import { services } from "@/data/services";

/**
 * Phase 3 of the cinematic hero sequence.
 *
 * A full-width red banner with an infinite scrolling marquee of service names.
 * Parallaxes upward into the viewport, overlaying the logo and Ferrari backdrop.
 * Marks the transition boundary between the cinematic hero and standard page content.
 */
export default function HeroBannerTransition() {
  return (
    <div className="w-full bg-primary py-5 md:py-6">
      <MarqueeStrip speed="normal">
        {services.map((service) => (
          <div key={service.slug} className="flex items-center gap-10 mx-5">
            <span className="font-bold text-lg md:text-xl text-white tracking-wider whitespace-nowrap">
              {service.title}
            </span>
            <span className="text-white/40 text-2xl" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </MarqueeStrip>
    </div>
  );
}
