"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface LightboxImage {
  src: string;
  caption?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isFirst = index === 0;
  const isLast = index === images.length - 1;
  const current = images[index];

  const goTo = useCallback(
    (next: number) => {
      const moved = (next + images.length) % images.length;
      setIndex(moved);
    },
    [images.length],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    },
    [index, goTo, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      goTo(dx > 0 ? index - 1 : index + 1);
    }
    setTouchStart(null);
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen photo view"
      className="fixed inset-0 z-[100] bg-walnut/[92] flex items-center justify-center p-4 sm:p-6 outline-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={(e) => {
        if (!touchStart) return;
        const dx = e.touches[0].clientX - touchStart.x;
        const dy = e.touches[0].clientY - touchStart.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) e.preventDefault();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
        aria-label="Close photo view"
      >
        <X size={20} strokeWidth={2} />
      </button>

      <button
        onClick={() => goTo(index - 1)}
        disabled={isFirst}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center opacity-50 disabled:opacity-20 hover:bg-white/20 disabled:hover:bg-white/10 transition"
      >
        <ArrowLeft size={20} strokeWidth={2} />
      </button>

      <button
        onClick={() => goTo(index + 1)}
        disabled={isLast}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center opacity-50 disabled:opacity-20 hover:bg-white/20 disabled:hover:bg-white/10 transition"
      >
        <ArrowRight size={20} strokeWidth={2} />
      </button>

      <div
        className="relative max-w-[88vw] max-h-[86vh] flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt ?? ""}
          width={current.width ?? 1200}
          height={current.height ?? 800}
          className="max-w-full max-h-full object-contain block animate-[fade-in_0.4s_ease-out_forwards]"
          loading="eager"
          decoding="async"
          sizes="(max-width: 768px) 92vw, 88vw"
        />
      </div>

      {current.caption && (
        <p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-warm-white text-sm md:text-base tracking-widest uppercase leading-tight"
        >
          {current.caption}
        </p>
      )}

      <p className="absolute bottom-4 right-4 z-10 text-white/60 text-xs md:text-sm">
        {index + 1} of {images.length}
      </p>
    </div>
  );
}
