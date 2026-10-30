# Prince & Priya — Short Cinematic Wedding Invitation

This is a shortened, mobile-first adaptation of the Prince-Priya cinematic invitation.

## Changes made
- Kept the original dark wine / champagne-gold visual system, typography and cinematic mood.
- Replaced the wax-seal monogram with a **holding-hands couple icon** drawn as inline SVG.
- Removed the separate bride/groom portraits and all memory/gallery photos.
- Uses only `assets/couple.jpg` (the newly uploaded couple-standing photograph).
- Reworked the storyboard into 3 sticky chapters using the same photograph.
- Added Christian wedding content: Mark 10:9, Ecclesiastes 4:12, a cross motif and Psalm 126:3.
- Kept golden particles, noise, parallax, sticky scrolling, film-style reveal, countdown, wedding details and RSVP.
- Music attempts to start immediately on the seal click. If `assets/ambient.mp3` is absent, it falls back to the public GitHub Pages copy of the original site's ambient track.
- Mobile layouts are deliberately re-composed rather than simply scaled down.

## Run
Open `index.html`, or serve the folder with:

    python3 -m http.server 8000

Then open `http://localhost:8000`.

## Music
For a fully self-contained deployment, place your licensed/royalty-free track at:

    assets/ambient.mp3

The current JavaScript includes a fallback to the original public Prince-Priya GitHub Pages audio file if the local track is unavailable.

## Edit wedding details
Most text and links are in `index.html`. The wedding countdown is in `script.js`.
