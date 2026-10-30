import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-warm-white px-6">
      <div className="text-center">
        <p className="text-6xl md:text-8xl font-serif font-semibold text-maroon">
          404
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-serif font-semibold text-espresso">
          This page isn’t here anymore.
        </h2>
        <p className="mt-3 text-walnut/70 text-sm md:text-base">
          Perhaps it was tucked into the wrong page of the album. Return to the
          beginning.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block btn text-sm py-2.5 uppercase tracking-widest"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
