import { defineConfig } from 'vite';

// Moduły ES nie działają z pliku otwartego z dysku (file://), a lekcje mają działać
// także z rozpakowanej paczki offline. Dlatego budujemy jeden skrypt IIFE i usuwamy
// z HTML atrybuty type="module" i crossorigin.
function classicScript() {
  return {
    name: 'classic-script',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(/<script type="module" crossorigin/g, '<script defer').replace(/ crossorigin/g, '');
    },
  };
}

// Gotowe lekcje trafiają do katalogu lekcje/ w głównym repozytorium,
// skąd publikuje je GitHub Pages razem z resztą serwisu.
export default defineConfig({
  root: 'app',
  publicDir: '../public',
  base: './',
  esbuild: { jsx: 'automatic' },
  plugins: [classicScript()],
  build: {
    outDir: '../../lekcje',
    emptyOutDir: true,
    modulePreload: false,
    // Treść 34 lekcji jest w jednym pakiecie (ok. 220 kB po kompresji), żeby działała też z dysku.
    chunkSizeWarningLimit: 800,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
  server: { fs: { allow: ['..'] } },
});
