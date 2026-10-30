/**
 * A Little Forever — Our Story narrative.
 *
 * Editable placeholder content. Replace the paragraphs with the couple's
 * real story. Each block is one of:
 *   - text: a narrative paragraph
 *   - image: a photograph (src, alt, caption, side)
 *   - note: a short handwritten-style annotation
 *   - divider: a subtle decorative separator
 *
 * `side` ("left" | "right") alternates image/text alignment on wide screens.
 * On mobile everything flows in a single column.
 */

export type StoryBlock =
  | { type: "text"; content: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      side?: "left" | "right";
      framed?: boolean; // taped polaroid-style frame
      handwrittenNote?: string;
    }
  | { type: "note"; content: string }
  | { type: "divider" };

export const storyBlocks: StoryBlock[] = [
  {
    type: "text",
    content:
      "Different paths, one beautiful journey.",
  },
  {
    type: "text",
    content:
      "It started with a simple conversation — just a hello that neither of us knew would lead to so much. Somewhere between the little talks, the unexpected laughter, and the moments that became our favourites, two separate worlds slowly started to feel like home in each other.",
  },
  {
    type: "image",
    src: "/uploads/story-01.jpg",
    alt: "The couple together, pre-wedding",
    caption: "Where it began.",
    side: "right",
    framed: true,
    handwrittenNote: "our favourite afternoon",
  },
  {
    type: "text",
    content:
      "As time passed, ordinary days became memories we would want to keep forever. There were long conversations, spontaneous adventures, quiet mornings, and the kind of laughter that makes even the simplest day feel special. We learned about each other, grew together, and found comfort in knowing we could always count on one another.",
  },
  {
    type: "divider",
  },
  {
    type: "text",
    content:
      "Like every meaningful journey, ours had its share of ups and downs. But through every season, we learned to choose patience, kindness, understanding, and each other. It was never about finding a perfect story. It was about building something real, one little moment at a time.",
  },
  {
    type: "image",
    src: "/uploads/story-02.jpg",
    alt: "Close-up of hands and wedding rings",
    caption: "A promise, held close.",
    side: "left",
    framed: false,
  },
  {
    type: "text",
    content:
      "And then came the day we promised to walk through life together. Surrounded by the people we love, dressed in colours and traditions that made the day unforgettable, we began a new chapter — one filled with hope, laughter, faith, and a lifetime of possibilities.",
  },
  {
    type: "note",
    content: "same team, always.",
  },
  {
    type: "image",
    src: "/uploads/story-03.jpg",
    alt: "A candid moment from the wedding day",
    caption: "The day everything changed.",
    side: "right",
    framed: true,
    handwrittenNote: "here's to us",
  },
  {
    type: "text",
    content:
      "Looking back, every conversation, every unexpected turn, and every little moment led us here. We are grateful for the journey that brought us together, for everyone who celebrated alongside us, and for the beautiful story that is still being written.",
  },
  {
    type: "divider",
  },
  {
    type: "text",
    content:
      "This is not the end of our story. It is simply the beginning of our favourite chapter yet.",
  },
  {
    type: "image",
    src: "/uploads/story-04.jpg",
    alt: "The couple, closing portrait",
    caption: "A little piece of forever.",
    side: "left",
    framed: false,
  },
];
