import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'JankJSReact',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'jankjs'],
    },
    minify: false,
  },
  plugins: [react(), dts({ rollupTypes: true })],
});
