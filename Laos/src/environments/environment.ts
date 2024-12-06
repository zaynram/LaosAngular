// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: '', // GEMINI_API_URL
  apiVersion: 'v1',
  defaultTimeout: 10000,
  maxRetries: 3,
  workerUrl: 'http://localhost:8787',
  zaraz: {
    enabled: true,
    debug: true
  }
};