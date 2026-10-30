/**
 * A Little Forever — restrained botanical illustrations.
 *
 * Delicate SVG sprites inspired by vintage wedding stationery. Used
 * sparingly at section boundaries and near photographs — never scattered
 * across every section. All are stroke-based, lightweight, and inert.
 */

export function OliveBranch({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 4 Q30 4 36 14 Q38 22 34 30 Q28 34 20 34 Q12 34 6 28 Q2 20 6 12 Q12 4 20 4 Z"
        stroke="#777A5A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
      {[
        [22, 8], [26, 14], [30, 20], [28, 26], [22, 30], [16, 30], [12, 26], [10, 18], [14, 12], [18, 8],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.4" fill="#B77D78" opacity="0.9" />
      ))}
    </svg>
  );
}

export function SmallBlossom({ className = "", size = 26 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2 C10.35 2 9 3.35 9 5 C9 6.65 10.35 8 12 8 C13.65 8 15 6.65 15 5 C15 3.35 13.65 2 12 2 Z"
        fill="#EFE1CE"
        stroke="#B58B50"
        strokeWidth="1"
      />
      <path
        d="M12 16 C10.35 16 9 17.35 9 19 C9 20.65 10.35 22 12 22 C13.65 22 15 20.65 15 19 C15 17.35 13.65 16 12 16 Z"
        fill="#EFE1CE"
        stroke="#B58B50"
        strokeWidth="1"
      />
      <path
        d="M2 12 C4 12 5.65 10.35 8 10.35 C10.35 10.35 12 12 12 12 C12 12 10.35 13.65 8 13.65 C5.65 13.65 4 12 2 12 Z"
        fill="#EFE1CE"
        stroke="#B58B50"
        strokeWidth="1"
      />
      <path
        d="M22 12 C20 12 18.35 13.65 16 13.65 C13.65 13.65 12 12 12 12 C12 12 13.65 10.35 16 10.35 C18.35 10.35 20 12 22 12 Z"
        fill="#EFE1CE"
        stroke="#B58B50"
        strokeWidth="1"
      />
      <circle cx="12" cy="12" r="1.6" fill="#A92D32" />
    </svg>
  );
}

export function GoldDivider({ className = "", variant = "line" }: { className?: string; variant?: "line" | "flourish" }) {
  if (variant === "flourish") {
    return (
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M10 12 Q20 4 30 12 Q40 20 50 12 Q60 4 70 12 Q80 20 90 12 Q100 4 110 12"
          stroke="#B58B50"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <circle cx="30" cy="12" r="1.2" fill="#A92D32" />
        <circle cx="50" cy="12" r="1.2" fill="#A92D32" />
        <circle cx="70" cy="12" r="1.2" fill="#A92D32" />
        <circle cx="90" cy="12" r="1.2" fill="#A92D32" />
        <circle cx="110" cy="12" r="1.2" fill="#A92D32" />
      </svg>
    );
  }
  return (
    <svg
      width="100%"
      height="1"
      viewBox="0 0 100 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#B58B50" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

export function TinyHeart({ className = "", size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 16 C7 16 5 14 5 12 C5 10 7 8 10 8 C13 8 15 10 15 12 C15 14 13 16 10 16 Z"
        stroke="#A92D32"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function PageCorner({ className = "", side = "top-left" }: { className?: string; side?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  // A delicate corner flourish in muted olive
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M28 4 C14 4 4 14 4 28 C4 36 9 42 16 44 C20 45 24 44 28 44 C36 44 44 36 44 28 C44 14 36 4 28 4 Z"
        fill="#777A5A"
        opacity="0.18"
      />
      <path
        d="M12 12 Q28 4 44 12 Q52 20 44 28 Q36 36 28 28 Q20 20 12 12 Z"
        fill="none"
        stroke="#777A5A"
        strokeWidth="1"
        opacity="0.35"
      />
    </svg>
  );
}
