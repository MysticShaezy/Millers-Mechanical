import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
          dark ? "text-white" : "text-brand-black"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "w-16 h-1 bg-primary rounded-full mb-6",
          align === "center" && "mx-auto"
        )}
        aria-hidden="true"
      />
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-gray-400" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
