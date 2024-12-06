// src/config/endpoints.ts
export const API_ENDPOINTS = {
    WORKER_URL: process.env.REACT_APP_WORKER_URL ?? 'https://laos.workers.dev',
    CASE_ANALYSIS: '/api/analyze-case',
    ADDRESS_SEARCH: '/api/address-search',
    FORM_SUBMIT: '/api/submit-form'
  };