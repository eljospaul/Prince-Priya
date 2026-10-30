"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, Trash2 } from "lucide-react";

interface Wish {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  location?: string;
  status: "pending" | "approved" | "hidden";
  createdAt: string;
}

export default function Admin() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [optimistic, setOptimistic] = useState<Record<string, "approved" | "hidden" | "deleted">>({});

  useEffect(() => {
    fetch("/api/admin/wishes")
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        return r.json();
      })
      .then((data) => {
        setWishes(data.wishes ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load wishes.");
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: "approved" | "hidden") => {
    setOptimistic((prev) => ({ ...prev, [id]: status }));
    setWishes((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
    try {
      const response = await fetch(`/api/admin/wishes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Update failed");
    } catch {
      setWishes((prev) => prev.map((w) => (w.id === id ? { ...w, status: w.status } : w)));
      setError("Update failed — please try again.");
    } finally {
      setOptimistic((prev) => { const next = { ...prev }; delete next[id]; return next; });
    }
  };

  const removeWish = async (id: string) => {
    if (!window.confirm("Delete this wish permanently?")) return;
    setOptimistic((prev) => ({ ...prev, [id]: "deleted" }));
    setWishes((prev) => prev.filter((w) => w.id !== id));
    try {
      const response = await fetch(`/api/admin/wishes/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
    } catch {
      setError("Delete failed — please try again.");
      // reverted by refetch on next load; optimistic removal stays simple
    } finally {
      setOptimistic((prev) => { const next = { ...prev }; delete next[id]; return next; });
    }
  };

  if (loading)
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-warm-white">
        <p className="text-walnut font-serif">Loading…</p>
      </main>
    );

  return (
    <main className="bg-warm-white min-h-screen">
      <nav className="border-b border-white/60 bg-warm-white/80 sticky top-0 z-20">
        <div className="container px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-walnut text-2xl font-serif font-semibold no-underline">JP</Link>
            <span className="text-xs font-serif text-walnut/60 uppercase tracking-widest">A Little Forever</span>
          </div>
        </div>
      </nav>

      <div className="container px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
              Guest wishes
            </h2>
            <p className="text-walnut/70 text-sm">
              New messages await moderation before appearing publicly.
            </p>
          </div>
          <div className="ml-auto flex gap-3">
            <Link
              href="/wishes"
              className="btn secondary text-sm px-5 py-2.5 uppercase tracking-widest"
            >
              View public wall
            </Link>
            <button
              onClick={() => fetch("/api/auth/logout", { method: "POST" }).then(() => { window.location.href = "/admin/login"; })}
              className="btn text-sm px-5 py-2.5 uppercase tracking-widest"
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-vermilion/10 border border-vermilion/20 rounded-sm text-vermilion text-sm font-serif">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/60">
                <th className="py-4 text-walnut/60 text-xs font-serif uppercase tracking-widest">Message</th>
                <th className="py-4 text-walnut/60 text-xs font-serif uppercase tracking-widest">From</th>
                <th className="py-4 text-walnut/60 text-xs font-serif uppercase tracking-widest">Status</th>
                <th className="py-4 text-walnut/60 text-xs font-serif uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-walnut/50 text-sm font-serif">
                    No wishes yet.
                  </td>
                </tr>
              ) : (
                wishes
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((wish) => {
                    const pending = optimistic[wish.id];
                    return (
                      <tr
                        key={wish.id}
                        className="border-b border-white/60 hover:bg-white/30 transition group"
                      >
                        <td className="py-5">
                          <p className="text-walnut text-sm leading-relaxed">{wish.message}</p>
                          {wish.location && (
                            <p className="text-walnut/50 text-xs mt-1">{wish.location}</p>
                          )}
                        </td>
                        <td className="py-5">
                          <p className="text-walnut text-sm font-serif">{wish.name}</p>
                          {wish.relationship && (
                            <p className="text-walnut/50 text-xs">{wish.relationship}</p>
                          )}
                        </td>
                        <td className="py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-serif uppercase tracking-widest ${
                              wish.status === "pending"
                                ? "bg-maroon/10 border border-maroon/20 text-maroon"
                                : wish.status === "approved"
                                ? "bg-[#777A5A]/10 border border-[#777A5A]/20 text-[#777A5A]"
                                : "bg-white/50 border border-white/60 text-walnut/50"
                            }`}
                          >
                            {pending ?? wish.status}
                          </span>
                        </td>
                        <td className="py-5">
                          <div className="flex gap-2">
                            {wish.status !== "approved" && (
                              <button
                                onClick={() => updateStatus(wish.id, "approved")}
                                disabled={pending === "approved"}
                                className="w-8 h-8 flex items-center justify-center rounded border border-[#777A5A]/40 text-[#777A5A] hover:bg-[#777A5A]/10 transition"
                                title="Approve"
                              >
                                <Check size={14} strokeWidth={2} />
                              </button>
                            )}
                            {wish.status !== "hidden" && (
                              <button
                                onClick={() => updateStatus(wish.id, "hidden")}
                                disabled={pending === "hidden"}
                                className="w-8 h-8 flex items-center justify-center rounded border border-vermilion/40 text-vermilion hover:bg-vermilion/10 transition"
                                title="Hide"
                              >
                                <X size={14} strokeWidth={2} />
                              </button>
                            )}
                            <button
                              onClick={() => removeWish(wish.id)}
                              className="w-8 h-8 flex items-center justify-center rounded border border-walnut/40 text-walnut hover:bg-walnut hover:text-warm-white transition"
                              title="Delete"
                            >
                              <Trash2 size={14} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-white/60 text-sm text-walnut/60 font-serif">
          <p>
            Content (names, dates, story, photos) is maintained in the{" "}
            <code className="text-walnut underline">content/</code> directory and{" "}
            <code className="text-walnut underline">lib/store.ts</code> persists
            wishes to <code className="text-walnut underline">data/wishes.json</code>.{" "}
            Redeploy after editing content files. For hosted storage, connect
            Supabase via <code className="text-walnut underline">lib/supabase.ts</code>.
          </p>
        </div>
      </div>
    </main>
  );
}
