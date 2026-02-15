# John Swanson Personal Site

## Project Overview
Single-page personal website for John Swanson's job search. Vite + React, deployed on Netlify free tier via GitHub (`lynyrdgrynyrd/john-swanson-site`).

The entire site is one component: `src/App.jsx` (~760 lines). No routing, no CSS files, no state management library. Styles are inline + a `<style>` block inside the component. This is intentional — keep it simple.

## Key Details

- **Domain:** `john-swanson.com` (user owns it). OG meta tags in `index.html` use `https://john-swanson.com` as base URL.
- **Email:** `john@john-swanson.com`
- **LinkedIn:** `linkedin.com/in/johnpswanson`
- **GitHub repo:** `lynyrdgrynyrd/john-swanson-site` (public)

### The `digital-randd` ID quirk
The nav generates section IDs by: `toLowerCase()` → replace spaces with `-` → replace `&` with `and`. So "Digital R&D" becomes `digital-randd` (r + "and" + d = randd). The section `id` must match this — do NOT "fix" it to `digital-rand`.

### Images
- `public/headshot.jpg` — 800x1200, 100KB. Compressed from 17MB source via `scripts/process-images.mjs`
- `public/og-image.jpg` — 1200x630, 65KB. Center-top crop for LinkedIn/social previews
- Source image lives at: `C:\Users\jswanson\OneDrive - NeoGraf Solutions, LLC\01_Projects\_Consulting\__Resume\website\HeadshotJohn.jpg`
- Re-run `node scripts/process-images.mjs` if the source photo changes

### Google Fonts
Loaded via `<link>` tags in `index.html` (not CSS `@import`). Three families: Source Serif 4, DM Sans, JetBrains Mono.

## Deploy Workflow
Push to `main` → Netlify auto-builds (`npm run build`, publishes `dist/`). Config in `netlify.toml`.

## TODO: DNS Setup
Once `john-swanson.com` is pointed to Netlify, no code changes needed — OG tags already reference that domain. If deploying before DNS is configured, the OG image preview won't work on LinkedIn until the domain resolves. You can temporarily swap the OG URLs to the Netlify subdomain if needed, then switch back.

## Future Content Refinement
Consider using these Claude Code skills to iterate on website copy:
- **`career-biographer`** — conduct structured interviews to surface stronger stories for About, Hero, and Beyond the Lab sections
- **`career-transitions`** — help tailor messaging as the job search focus evolves (e.g., pivoting emphasis from materials science to R&D leadership, or targeting specific industries)

## Build Commands
- `npm run dev` — local dev server (localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally
