export interface StoreState {
  jankCount: number;
  cls: number;
  lcp: number;
  fps: number;
  assets: Array<{ name: string; size: number }>;
}

const DEFAULT_STATE: StoreState = {
  jankCount: 0,
  cls: 0,
  lcp: 0,
  fps: 60,
  assets: [],
};

export interface Store {
  getState: () => StoreState;
  setState: (patch: Partial<StoreState>) => void;
  subscribe: (listener: (state: StoreState) => void) => () => void;
}

/** Creates a lightweight reactive store for HUD metric state. */
export function createStore(): Store {
  let state: StoreState = { ...DEFAULT_STATE };
  const listeners = new Set<(state: StoreState) => void>();

  return {
    getState: () => state,
    setState: (patch) => {
      state = { ...state, ...patch };
      listeners.forEach((l) => l(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
