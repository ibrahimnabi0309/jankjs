import { initJankJS } from 'jankjs';
import type { JankJSConfig } from 'jankjs';

/**
 * Svelte action that mounts the JankJS HUD on the element it is applied to.
 *
 * @example
 * <div use:jankJs>...</div>
 */
export function jankJs(_node: HTMLElement, options?: JankJSConfig): { destroy: () => void } {
  const cleanup = initJankJS(options);
  return { destroy: cleanup };
}
