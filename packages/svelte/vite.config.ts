import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'JankJSSvelte',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['svelte', 'jankjs'],
    },
    minify: false,
  },
  plugins: [svelte(), dts({ rollupTypes: true })],
});
