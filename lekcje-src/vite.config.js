import { defineConfig } from 'vite';

// Gotowe lekcje trafiają do katalogu lekcje/ w głównym repozytorium,
// skąd publikuje je GitHub Pages razem z resztą serwisu.
export default defineConfig({
  root: 'app',
  publicDir: '../public',
  base: './',
  esbuild: { jsx: 'automatic' },
  build: { outDir: '../../lekcje', emptyOutDir: true },
  server: { fs: { allow: ['..'] } },
});
