import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://correctionspestreference.org',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  build: {
    format: 'directory'
  }
});
