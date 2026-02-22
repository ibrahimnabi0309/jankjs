# 🟢 JankJS

<p align="center">
  <img src="https://raw.githubusercontent.com/your-org/jankjs/main/.github/assets/demo.gif" alt="JankJS in action" width="720" />
</p>

<p align="center">
  <strong>A lightweight, zero-dependency performance monitoring HUD for web developers.</strong><br/>
  Real-time Jank, Layout Shifts, Re-renders, and Asset Weight — right in your browser. No DevTools required.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/jankjs"><img src="https://img.shields.io/npm/v/jankjs?style=flat-square&color=4ade80" alt="npm version" /></a>
  <a href="https://bundlephobia.com/package/jankjs"><img src="https://img.shields.io/bundlephobia/minzip/jankjs?style=flat-square&label=gzip%20size&color=4ade80" alt="bundle size" /></a>
  <a href="https://github.com/your-org/jankjs/blob/main/LICENSE"><img src="https://img.shields.io/github/license/your-org/jankjs?style=flat-square&color=4ade80" alt="license" /></a>
  <a href="https://github.com/your-org/jankjs/actions"><img src="https://img.shields.io/github/actions/workflow/status/your-org/jankjs/ci.yml?style=flat-square&label=CI" alt="CI status" /></a>
  <a href="https://github.com/your-org/jankjs/stargazers"><img src="https://img.shields.io/github/stars/your-org/jankjs?style=flat-square&color=f59e0b" alt="GitHub stars" /></a>
</p>

---

## Why JankJS?

The Chrome DevTools Performance tab is powerful — but it requires you to stop, record, analyze, and repeat. **JankJS gives you a live, always-on overlay** that surfaces the metrics that matter while you build.

| Without JankJS | With JankJS |
|---|---|
| Open DevTools → Record → Analyze → Close | See jank highlighted **as it happens** |
| Context-switch out of your editor | Stay in flow — data is in the corner of your screen |
| Learn the Performance flame chart | Metric is color-coded: 🟢 OK · 🟡 Warning · 🔴 Critical |
| Forget to check before shipping | HUD is dev-only — **zero bytes** in production |

---

## Features

- 🎯 **Jank Detection** — Flags Long Tasks > 50ms (the RAIL model boundary) with frame-drop estimates
- 📐 **Layout Shift Tracking** — Real-time CLS score with element-level attribution
- 🖼️ **LCP Monitoring** — Tracks Largest Contentful Paint and highlights the responsible element
- 📦 **Asset Weight Panel** — Lists your heaviest network resources by transfer size
- 🔄 **Re-render Counter** *(React/Vue/Svelte adapters)* — Per-component render counts
- 🖱️ **Draggable Pill UI** — Floating, collapsible overlay that stays out of your way
- 🔒 **Shadow DOM Isolated** — HUD styles never bleed into your app, and your app's styles never break the HUD
- ⚡ **Zero Dependencies** — No Lodash, no D3, no React required in the core
- 🌲 **Tree-shakeable** — Dead-code elimination removes it entirely in production builds

---

## Quick Start

### Install

```bash
npm install -D jankjs
# or
yarn add -D jankjs
# or
pnpm add -D jankjs
```

### Initialize

```typescript
// main.ts (or index.ts / app entry point)
import { initJankJS } from 'jankjs';

// The DEV guard ensures zero bytes ship to production
if (import.meta.env.DEV) {
  initJankJS();
}
```

That's it. A floating pill appears in the bottom-right corner of your app.

### Via CDN (no bundler required)

```html
<!-- Add before </body> in your dev environment -->
<script type="module">
  import { initJankJS } from 'https://cdn.jsdelivr.net/npm/jankjs/dist/jankjs.es.js';
  initJankJS();
</script>
```

---

## Configuration

```typescript
initJankJS({
  position: 'bottom-right',       // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  theme: 'dark',                  // 'dark' | 'light' | 'system'
  metrics: ['jank', 'cls', 'lcp', 'assets'], // cherry-pick what you need
  jankThreshold: 50,              // ms — tasks above this are flagged
  jankCriticalThreshold: 150,     // ms — tasks above this are flagged as critical
  historyWindow: 30,              // seconds of rolling history shown in charts
  hotkey: 'Alt+Shift+L',          // keyboard shortcut to toggle the HUD
  onJank: (event) => {            // optional callback for custom logging
    console.warn('[Jank]', event);
  },
});
```

---

## What It Measures

| Metric | Browser API | Chrome | Firefox | Safari |
|---|---|:---:|:---:|:---:|
| Long Tasks (Jank) | `PerformanceObserver` · `longtask` | ✅ | ❌ | ❌ |
| Cumulative Layout Shift | `PerformanceObserver` · `layout-shift` | ✅ | ✅ | ✅ |
| Largest Contentful Paint | `PerformanceObserver` · `largest-contentful-paint` | ✅ | ✅ | ✅ |
| Asset Weight | `PerformanceResourceTiming` | ✅ | ✅ | ✅ |
| FPS | `requestAnimationFrame` delta | ✅ | ✅ | ✅ |

