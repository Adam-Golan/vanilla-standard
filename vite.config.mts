import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  publicDir: 'src/images',
  server: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  esbuild: {
    keepNames: true
  },
  plugins: [tsconfigPaths()],
})