"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { OliveBranch } from "@/components/floral";

export function StoryPreview() {
  return (
    <section className="py-16 md:py-24 bg-warm-white/40">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1 reveal-delay-1">
            <div className="frame">
              <Image
                src="/uploads/story-01.jpg"
                alt="Where it began — pre-wedding photograph"
                width={700}
                height={900}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <OliveBranch className="absolute -top-6 left-0 hidden md:block opacity-60" size={48} />
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight mb-4">
              Our story
            </h2>
            <p className="handwritten text-maroon text-xl italic mb-6">
              “same team, always.”
            </p>
            <p className="text-walnut leading-relaxed mb-6 max-w-xl">
              It started with a simple conversation — just a hello that neither
              of us knew would lead to so much. Two separate worlds slowly
              started to feel like home in each other.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-walnut font-serif font-semibold text-sm md:text-base no-underline uppercase tracking-widest hover:text-maroon transition"
            >
              Read the full story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
