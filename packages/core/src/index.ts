export type { ObserverEntry } from './observers/index';
export type { StoreState, Store } from './store/index';
export type { HUDOptions, HUD } from './ui/index';

export type MetricType = 'jank' | 'cls' | 'lcp' | 'assets';

export interface JankJSConfig {
  /** Corner where the HUD pill is anchored. @default 'bottom-right' */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Colour scheme for the HUD. @default 'dark' */
  theme?: 'dark' | 'light' | 'system';
  /** Metrics to display. Omit to show all. */
  metrics?: MetricType[];
  /** Long Task duration (ms) that triggers a jank warning. @default 50 */
  jankThreshold?: number;
  /** Long Task duration (ms) that triggers a critical alert. @default 150 */
  jankCriticalThreshold?: number;
  /** Seconds of rolling history shown in charts. @default 30 */
  historyWindow?: number;
  /** Keyboard shortcut to toggle HUD visibility. @default 'Alt+Shift+L' */
  hotkey?: string;
  /** Optional callback invoked on every jank event. */
  onJank?: (event: import('./observers/index').ObserverEntry) => void;
}

/**
 * Initialises JankJS and mounts the HUD overlay.
 *
 * @returns A cleanup function that tears down observers and removes the HUD.
 *
 * @example
 * if (import.meta.env.DEV) {
 *   const cleanup = initJankJS({ position: 'bottom-right' });
 * }
 */
export function initJankJS(_config?: JankJSConfig): () => void {
  // TODO: Wire observers → store → HUD render loop
  return () => {};
}
