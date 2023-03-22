import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173/',
    video: false,
  },
  env: {
    apiUrl: 'http://localhost:8080/',
  },
});
