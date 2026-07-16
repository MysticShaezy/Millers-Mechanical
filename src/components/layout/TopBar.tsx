import { Clock } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function TopBar() {
  return (
    <div className="bg-brand-black text-white text-sm py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-primary" aria-hidden="true" />
          <span>{siteConfig.hours.formatted}</span>
        </div>
        <div className="flex items-center gap-4 font-bold text-xs tracking-wider uppercase">
          <a
            href={siteConfig.social.facebook}
            className="hover:text-primary transition-colors duration-fast"
            aria-label="Visit us on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <span className="text-gray-600" aria-hidden="true">|</span>
          <a
            href={siteConfig.social.instagram}
            className="hover:text-primary transition-colors duration-fast"
            aria-label="Visit us on Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
