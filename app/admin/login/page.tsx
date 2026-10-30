"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Invalid password.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-warm-white">
      <div className="container px-6">
        <div className="max-w-md mx-auto text-center">
          <Link href="/" className="inline-block mb-8 text-walnut text-3xl font-serif font-semibold no-underline">
            JP
          </Link>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2">
            Administration
          </h2>
          <p className="text-walnut/70 text-sm mb-8">
            Moderate guest wishes for A Little Forever.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-walnut font-serif text-sm uppercase tracking-widest">
                Admin password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 text-walnut bg-white border border-white/60 rounded-sm focus:border-gold focus:outline-none transition"
                disabled={submitting}
              />
            </div>
            {error && (
              <p className="text-vermilion text-sm font-serif" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn maroon w-full py-3 uppercase tracking-widest text-sm"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-10 text-xs font-serif text-walnut/50 uppercase tracking-widest">
            &larr; Return to the website
          </p>
        </div>
      </div>
    </main>
  );
}
