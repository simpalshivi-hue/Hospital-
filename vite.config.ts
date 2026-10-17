import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin to support GitHub Pages: generates .nojekyll and 404.html in dist
function githubPagesHelper(): Plugin {
  return {
    name: 'github-pages-helper',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        // 1. Create .nojekyll so GitHub Pages doesn't ignore assets or run Jekyll
        fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

        // 2. Duplicate index.html as 404.html for GitHub Pages fallback
        const indexHtml = path.join(distDir, 'index.html');
        const notFoundHtml = path.join(distDir, '404.html');
        if (fs.existsSync(indexHtml)) {
          fs.copyFileSync(indexHtml, notFoundHtml);
        }
      }
    }
  };
}

export default defineConfig(() => {
  return {
    // Relative base path ensures assets load cleanly on root or GitHub Pages repository subpaths (e.g. /repo-name/)
    base: './',
    plugins: [react(), tailwindcss(), githubPagesHelper()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