> **Note:** Long Task attribution is a Chromium-only feature. JankJS gracefully degrades in non-Chromium browsers — metrics that aren't supported are hidden automatically.

---

## Framework Adapters

The core is framework-agnostic Vanilla TypeScript. Thin wrappers provide deeper integration with popular frameworks.

### React

```bash
npm install -D jankjs-react
```

```tsx
// App.tsx
import { JankJS } from 'jankjs-react';

export default function App() {
  return (
    <>
      {import.meta.env.DEV && <JankJS metrics={['jank', 'cls']} />}
      <YourApp />
    </>
  );
}
```

The React adapter additionally tracks **per-component re-render counts** using a lightweight reconciler hook.

### Vue

```bash
npm install -D jankjs-vue
```

```typescript
// main.ts
import { createApp } from 'vue';
import { JankJSPlugin } from 'jankjs-vue';

const app = createApp(App);
if (import.meta.env.DEV) app.use(JankJSPlugin);
app.mount('#app');
```

### Svelte

```bash
npm install -D jankjs-svelte
```

```svelte
<!-- App.svelte -->
<script>
  import { jankJs } from 'jankjs-svelte';
</script>

<div use:jankJs>
  <slot />
</div>
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Alt + Shift + L` | Toggle HUD visibility |
| `Alt + Shift + C` | Clear all recorded history |
| `Alt + Shift + E` | Export current session as JSON trace |

All shortcuts are configurable via the `hotkey` option.

---

## Roadmap

- [x] Phase 1 — MVP: Core observers, draggable pill, severity indicators
- [x] Phase 2 — Visualizations: Rolling jank timeline, CLS heatmap, asset weight panel
- [ ] Phase 3 — Framework Adapters: React, Vue, Svelte wrappers *(in progress)*
- [ ] Phase 4 — Chaos Mode: CPU throttle simulator, network condition injector, jank replay & export

See the full breakdown in [ROADMAP.md](./ROADMAP.md).

---

## Contributing

JankJS is built in the open and contributions are very welcome. Whether you're fixing a bug, adding a metric, or improving the docs — there's a path for you.

**Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.** It covers:

- How to run the project locally
- How to add a new metric observer
- How to build a framework adapter
- The PR review process and checklist

### Local Development

```bash
# Clone the repo
git clone https://github.com/your-org/jankjs.git
cd jankjs

# Install dependencies (monorepo — uses pnpm workspaces)
pnpm install

# Start the core + demo app in watch mode
pnpm dev

# Run all tests
pnpm test

# Build all packages
pnpm build
```

The demo app at `apps/demo` renders a page with intentional jank, layout shifts, and heavy assets — it's your sandbox for validating changes.

### Good First Issues

New to the codebase? Start here:

- Browse issues tagged [`good first issue`](https://github.com/your-org/jankjs/labels/good%20first%20issue)
- Each issue includes a pointer to the relevant file and a suggested approach
- Feel free to ask questions directly in the issue thread before starting work

---

## Architecture Overview

```
jankjs/
├── packages/
│   ├── core/               # Vanilla TypeScript — zero dependencies
│   │   └── src/
│   │       ├── observers/  # PerformanceObserver wrappers (jank, CLS, LCP, assets)
│   │       ├── store/      # Lightweight reactive state — no external lib
│   │       └── ui/         # Shadow DOM overlay, draggable pill, canvas charts
│   ├── react/              # React adapter + re-render tracking
│   ├── vue/                # Vue plugin + composable
│   └── svelte/             # Svelte action
├── apps/
│   └── demo/               # Vite dev app for local testing
└── docs/                   # Architecture deep-dives
```

The core principle is **decoupled observation with batched rendering** — observers queue entries and flush them via `requestAnimationFrame`, ensuring the HUD never adds to the Long Task budget of the app it's monitoring. Full architecture docs in [`docs/architecture.md`](./docs/architecture.md).

---

## Performance Impact

JankJS is designed to be a non-participant in the metrics it measures.

- **Observer overhead:** Entry processing is always deferred to the next animation frame — never synchronous
- **Rendering:** The HUD renders on its own `rAF` loop, completely independent of your app's render cycle
- **Memory:** Rolling history is capped at a configurable window (default 30s) to prevent unbounded growth
- **Production:** The `import.meta.env.DEV` guard + tree-shaking = **0 bytes** in your production bundle

---

## Browser Support

JankJS targets **modern evergreen browsers**. The core FPS counter and CLS/LCP tracking work across all major browsers. Long Task attribution is Chromium-only and degrades gracefully elsewhere.

| Chrome | Firefox | Safari | Edge |
|:---:|:---:|:---:|:---:|
| ✅ 80+ | ✅ 89+ | ✅ 14+ | ✅ 80+ |

---

## License

[MIT](./LICENSE) © 2024 JankJS Contributors

---

## Acknowledgements

Inspired by the Chrome DevTools Performance panel, the [RAIL performance model](https://web.dev/rail/), and every developer who has ever lost 45 minutes to a jank bug that the HUD would have caught in seconds.

---

<p align="center">
  If JankJS saved you time, consider <a href="https://github.com/your-org/jankjs">starring the repo ⭐</a> — it helps others find it.
</p>
