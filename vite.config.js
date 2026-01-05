import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/goit-js-final-project-cinemania/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalog: resolve(__dirname, 'catalog/index.html'),
        library: resolve(__dirname, 'library/index.html'),
      },
    },
  },
});
