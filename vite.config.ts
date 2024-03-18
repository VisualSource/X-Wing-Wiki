import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa';
import Unfonts from 'unplugin-fonts/vite';
import react from '@vitejs/plugin-react';
import rehypeSlug from 'rehype-slug';
import { defineConfig } from 'vite';
import remarkGfm from 'remark-gfm';
import mdx from '@mdx-js/rollup';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const plugins = [
    react(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug]
    }),
    Unfonts({
      custom: {
        families: [{
          name: "Bank",
          src: "./public/font/BankGthd.ttf"
        }, {
          name: "Eurostile Demi",
          src: "./public/font/Eurostile-LT-Std-Demi-Oblique.ttf",

        }, {
          name: "Eurostile",
          src: "./public/font/Eurostile-LT-Std-Oblique.ttf"
        }]
      }
    }),
    VitePWA({
      manifest: false,
      minify: true,
      workbox: {
        sourcemap: true,
        globPatterns: ["**\/*.{js,css,html,webp,png,jpg,ttf,otf}"]
      }
    })
  ]

  if (process.env?.ANALYZE === "TRUE") plugins.push(visualizer({ open: true }));

  return {
    plugins,
    build: {
      sourcemap: true
    }
  };
});
