// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: '', // GEMINI_API_URL
  apiVersion: 'v1',
  defaultTimeout: 10000,
  maxRetries: 3,
  workerUrl: 'https://laos.workers.dev',
  zaraz: {
    enabled: true,
    debug: true
  }
};