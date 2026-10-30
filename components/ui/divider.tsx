export function GoldDivider({ className = "", variant = "line" }: { className?: string; variant?: "line" | "flourish" }) {
  if (variant === "flourish") {
    return (
      <div className="flex justify-center items-center gap-2 my-8">
        <svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <path d="M10 12 Q20 4 30 12 Q40 20 50 12 Q60 4 70 12 Q80 20 90 12 Q100 4 110 12 Q120 20 130 12" stroke="#B58B50" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9" />
          <circle cx="30" cy="12" r="1.2" fill="#A92D32" />
          <circle cx="50" cy="12" r="1.2" fill="#A92D32" />
          <circle cx="70" cy="12" r="1.2" fill="#A92D32" />
          <circle cx="90" cy="12" r="1.2" fill="#A92D32" />
          <circle cx="110" cy="12" r="1.2" fill="#A92D32" />
          <circle cx="130" cy="12" r="1.2" fill="#A92D32" />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative my-10">
      <svg width="100%" height="1" viewBox="0 0 100 1" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#B58B50" strokeWidth="1" opacity="0.55" />
      </svg>
    </div>
  );
}
