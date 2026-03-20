# Component Scaffold Prompt

Add a new educational module to the AIworkloads app following these steps:

1. Create `constants/[name].ts` — export named constants following the shape of existing
   constants files. Use `claim()` for any sourced numeric values. Add new exports to
   `constants/index.ts`.

2. Create `components/[Name]Section.tsx` — typed as `React.FC`, Tailwind-only styling,
   dark theme palette (bg-[#0F1117], bg-slate-900, border-white/5). Expose a `<section
   id="[anchorId]">` wrapper at the root element.

3. Register in `app/moduleRegistry.ts` — add entry with correct id, anchorId, title,
   order (append), tocVisible: true, page: 'main' (or 'standalone' if dedicated route).

4. Add to `constants/navigation.ts` NAVIGATION array with matching id and lucide icon.

5. If standalone route: create `pages/[Name]Page.tsx` following OperationsPage.tsx as
   template; add `<Route>` in App.tsx; add Playwright test in e2e/navigation.spec.ts.

6. Run: npm run lint && npm run build && npm run test
