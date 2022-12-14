import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode })=>{
  const plugins = [
      react(),
      mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        minify: true,
        workbox: {
          globPatterns: ["**\/*.{js,css,html,webp,png,jpg,ttf,otf}"]
        }
      })
  ]

  if(process.env?.ANALYZE === "TRUE") plugins.push(visualizer({ open: true }));

  return { plugins };
});
