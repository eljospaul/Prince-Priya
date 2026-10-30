# A Little Forever

An elegant, production-ready wedding memory website — a curated digital scrapbook for a newly married couple. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Home** — cinematic hero, welcome message, featured memories, story preview, guest wishes preview
- **Our Story** — editorial, scrapbook-style narrative interwoven with photographs
- **Gallery** — responsive editorial grid with category filters, lightbox with prev/next and swipe
- **Best Wishes** — working guestbook with persistent storage, moderation (pending/approved/hidden), and admin controls
- **Admin** — password-protected dashboard to approve/delete wishes and edit site content

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in ADMIN_PASSWORD_HASH and SESSION_SECRET in .env.local
npm run dev
```

Open http://localhost:3000.

## Photos

This repo ships with SVG placeholder images in `public/uploads/`. Replace them with the couple's real
wedding and pre-wedding photographs, then update `content/gallery.ts` with the real paths, captions, and
categories. Image file names referenced in `content/gallery.ts` must exist under `public/` for `next/image`
to optimize them.

Generate fresh placeholders:

```bash
npm run generate:placeholders
```

## Admin

1. Add a password hash to `ADMIN_PASSWORD_HASH` in `.env.local` (SHA-256 of your password).
2. Add a random string to `SESSION_SECRET`.
3. Visit `/admin/login`, sign in, then manage wishes at `/admin`.

Without these variables, the admin area is locked and wish submissions are stored locally as pending.

## Content

All editable copy lives in `content/`:
- `content/config.ts` — couple names, initials, wedding date, hero image, tagline
- `content/story.ts` — the Our Story narrative blocks
- `content/gallery.ts` — photographs, categories, captions

## Deployment

Vercel (recommended): connect the repository and add the environment variables from `.env.example`.
The local JSON store (`data/wishes.json`) persists on platforms with a writable filesystem during the
deployment lifecycle; for long-term production use, connect Supabase via `lib/supabase.ts`.
