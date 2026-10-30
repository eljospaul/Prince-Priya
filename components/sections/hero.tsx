"use client";

import Link from "next/link";
import { couple, site } from "@/content/config";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col justify-between items-start overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/hero.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#493126]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#493126]/45 via-[#493126]/10 to-transparent" />
      </div>

      <div className="relative z-10 container px-6 md:px-0 pt-12 pb-24 md:pb-32 pl-8 md:pl-12 pr-12 md:pr-20">
        <AnimatedReveal className="reveal-delay-1 inline-block mb-3">
          <span className="text-gold font-serif text-xs md:text-sm uppercase tracking-[0.35em]">
            a little forever
          </span>
        </AnimatedReveal>

        <AnimatedReveal className="reveal-delay-2">
          <h1 id="hero-heading" className="text-warm-white text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-tight mb-4 text-balance">
            {couple.first}<br />
            <span className="text-maroon">{couple.second}</span>
          </h1>
        </AnimatedReveal>

        <AnimatedReveal className="reveal-delay-3">
          <div className="flex items-baseline gap-3 md:gap-5">
            <time className="text-warm-white/90 font-serif text-sm md:text-base tracking-widest italic">
              {couple.dateLong}
            </time>
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="reveal-delay-3 mt-6 md:mt-8">
          <p className="handwritten text-warm-white/95 text-xl md:text-2xl italic leading-tight">
            {site.tagline}
          </p>
        </AnimatedReveal>
      </div>

      <AnimatedReveal className="reveal-delay-3">
        <div className="relative z-10 w-full px-6 md:px-0 pb-8 md:pb-16 pl-8 md:pl-12">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-warm-white rounded-full animate-pulse" />
            <span className="text-warm-white/80 text-xs md:text-sm uppercase tracking-[0.4em] font-serif">
              scroll
            </span>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
