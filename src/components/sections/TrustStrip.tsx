import MarqueeStrip from "@/components/motion/MarqueeStrip";
import { services } from "@/data/services";

export default function TrustStrip() {
  return (
    <div className="w-full bg-primary text-white py-4">
      <MarqueeStrip speed="normal">
        {services.map((service) => (
          <div key={service.slug} className="flex items-center gap-10 mx-5">
            <span className="font-bold text-lg md:text-xl tracking-wider whitespace-nowrap">
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
