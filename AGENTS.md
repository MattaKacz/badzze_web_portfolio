# AGENTS.md

## Cursor Cloud specific instructions

### Overview

BADZZE Portfolio — a one-page portfolio site built with Astro 5, React 19, Tailwind 4, and shadcn/ui. No backend, no database. All content lives in `src/content/projects/*.md`.

### Running the dev server

```bash
npm run dev
```

Serves on `http://localhost:4321`. See `package.json` for all available scripts (`dev`, `build`, `preview`).

### Linting

```bash
npx eslint .
```

The codebase has pre-existing Prettier formatting violations. ESLint is configured with Prettier integration via `eslint-plugin-prettier`. There is no separate `lint` script in `package.json` — run ESLint directly.

### Building

```bash
npm run build
```

Uses `@astrojs/netlify` adapter. Build output goes to `dist/`.

### Node.js version

The project requires Node.js v22.14.0 (see `.nvmrc`). Use `nvm use` to activate.

### Notes

- No automated tests are configured (no test script or test framework).
- The contact form uses a simulated `setTimeout` instead of a real email service (EmailJS integration is planned but not wired up).
- No `.env` file or secrets are required to run the project locally.
- No Docker or database dependencies.
