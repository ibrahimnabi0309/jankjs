export interface ObserverEntry {
  type: 'jank' | 'cls' | 'lcp' | 'assets';
  timestamp: number;
  value: number;
}

/** Observes Long Tasks > threshold ms using PerformanceObserver. */
export function createJankObserver(
  callback: (entry: ObserverEntry) => void,
  threshold = 50,
): () => void {
  if (!('PerformanceObserver' in globalThis)) return () => {};

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration >= threshold) {
        callback({ type: 'jank', timestamp: entry.startTime, value: entry.duration });
      }
    }
  });

  try {
    observer.observe({ type: 'longtask', buffered: true });
  } catch {
    // longtask not supported in this browser
  }

  return () => observer.disconnect();
}

/** Observes Cumulative Layout Shift using PerformanceObserver. */
export function createClsObserver(callback: (entry: ObserverEntry) => void): () => void {
  if (!('PerformanceObserver' in globalThis)) return () => {};

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
      if (!layoutEntry.hadRecentInput) {
        callback({ type: 'cls', timestamp: entry.startTime, value: layoutEntry.value });
      }
    }
  });

  try {
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // layout-shift not supported in this browser
  }

  return () => observer.disconnect();
}

/** Observes Largest Contentful Paint using PerformanceObserver. */
export function createLcpObserver(callback: (entry: ObserverEntry) => void): () => void {
  if (!('PerformanceObserver' in globalThis)) return () => {};

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const last = entries[entries.length - 1];
    if (last) {
      callback({ type: 'lcp', timestamp: last.startTime, value: last.startTime });
    }
  });

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // largest-contentful-paint not supported in this browser
  }

  return () => observer.disconnect();
}

/** Observes network asset transfer sizes using PerformanceResourceTiming. */
export function createAssetsObserver(callback: (entry: ObserverEntry) => void): () => void {
  if (!('PerformanceObserver' in globalThis)) return () => {};

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resourceEntry = entry as PerformanceResourceTiming;
      if (resourceEntry.transferSize > 0) {
        callback({
          type: 'assets',
          timestamp: entry.startTime,
          value: resourceEntry.transferSize,
        });
      }
    }
  });

  try {
    observer.observe({ type: 'resource', buffered: true });
  } catch {
    // resource timing not supported in this browser
  }

  return () => observer.disconnect();
}
