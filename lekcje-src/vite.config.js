import { defineConfig } from 'vite';

// Gotowe lekcje trafiają do katalogu lekcje/ w głównym repozytorium,
// skąd publikuje je GitHub Pages razem z resztą serwisu.
export default defineConfig({
  root: 'app',
  publicDir: '../public',
  base: './',
  esbuild: { jsx: 'automatic' },
  // Treść 34 lekcji jest w jednym pakiecie (ok. 220 kB po kompresji), żeby działała też offline z dysku.
  build: { outDir: '../../lekcje', emptyOutDir: true, chunkSizeWarningLimit: 800 },
  server: { fs: { allow: ['..'] } },
});
