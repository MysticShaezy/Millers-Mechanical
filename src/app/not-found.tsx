import Link from "next/link";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary mb-4">404</p>
        <h1 className="text-3xl font-bold text-brand-black mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link href="/">
          <Button variant="primary" icon={<Home size={20} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
