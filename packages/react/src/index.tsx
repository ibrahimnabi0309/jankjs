import { initJankJS } from 'jankjs';
import type { JankJSConfig, MetricType } from 'jankjs';
import { useEffect } from 'react';

export interface JankJSProps extends JankJSConfig {
  metrics?: MetricType[];
}

/**
 * Drop-in React component that mounts the JankJS HUD.
 * Render it once at the top of your component tree, guarded by a DEV check.
 *
 * @example
 * {import.meta.env.DEV && <JankJS metrics={['jank', 'cls']} />}
 */
export function JankJS(props: JankJSProps): null {
  useEffect(() => {
    const cleanup = initJankJS(props);
    return cleanup;
  }, []); // intentionally empty — props are read once on mount

  return null;
}
