import FadeIn from "@/components/motion/FadeIn";
import { siteConfig } from "@/data/site";

export default function MapSection() {
  const mapQuery = encodeURIComponent(siteConfig.address.full);

  return (
    <section className="py-section bg-surface">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-[400px] md:h-[500px]">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Google Maps showing ${siteConfig.name} at ${siteConfig.address.full}`}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
