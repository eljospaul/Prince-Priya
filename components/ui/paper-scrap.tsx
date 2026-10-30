"use client";

/**
 * Torn-paper / paper-scrap decorative shapes for the scrapbook look.
 */

export function PaperScrap({
  className = "",
  variant = "corner",
}: {
  className?: string;
  variant?: "corner" | "note" | "strip";
}) {
  if (variant === "note") {
    return (
      <div
        className={["relative rounded-lg border border-white/60 bg-white shadow-sm", className].join(" ")}
      />
    );
  }
  if (variant === "strip") {
    return (
      <div className={["h-1 bg-gold/60 rounded-sm", className].join(" ")} />
    );
  }
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 20 Q10 10 30 18 L100 8 Q120 6 120 26 L90 50 Q80 70 60 72 L30 80 Q10 86 0 70 Z"
        fill="#F5EBDD"
        stroke="#EFE1CE"
        strokeWidth="1"
      />
    </svg>
  );
}
