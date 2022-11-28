import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),mdx({
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  }),
  VitePWA({
    registerType: 'autoUpdate'
  })
]
})
