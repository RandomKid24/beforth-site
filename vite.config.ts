import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      modulePreload: {
        // These chunks are only needed after a click (lazy routes and the icon
        // chunk they pull in). Keeping them out of the preload graph stops the
        // first page from downloading code it never executes.
        resolveDependencies: (_url, deps) =>
          deps.filter((dep) => !/(Contact|InsightArticle|NotFound|ProductPage|ProductShowcase|chevron-down)/.test(dep)),
      },
    },
  };
});
