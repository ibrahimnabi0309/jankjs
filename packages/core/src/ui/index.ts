export interface HUDOptions {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme: 'dark' | 'light' | 'system';
}

export interface HUD {
  mount: () => void;
  unmount: () => void;
  update: (data: Record<string, unknown>) => void;
}

/** Creates a Shadow DOM-isolated HUD overlay. */
export function createHUD(_options: HUDOptions): HUD {
  let host: HTMLElement | null = null;
  let shadow: ShadowRoot | null = null;

  return {
    mount() {
      host = document.createElement('div');
      host.id = 'jankjs-hud';
      shadow = host.attachShadow({ mode: 'closed' });

      // TODO: Render draggable pill UI into shadow root
      const pill = document.createElement('div');
      pill.textContent = 'JankJS';
      shadow.appendChild(pill);

      document.body.appendChild(host);
    },
    unmount() {
      host?.remove();
      host = null;
      shadow = null;
    },
    update(_data) {
      // TODO: Re-render metrics into the shadow DOM
    },
  };
}
