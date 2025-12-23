// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://ferreteria-rosita.pages.dev',
  adapter: cloudflare(),
  integrations: [
    sitemap(),
    react(),
    markdoc(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});