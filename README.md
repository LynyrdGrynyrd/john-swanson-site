# John Swanson — Personal Website

A single-page personal brand site for **John P. Swanson** focused on R&D leadership, polymer science, and digital R&D.

- **Domain:** https://john-swanson.com
- **Hosting:** Netlify
- **Framework:** React + Vite

## Purpose

This site is designed to:
1. Present a strong professional narrative with specific proof points.
2. Convert qualified inbound outreach (hiring, advisory, collaboration).
3. Reflect a clear personal brand through voice, design, and interaction details.

## Tech Stack

- React 19
- Vite 7
- ESLint 9
- Netlify (deployment)
- Sharp (image processing script dependency)

## Quick Start

### Prerequisites
- Node.js 20+
- npm

### Install
```bash
npm ci
```

### Local development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Project Structure

```text
.
├─ src/
│  ├─ App.jsx
│  ├─ App.css
│  ├─ components/
│  │  ├─ sections/
│  │  └─ ui/
│  ├─ content/
│  ├─ hooks/
│  ├─ theme.js
│  └─ main.jsx
├─ public/
│  ├─ headshot.jpg
│  ├─ headshot.webp
│  ├─ og-image.jpg
│  ├─ topo.svg
│  └─ favicon.svg
├─ scripts/
├─ netlify.toml
├─ vite.config.js
└─ package.json
```

## Plan for Changes 1–4 (Ranked by Effort vs Impact)

### 1) Replace boilerplate docs with project docs (completed here)
**Impact:** Very high  
**Effort:** Low

Implementation steps:
- Keep this README aligned with the actual site purpose and architecture.
- Document how to run, build, lint, and deploy.
- Keep a maintenance section for content edits and roadmap priorities.

---

### 2) Split `src/App.jsx` into section components + content modules
**Impact:** Very high  
**Effort:** Medium

Implementation steps:
1. Create `src/components/sections/` and move each major section (Hero, About, Experience, etc.) into its own component.
2. Create `src/content/` for arrays currently embedded in `App.jsx`:
   - `experience.js`
   - `impact.js`
   - `philosophy.js`
   - `digital-rd.js`
   - `publications.js`
   - `beyond.js`
3. Keep shared UI primitives in `src/components/ui/` (e.g., `FadeIn`, `TypingText`, `SectionLabel`).
4. Keep `App.jsx` as page composition + global state only (theme toggle, nav, active section, mobile menu).

---

### 3) Add robust SEO + social metadata
**Impact:** High  
**Effort:** Medium

Implementation steps:
1. Update `index.html` with:
   - title
   - meta description
   - canonical URL (`https://john-swanson.com`)
   - Open Graph metadata
   - Twitter card metadata
2. Use existing `public/og-image.jpg` as social preview image.
3. Add JSON-LD schema (`Person` + profile links) for richer search context.
4. Validate metadata with social preview and schema tools before deploy.

---

### 4) Introduce a lightweight content operations model
**Impact:** High  
**Effort:** Medium

Implementation steps:
1. Store narrative and list data in `src/content/` modules to decouple copy updates from UI.
2. Define a consistent object schema for each content type:
   - experience item
   - impact metric
   - publication/patent item
3. (Optional) Add schema validation to catch malformed content during build.
4. Add a `Content Editing Checklist` section in this README for future updates.

## Content Editing Checklist

When updating site content:
- Update `PROFILE_LINKS` in `src/content/siteContent.js` for LinkedIn, Google Scholar, ORCID, and ResearchGate URLs.
- Keep claims specific and measurable.
- Prioritize concise, plain-language phrasing.
- Verify links (LinkedIn, publications, patents).
- Check spacing/line breaks at mobile and desktop widths.
- Re-run lint and production build before deploy.

## Deployment Notes

This project deploys to Netlify.

- **Domain:** `john-swanson.com`
- **Netlify placeholder setting:** `NETLIFY_<PLACEHOLDER_SETTING>`
- Build command: `npm run build`
- Publish directory: `dist`

> Replace `NETLIFY_<PLACEHOLDER_SETTING>` with the actual Netlify site/environment setting value when wiring production configuration.

## Suggested Near-Term Roadmap

- [x] Complete component/content split from `App.jsx`.
- [x] Add SEO, social tags, and JSON-LD.
- [ ] Add lightweight analytics on key CTA interactions.
- [ ] Add automated accessibility/performance checks in CI.

## License

All rights reserved unless otherwise specified.
