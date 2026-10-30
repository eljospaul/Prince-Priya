"use client";

import Image from "next/image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export function Closing() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-t border-white/70">
      <div className="container relative z-10 px-6">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
          <div className="relative max-w-[700px] w-full aspect-[4/3]">
            <div className="frame">
              <Image
                src="/uploads/story-04.jpg"
                alt="The couple — closing portrait"
                width={1000}
                height={750}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -inset-2 border border-gold/50 rounded-sm pointer-events-none" aria-hidden="true" />
          </div>
          <AnimatedReveal>
            <p className="handwritten text-3xl md:text-4xl text-maroon italic text-center leading-tight max-w-lg">
              “Here’s to all the beautiful moments still waiting to happen.”
            </p>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
