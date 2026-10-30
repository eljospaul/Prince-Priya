"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/config";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const el = document.getElementById("site-nav");
    if (!el) return;
    const handleScroll = () => {
      if (window.scrollY > 40) {
        el.classList.add("bg-warm-white/90", "backdrop-blur-md", "shadow-sm");
        el.classList.remove("bg-transparent");
      } else {
        el.classList.remove("bg-warm-white/90", "backdrop-blur-md", "shadow-sm");
        el.classList.add("bg-transparent");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <nav
      id="site-nav"
      className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-white/40"
      aria-label="Main navigation"
    >
      <div className="container relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-walnut text-2xl md:text-3xl font-serif font-semibold tracking-tight no-underline"
            aria-label="A Little Forever — home"
          >
            <span className="text-maroon font-serif font-bold">JP</span>
            <span className="hidden md:block handwritten italic text-base">
              A Little Forever
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-serif text-walnut/85 no-underline uppercase tracking-widest ${isActive(item.href) ? "text-maroon relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:right-0 after:h-[1px] after:bg-gold" : "hover:text-maroon"}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-walnut/30 text-walnut hover:bg-walnut hover:text-warm-white transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-warm-white/98 backdrop-blur-md" onClick={closeMenu}>
          <div className="absolute top-4 right-4">
            <button
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-walnut/30 text-walnut hover:bg-walnut hover:text-warm-white transition"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>
          <div className="container py-32 text-center">
            <nav className="flex flex-col gap-6 text-xl font-serif">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`block text-walnut no-underline ${isActive(item.href) ? "text-maroon" : "hover:text-maroon"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
