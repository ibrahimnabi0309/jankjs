import { initJankJS } from 'jankjs';
import type { JankJSConfig } from 'jankjs';
import type { App, Plugin } from 'vue';

export type JankJSPluginOptions = JankJSConfig;

/**
 * Vue plugin that installs and mounts the JankJS HUD.
 *
 * @example
 * if (import.meta.env.DEV) app.use(JankJSPlugin);
 */
export const JankJSPlugin: Plugin<JankJSPluginOptions | undefined> = {
  install(app: App, options?: JankJSPluginOptions) {
    const cleanup = initJankJS(options);
    // Store cleanup on the app so it can be called on unmount if needed
    app.config.globalProperties.$jankjsCleanup = cleanup;
  },
};
