// src/app/shared/models/form.model.ts
export interface QuestionOption {
  value: string;
  label: string;
  nextQuestionId?: string;
}

export interface Question {
  id: string;
  text: string;
  type: string;
  section?: number;
  options?: QuestionOption[];
  required?: boolean;
  placeholder?: string;
  nextQuestionId?: string;
}

export interface FormProgress {
  formId: string;
  formData: FormData;
  lastQuestionIndex: number;
  lastAnsweredQuestionIndex: number;
  lastUpdated: string;
}

export interface FormData {
  [key: string]: string | undefined;
}

