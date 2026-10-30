import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "A Little Forever — Jabez & Priya",
  description:
    "A wedding memory website celebrating the journey of a newly married couple — photographs, their story, and heartfelt wishes from friends and family.",
  openGraph: {
    title: "A Little Forever",
    description:
      "A curated collection of photographs, memories, and guest wishes for Jabez & Priya.",
    type: "website",
    images: [
      {
        url: "/uploads/hero.jpg",
        width: 1400,
        height: 900,
        alt: "A Little Forever — wedding memory website",
      },
    ],
    siteName: "A Little Forever",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Little Forever",
    description:
      "Photographs, memories, and wishes for Jabez & Priya.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F5EBDD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/uploads/hero.jpg" />
      </head>
      <body className="paper-texture">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
