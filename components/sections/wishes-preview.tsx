"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export function WishesPreview() {
  const [wishes, setWishes] = useState<
    Array<{ name: string; message: string; relationship?: string }>
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/wishes?limit=6")
      .then((r) => r.json())
      .then((data) => {
        setWishes(data.wishes ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-10 right-8 hidden md:block opacity-50">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 19.58 2 17.16 2 14a2 2 0 0 1 2-2c0-.56.2-1 .55-1.36l1.12-1.4 1.12-1.4C5.4 8.5 5.1 7.5 4 7a2 2 0 0 1 4 0c0 .56-.3 1.5-.8 2.6l-.9 1.1-.9 1.1C5.1 12.5 5.4 13.5 6.55 15 7 14.44 7.2 14 8 14c1.1 0 2-.9 2-2 0-.55-.2-1-.55-1.36L11.45 9 12 7.65l0.55 1.35C14.2 13 14.5 14 15.45 14C16.9 14 17.2 15 17.2 15c0 .56-.3 1.5-.8 2.6l-.9 1.1-.9 1.1C18.9 17.5 18.6 18.5 17.2 19a2 2 0 0 1 4 0c0 3.16-3.4 5.58-7.8 6.35z"
            fill="#A92D32"
            opacity="0.15"
          />
        </svg>
      </div>
      <div className="container relative z-10">
        <div className="flex items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
              Words from our guests
            </h2>
            <p className="text-walnut/70 text-sm mt-2">
              A few of the wishes left for us so far.
            </p>
          </div>
          <Link
            href="/wishes"
            className="btn secondary text-sm md:text-base px-6 py-2.5 uppercase tracking-widest"
          >
            View all wishes
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loaded ? wishes.map((wish, i) => (
            <WishCard key={wish.name + i} wish={wish} delay={i * 0.1} />
          )) : (
            <div className="col-span-full text-center py-20">
              <p className="text-walnut/60 text-sm">
                No wishes yet — be the first to leave one.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WishCard({
  wish,
  delay,
}: {
  wish: { name: string; message: string; relationship?: string };
  delay: number;
}) {
  return (
    <AnimatedReveal
      className="reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <article className="paper-card p-6 md:p-8 border border-white/70">
        <p className="text-walnut text-sm leading-relaxed mb-3">
          “{wish.message}”
        </p>
        <p className="text-walnut/80 text-xs font-serif tracking-widest uppercase">
          {wish.name}
          {wish.relationship ? (
            <span> &middot; {wish.relationship}</span>
          ) : null}
        </p>
      </article>
    </AnimatedReveal>
  );
}
