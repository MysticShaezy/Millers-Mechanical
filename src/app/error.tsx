"use client";

import Button from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-primary" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-brand-black mb-4">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          We apologise for the inconvenience. Please try again, or contact us
          directly if the issue persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-8 text-left text-xs text-text-muted bg-surface rounded-lg p-4 overflow-auto max-h-48">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}
