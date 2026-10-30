"use client";

import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { OliveBranch } from "@/components/floral";

const WELCOME_COPY =
  "Some stories begin with a hello. Others grow through countless little moments. This is a small collection of ours — the laughter, the promises, the people who made it special, and the beginning of everything that comes next.";

export function Welcome() {
  return (
    <section className="bg-parchment relative py-16 md:py-24 overflow-hidden">
      <div className="absolute top-8 left-6 hidden md:block opacity-60">
        <OliveBranch size={64} />
      </div>
      <div className="absolute bottom-8 right-6 hidden md:block opacity-50 rotate-180">
        <OliveBranch size={56} />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center px-6">
          <AnimatedReveal>
            <p className="handwritten text-maroon text-2xl md:text-3xl italic mb-6">
              “and so, our story began…”
            </p>
          </AnimatedReveal>
          <AnimatedReveal className="reveal-delay-1">
            <p className="text-walnut text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-cap">
              {WELCOME_COPY}
            </p>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
