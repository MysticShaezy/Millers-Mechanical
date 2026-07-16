export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing brand accent loader */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
        </div>
        <p className="text-text-muted font-medium text-sm tracking-wider uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
