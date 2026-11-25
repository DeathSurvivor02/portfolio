# Portfolio

Personal portfolio site for Ean Bynoe - a single-page React app built with Vite and Tailwind CSS v4, deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (production build to `dist/`), `npm run preview`, `npm run lint`.

## Structure

* `src/data/site.js` - All content (profile, projects, skills, timeline, certifications). Edit copy here.
* `src/data/transit.js` - Transit graph data for the interactive A* route search demo.
* `src/services/valorantApi.js` - Client for the deployed Valorant-API (`valorant-api-six.vercel.app`) with timeout, error handling, and demo-mode fallback.
* `src/index.css` - Design tokens for the light and dark themes, plus shared component styles.
* `src/components/` - One folder per page section; `ui/` holds shared pieces (icons, section header, scroll reveal, copy-email button).
* `src/components/Projects/Demos.jsx` - Interactive demos shown inside project cards (live Valorant-API lookup with demo fallback, real A* transit graph search, and simulated demos).

## Adding a project

Append an entry to `projects` in `src/data/site.js`. `skillGroups` controls which filters it appears under; set `demo` to `null` unless a matching demo exists in `Demos.jsx`.
