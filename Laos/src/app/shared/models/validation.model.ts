// src/app/shared/models/validation.model.ts

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationErrors = Record<string, string>;

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}