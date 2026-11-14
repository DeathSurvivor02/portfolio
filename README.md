# Portfolio

Personal portfolio site for Ean Bynoe — a single-page React app built with Vite and Tailwind CSS v4, deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (production build to `dist/`), `npm run preview`, `npm run lint`.

## Structure

- `src/data/site.js` — all content (profile, projects, skills, timeline, certifications). Edit copy here.
- `src/index.css` — design tokens for the light and dark themes, plus shared component styles.
- `src/components/` — one folder per page section; `ui/` holds shared pieces (icons, section header, scroll reveal, copy-email button).
- `src/components/Projects/Demos.jsx` — the small simulated demos shown inside each project. They run on sample data only.

## Adding a project

Append an entry to `projects` in `src/data/site.js`. `skillGroups` controls which filters it appears under; set `demo` to `null` unless a matching demo exists in `Demos.jsx`.
