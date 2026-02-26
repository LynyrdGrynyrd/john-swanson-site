# John Swanson Personal Site

## Project Overview
Single-page personal website for John Swanson's job search. Vite + React, deployed on Netlify free tier via GitHub (`lynyrdgrynyrd/john-swanson-site`).

The site is built with React components and custom hooks for better maintainability. The main entry point is `src/App.jsx`, which orchestrates the sections. No routing or complex state management libraries are used. Styles are handled via `src/App.css`, `src/theme.js`, and inline styles.

## Key Details

- **Live site:** `https://john-swanson-site.netlify.app`
- **Domain:** `john-swanson.com` (user owns it). OG meta tags currently use the Netlify subdomain. Swap to `https://john-swanson.com` once DNS is configured.
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
Once `john-swanson.com` is pointed to Netlify, update OG tags in `index.html`:
- `og:image` and `twitter:image`: swap `john-swanson-site.netlify.app` → `john-swanson.com`
- `og:url`: swap `john-swanson-site.netlify.app` → `john-swanson.com`

## Feature Roadmap
Potential additions discussed 2026-02-25, not yet implemented:
- **Ask Me About icebreakers** — Italic line in Contact section: "Ask me about: building stage-gates from scratch, why I taught myself to code as a polymer scientist, solo marathon logistics, or the four weddings I've officiated." Lowers activation energy for recruiter outreach.
- **Metric hover stories** — Origin story one-liners on Impact metric cards (hover/tap to reveal). Deferred because keeping customer names out is tricky. Revisit when John has time to write the stories himself.
- **"What I'm not" interstitial** — Rejected (felt smug). The Digital R&D section already shows-not-tells.
- **Proof of work line** — Skipped for now. ("642 files, 200+ material grades, I'm a polymer scientist.")
- **Currently micro-section** — Footer section with Reading/Building/Running/Listening to. Swap monthly. Draft items: "Reading: Slow Productivity by Cal Newport / Building: A product selector app that actually makes sense / Running: Not currently. But the shoes are by the door. / Listening to: Whatever Julian is requesting on repeat"

## Future Content Refinement
Consider using these Claude Code skills to iterate on website copy:
- **`career-biographer`** — conduct structured interviews to surface stronger stories for About, Hero, and Beyond the Lab sections
- **`career-transitions`** — help tailor messaging as the job search focus evolves (e.g., pivoting emphasis from materials science to R&D leadership, or targeting specific industries)

## Build Commands
- `npm run dev` — local dev server (localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally
