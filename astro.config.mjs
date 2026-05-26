import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://healthcarepestreference.org',
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
