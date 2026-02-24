# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Badzze Web Portfolio — a static portfolio/business card site built with Astro 5, React 19, Tailwind 4, and shadcn/ui. No backend, no database, no environment variables required.

### Prerequisites

- **Node.js v22.14.0** (specified in `.nvmrc`)
- **npm** as package manager (`package-lock.json`)

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 4321) |
| Build | `npm run build` |
| Lint | `npx eslint .` |
| Type check | `npx tsc --noEmit` |
| Preview build | `npm run preview` |

See `README.md` for full documentation.

### Non-obvious notes

- The Netlify adapter is configured in `astro.config.mjs` but is **not required** for local development. The dev server works fine without a Netlify account.
- The contact form simulates submission (no EmailJS integration yet) — form submission will show a success message after a short delay without actually sending email.
- ESLint reports many Prettier formatting errors in the existing codebase; this is expected and does not block development.
- `astro check` can be very slow (>60s); prefer `npx tsc --noEmit` for quick type checking.
