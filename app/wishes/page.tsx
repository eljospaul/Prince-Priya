"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

interface Wish {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  location?: string;
  status: "pending" | "approved" | "hidden";
  createdAt: string;
}

interface FormErrors {
  name?: string;
  relationship?: string;
  message?: string;
  location?: string;
  submit?: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  const [form, setForm] = useState({
    name: "",
    relationship: "",
    message: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("/api/wishes?limit=100")
      .then((r) => r.json())
      .then((data) => {
        setWishes((data.wishes ?? []).sort(
          (a: Wish, b: Wish) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const shown = useMemo(() => wishes.slice(0, displayCount), [wishes, displayCount]);
  const hasMore = displayCount < wishes.length;

  const validate = (): boolean => {
    const next: FormErrors = {};
    let valid = true;
    if (!form.name.trim()) {
      next.name = "Please tell us your name.";
      valid = false;
    } else if (form.name.trim().length < 2) {
      next.name = "Name must be at least 2 characters.";
      valid = false;
    }
    if (form.relationship && form.relationship.length > 80) {
      next.relationship = "Relationship is too long.";
      valid = false;
    }
    if (!form.message.trim()) {
      next.message = "Please share a few words.";
      valid = false;
    } else if (form.message.trim().length < 5) {
      next.message = "Message must be at least 5 characters.";
      valid = false;
    } else if (form.message.length > 2000) {
      next.message = "Message is too long (max 2,000 characters).";
      valid = false;
    }
    if (form.location && form.location.length > 80) {
      next.location = "Location is too long.";
      valid = false;
    }
    setErrors(next);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          relationship: form.relationship.trim() || undefined,
          message: form.message.trim(),
          location: form.location.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrors({
          ...errors,
          submit: data.error || "Something went wrong. Please try again.",
          ...(data.fields ?? {}),
        });
        return;
      }

      setStatus("success");
      setForm({ name: "", relationship: "", message: "", location: "" });
      setErrors({});
      if (formRef.current) formRef.current.reset();
      setWishes((prev) => [
        { ...data.wish, status: "pending" },
        ...prev,
      ]);
    } catch {
      setStatus("error");
      setErrors({
        ...errors,
        submit: "Unable to reach the server. Your draft is safe — try again in a moment.",
      });
    } finally {
      setStatus("idle");
    }
  };

  const loadMore = () => setDisplayCount((c) => c + 12);

  const cardTints = ["ivory", "parchment", "muted-rose", "maroon-border"];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-12 left-8 hidden md:block opacity-40">
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M60 10 Q100 10 110 40 Q115 65 90 80 Q70 95 60 90 Q50 95 30 80 Q5 65 10 40 Q20 10 60 10 Z" fill="none" stroke="#B58B50" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center px-6 mb-16 md:mb-24 reveal-delay-1">
          <AnimatedReveal>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-4">
              A Little Love for the Two of You
            </h2>
            <p className="text-walnut text-lg md:text-xl leading-relaxed">
              Leave a wish, a prayer, a favourite memory, or a little advice
              for the journey ahead. Every message is a small reminder of the
              people who are cheering you on.
            </p>
          </AnimatedReveal>
        </div>

        <div className="max-w-xl mx-auto px-6 mb-20 md:mb-28">
          <AnimatedReveal className="reveal-delay-2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 md:space-y-7"
            >
              <div className="flex flex-col gap-2">
                <label className="text-walnut font-serif text-sm md:text-base uppercase tracking-widest">
                  Your name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`block w-full px-4 py-3 text-walnut bg-white border rounded-sm text-sm md:text-base ${
                    errors.name ? "border-vermilion" : "border-white/60 focus:border-gold"
                  } focus:outline-none transition`}
                  spellCheck="false"
                  autoComplete="name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p id="name-error" className="text-vermilion text-xs mt-1 font-serif" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-walnut font-serif text-sm md:text-base uppercase tracking-widest">
                  Relationship to us
                </label>
                <input
                  name="relationship"
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="block w-full px-4 py-3 text-walnut bg-white border rounded-sm text-sm md:text-base border-white/60 focus:border-gold focus:outline-none transition"
                  spellCheck="false"
                  autoComplete="off"
                  aria-describedby={errors.relationship ? "relationship-error" : undefined}
                  aria-invalid={!!errors.relationship}
                  placeholder="e.g. friend, cousin, colleague"
                />
                {errors.relationship && (
                  <p id="relationship-error" className="text-vermilion text-xs mt-1 font-serif" role="alert">
                    {errors.relationship}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-walnut font-serif text-sm md:text-base uppercase tracking-widest">
                  Your message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className={`block w-full px-4 py-3 text-walnut bg-white border rounded-sm text-sm md:text-base ${
                    errors.message ? "border-vermilion" : "border-white/60 focus:border-gold"
                  } focus:outline-none transition`}
                  spellCheck="true"
                  maxLength={2000}
                  aria-describedby={errors.message ? "message-error" : "message-hint"}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p id="message-error" className="text-vermilion text-xs mt-1 font-serif" role="alert">
                    {errors.message}
                  </p>
                )}
                <p id="message-hint" className="text-walnut/50 text-xs mt-1">
                  Up to 2,000 characters ({form.message.length}/2,000)
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-walnut font-serif text-sm md:text-base uppercase tracking-widest">
                  Your location (optional)
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="block w-full px-4 py-3 text-walnut bg-white border rounded-sm text-sm md:text-base border-white/60 focus:border-gold focus:outline-none transition"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="e.g. Delhi, India"
                  aria-describedby={errors.location ? "location-error" : undefined}
                  aria-invalid={!!errors.location}
                />
                {errors.location && (
                  <p id="location-error" className="text-vermilion text-xs mt-1 font-serif" role="alert">
                    {errors.location}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`btn maroon w-full md:w-auto px-8 py-3 text-sm md:text-base uppercase tracking-widest ${status === "submitting" ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {status === "submitting"
                  ? "Sending your wish…"
                  : "Leave a wish"}
              </button>
              {errors.submit && (
                <p className="text-vermilion text-sm font-serif text-center" role="alert">
                  {errors.submit}
                </p>
              )}
            </form>

            {status === "success" && (
              <div className="mt-6 p-6 bg-maroon/10 border border-maroon/20 rounded-sm text-center">
                <p className="text-maroon text-sm md:text-base font-serif leading-relaxed">
                  Your love has been added to their story. Thank you for being
                  part of this journey.
                </p>
              </div>
            )}
          </AnimatedReveal>
        </div>

        {/* Wishes wall */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-12 md:mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
              Wishes for you both
            </h2>
            {hasMore && (
              <button
                onClick={loadMore}
                className="btn secondary text-sm px-6 py-2 uppercase tracking-widest"
              >
                Load more
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {loaded ? shown.map((wish, i) => (
              <WishCard key={wish.id} wish={wish} variant={cardTints[i % cardTints.length]} delay={i * 0.04} />
            )) : (
              <div className="lg:col-span-full text-center py-24">
                <p className="text-walnut/60 text-sm">
                  No wishes yet — be the first to leave one above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WishCard({
  wish,
  variant,
  delay,
}: {
  wish: Wish;
  variant: string;
  delay: number;
}) {
  const date = new Date(wish.createdAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const styles: Record<string, string> = {
    ivory: "bg-[#F5EBDD]/50 border border-white/70",
    parchment: "bg-[#EFE1CE]/40 border border-white/70",
    "muted-rose": "bg-[#B77D78]/12 border border-[#B77D78]/30",
    "maroon-border": "bg-white border border-[#702B32]/30",
  };

  return (
    <AnimatedReveal className="reveal" style={{ transitionDelay: `${delay}s` }}>
      <article
        className={`p-5 md:p-7 rounded-sm border ${styles[variant]} relative`}
      >
        <p className="text-walnut text-sm md:text-base leading-relaxed mb-4">
          “{wish.message}”
        </p>
        <div className="flex flex-col gap-1">
          <p className="text-walnut font-serif text-sm md:text-base uppercase tracking-widest">
            {wish.name}
          </p>
          {wish.relationship && (
            <p className="text-walnut/60 text-xs tracking-widest uppercase">
              {wish.relationship}
            </p>
          )}
          <p className="text-walnut/50 text-xs tracking-widest uppercase mt-2">
            {date}
          </p>
        </div>
      </article>
    </AnimatedReveal>
  );
}
