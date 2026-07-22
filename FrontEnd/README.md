# Roz ka Khata — Minimal React Rewrite

This is a rewrite of the original Figma Make export, with React usage cut down
to the bare minimum and everything else moved to plain HTML/CSS/JavaScript.
All 15 screens and every feature from the original design are preserved
exactly — only the implementation technique changed.

## What changed vs. the original

| Original | This version |
|---|---|
| ~15 React components, one per screen | **1 React component total** (`App.jsx`), just mounts a div |
| React state (`useState`) scattered across components | Plain JS object (`state` in `app.js`) |
| JSX conditional rendering | Plain JS functions returning HTML strings, swapped via `innerHTML` |
| `lucide-react` (npm icon library) | Hand-written inline SVG strings (`icons.js`) |
| `recharts` (npm charting library) | Hand-built SVG bar/line/donut charts (`charts.js`) |
| Tailwind CSS (utility classes) | One plain CSS file (`style.css`) |
| Radix UI, MUI, Framer Motion, etc. | Removed — not used |

## Dependencies

Only two runtime packages: `react` and `react-dom` (plus `vite` and
`@vitejs/plugin-react` for the build step — no other tooling).

## Running it

```bash
npm install
npm run dev       # start dev server
npm run build      # production build
```

## How it works

- `src/main.jsx` — mounts the one React root.
- `src/App.jsx` — the *only* React component. It renders a single empty
  `<div>`, then on mount hands control to `mountApp()` in `app.js`.
- `src/app.js` — the real application. Holds all state in a plain JS object,
  renders the current screen by setting `innerHTML`, and handles every click/
  input via one delegated event listener (`data-action` attributes).
- `src/screens.js`, `screens2.js`, `screens3.js` — one function per screen,
  each returning an HTML string built from the current state.
- `src/components.js` — small reusable HTML-string builders (top bar,
  expense row, bottom nav, toggle switch, circular progress).
- `src/icons.js` — inline SVG icon set.
- `src/charts.js` — hand-built SVG bar/line/donut chart renderers with a
  lightweight hover-tooltip behavior.
- `src/data.js` — all static demo data and formatting helpers.
- `src/style.css` — all visual styling (colors, spacing, dark mode).

## Features preserved

Splash screen, 3-step onboarding, login, signup, home dashboard, add expense,
transaction history with search/filter, analytics (monthly/weekly/category
charts + insights), month-over-month comparison, budget tracking with
category breakdowns, data export (PDF/Excel/CSV mock flow), search with
recent searches & category browse, settings (dark mode, notifications, PIN
lock, backup, etc.), profile with stats and streak, and notifications with
read/unread state.
