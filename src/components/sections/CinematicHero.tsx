import Link from "next/link";
import ScrollExpandMedia from "@/components/blocks/ScrollExpandMedia";
import Button from "@/components/ui/Button";
import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function CinematicHero() {
  return (
    <ScrollExpandMedia
      mediaSrc="/assets/hero-car.jpg"
      title="MILLER ENGINES"
      subtitle="TOOWOOMBA QLD"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Premium Mechanical Services
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Experience unparalleled automotive care with Miller Engines &amp;
          Mechanical. We combine decades of expertise with cutting-edge
          diagnostics to keep you running at peak performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              glow
              icon={<Phone size={20} />}
            >
              Book a Service
            </Button>
          </Link>
          <Link href="/services">
            <Button
              variant="ghost"
              size="lg"
              icon={<ArrowRight size={20} />}
              className="bg-white/5 text-white border border-white/20 backdrop-blur-md hover:bg-white/10 hover:text-white"
            >
              Our Capabilities
            </Button>
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          Or call us directly:{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-primary hover:text-white transition-colors font-semibold"
          >
            {siteConfig.phoneFormatted}
          </a>
        </p>
      </div>
    </ScrollExpandMedia>
  );
}
