/**
 * A Little Forever — central content configuration.
 *
 * Edit this file to customise the website for the couple. All names, dates,
 * captions, and asset paths live here so nothing else needs to change.
 *
 * NOTE: Names and dates below are PLACEHOLDERS. Replace them with the
 * couple's real details before launch. Do not invent biographical details.
 */

export const site = {
  title: "A Little Forever",
  tagline: "Two hearts, one little forever.",
  metadataDescription:
    "A wedding memory website celebrating the journey of a newly married couple — photographs, their story, and heartfelt wishes from friends and family.",
};

export const couple = {
  // Placeholder names — replace with the couple's real names.
  first: "Jabez",
  second: "Priya",
  display: "Jabez & Priya",
  initials: "JP",
  // Placeholder wedding date — replace with the real date.
  date: "12 October 2026",
  dateLong: "12th October, 2026",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/wishes", label: "Wishes" },
];

export const hero = {
  image: "/uploads/hero.jpg",
  // Subtle warm overlay applied behind the hero text for contrast.
  overlay: "rgba(73, 49, 38, 0.35)",
};

export const decorative = {
  // Toggle the faint paper-grain texture.
  paperTexture: true,
};
