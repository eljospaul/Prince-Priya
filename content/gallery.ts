/**
 * A Little Forever — photo gallery configuration.
 *
 * Add, remove, reorder, or caption photographs here without touching any
 * component code. Every photo needs a unique id, a path under /public/,
 * a category, alt text, and an optional caption.
 *
 * Categories: "pre-wedding" | "wedding" | "candid" | "details"
 * Only categories that have at least one photo appear as filters.
 */

export type PhotoCategory = "pre-wedding" | "wedding" | "candid" | "details";

export type Photo = {
  id: string;
  src: string;
  category: PhotoCategory;
  caption: string;
  alt: string;
  width: number;  // natural aspect-ratio hint (px)
  height: number; // natural aspect-ratio hint (px)
  featured?: boolean;
};

export const photos: Photo[] = [
  {
    id: "g-01",
    src: "/uploads/gallery-01.jpg",
    category: "pre-wedding",
    caption: "Golden hour, before the big day.",
    alt: "Pre-wedding portrait of the couple",
    width: 1000,
    height: 1333,
    featured: true,
  },
  {
    id: "g-02",
    src: "/uploads/gallery-02.jpg",
    category: "wedding",
    caption: "The ceremony, surrounded by family.",
    alt: "Wedding ceremony moment",
    width: 1333,
    height: 1000,
  },
  {
    id: "g-03",
    src: "/uploads/gallery-03.jpg",
    category: "candid",
    caption: "Laughter in between the rituals.",
    alt: "Candid moment during the wedding",
    width: 800,
    height: 1000,
  },
  {
    id: "g-04",
    src: "/uploads/gallery-04.jpg",
    category: "details",
    caption: "Bridal details in champagne and red.",
    alt: "Close-up of bridal attire details",
    width: 600,
    height: 800,
  },
  {
    id: "g-05",
    src: "/uploads/gallery-05.jpg",
    category: "wedding",
    caption: "Promises made, under warm light.",
    alt: "Wedding vows moment",
    width: 1000,
    height: 1333,
  },
  {
    id: "g-06",
    src: "/uploads/gallery-06.jpg",
    category: "candid",
    caption: "A quiet moment, just the two of them.",
    alt: "Candid couple portrait",
    width: 1333,
    height: 800,
    featured: true,
  },
  {
    id: "g-07",
    src: "/uploads/gallery-07.jpg",
    category: "pre-wedding",
    caption: "Walking into forever.",
    alt: "Pre-wedding candid shot",
    width: 800,
    height: 600,
  },
  {
    id: "g-08",
    src: "/uploads/gallery-08.jpg",
    category: "details",
    caption: "Rings and a handwritten note.",
    alt: "Wedding rings close-up",
    width: 600,
    height: 600,
  },
  {
    id: "g-09",
    src: "/uploads/gallery-09.jpg",
    category: "wedding",
    caption: "Celebrations with the people they love.",
    alt: "Wedding celebration with family",
    width: 1000,
    height: 1000,
  },
  {
    id: "g-10",
    src: "/uploads/gallery-10.jpg",
    category: "candid",
    caption: "Unposed, unrepeatable.",
    alt: "Candid guest moment",
    width: 1000,
    height: 1333,
  },
  {
    id: "g-11",
    src: "/uploads/gallery-11.jpg",
    category: "pre-wedding",
    caption: "Soft light, quiet conversation.",
    alt: "Pre-wedding portrait",
    width: 800,
    height: 1000,
  },
  {
    id: "g-12",
    src: "/uploads/gallery-12.jpg",
    category: "details",
    caption: "A small detail from the day.",
    alt: "Wedding detail photograph",
    width: 600,
    height: 600,
  },
];

export const categories = [
  { value: "all", label: "All Memories" },
  { value: "pre-wedding", label: "Pre-wedding" },
  { value: "wedding", label: "Wedding" },
  { value: "candid", label: "Candid Moments" },
  { value: "details", label: "Details" },
] as const;
