# JankJS Architecture

## Overview

JankJS follows a **decoupled observation with batched rendering** pattern to ensure the HUD itself never contributes to the metrics it measures.

```
PerformanceObserver APIs
        │
        ▼
  [ Observers ]   ← jank · cls · lcp · assets
        │  (queue entries)
        ▼
    [ Store ]     ← lightweight reactive state (no external lib)
        │  (flush via rAF)
        ▼
    [ HUD UI ]    ← Shadow DOM isolated overlay
```

## Packages

| Package           | Name            | Purpose                                       |
| ----------------- | --------------- | --------------------------------------------- |
| `packages/core`   | `jankjs`        | Vanilla TS — observers, store, Shadow DOM HUD |
| `packages/react`  | `jankjs-react`  | `<JankJS />` component + re-render tracking   |
| `packages/vue`    | `jankjs-vue`    | `JankJSPlugin` Vue plugin                     |
| `packages/svelte` | `jankjs-svelte` | `jankJs` Svelte action                        |
| `apps/demo`       | `@jankjs/demo`  | Vite sandbox app for local development        |

## Key Design Decisions

### Zero Dependencies in Core

The `jankjs` core package intentionally has no runtime dependencies. This keeps the bundle tiny and ensures tree-shaking works correctly — every import is explicit and removable.

### Shadow DOM Isolation

The HUD mounts inside a `closed` Shadow Root attached to a dedicated host element (`#jankjs-hud`). This means:

- HUD styles cannot leak into the host application.
- The host application's CSS resets and global styles cannot break the HUD.

### Batched Rendering via `requestAnimationFrame`

Observer callbacks push entries onto an internal queue. A single `rAF` loop drains the queue and updates the HUD. This guarantees observer processing is always async and never contributes to synchronous Long Task time.

### Dev-only by Convention

JankJS does not include any automatic tree-shaking guard itself. The pattern recommended in the docs (`if (import.meta.env.DEV) initJankJS()`) relies on Vite/Rollup dead-code elimination to strip the entire import graph from production bundles.

## Adding a New Metric Observer

1. Create `packages/core/src/observers/<metric>.ts` implementing the `ObserverEntry` interface.
2. Export a `create<Metric>Observer(callback, options)` factory from `packages/core/src/observers/index.ts`.
3. Wire the new observer into `initJankJS` in `packages/core/src/index.ts`.
4. Add the metric key to the `MetricType` union and `JankJSConfig.metrics` array.
5. Render the metric in the HUD UI (`packages/core/src/ui/index.ts`).

## Adding a Framework Adapter

1. Create `packages/<framework>/` following the same structure as `packages/react`.
2. The adapter should call `initJankJS` from `jankjs` and expose a framework-idiomatic API (component / plugin / action).
3. Declare `jankjs` as a `dependency` (not peer) so workspace resolution works.
4. Declare the framework itself as a `peerDependency`.
