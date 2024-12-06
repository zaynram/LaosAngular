import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  WORKER_URL: environment.workerUrl ?? 'https://laos.workers.dev',
  CASE_ANALYSIS: '/api/analyze-case',
  ADDRESS_SEARCH: '/api/address-search',
  FORM_SUBMIT: '/api/submit-form'
};