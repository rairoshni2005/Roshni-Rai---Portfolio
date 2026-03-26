# Development Guide

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+

Check versions:

```bash
node -v
npm -v
```

## Local setup

```bash
npm install
npm run dev
```

Vite starts a development server with HMR.

## Available scripts

- `npm run dev` - start dev server
- `npm run build` - production build into `dist/`
- `npm run preview` - preview built app locally
- `npm run lint` - run ESLint

## Recommended development workflow

1. Start `npm run dev`
2. Implement small, scoped changes
3. Check browser interactions (especially events/modals)
4. Run `npm run lint`
5. Run `npm run build`
6. Validate production preview with `npm run preview`

## Project conventions

- Component-first structure under `src/components`
- Shared section wrapper: `Section.jsx`
- Event-driven actions use `window` CustomEvents
- Persisted UX state uses `localStorage`
- Styling via Tailwind classes + `src/index.css` custom tokens

## Event-driven development tips

When adding a new global action:

1. Define a clear event name
2. Dispatch from source component
3. Add listener in target owner component
4. Remove listener in cleanup
5. Document event in `docs/ARCHITECTURE.md`

## Adding a new section

1. Create component in `src/components`
2. Import and render it in `src/App.jsx`
3. Add section `id` and matching nav item in `src/components/Navbar.jsx`
4. Test active nav highlighting and smooth scroll behavior

## Linting

Run:

```bash
npm run lint
```

If lint fails, fix issues before deployment.

## Production checks

Always run before release:

```bash
npm run lint
npm run build
npm run preview
```

During preview, verify:

- all sections render
- modals open/close
- resume download works
- contact terminal flow works
- footer links are correct
