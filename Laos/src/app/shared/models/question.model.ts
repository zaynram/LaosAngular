// src/app/models/question.model.ts
export interface QuestionOption {
    value: string;
    label: string;
}

export interface Question {
    id: string;
    text: string;
    type: string;
    section: number;
    options?: QuestionOption[];
    required?: boolean;
    placeholder?: string;
}

export type FormData = Record<string, string>[];

export type ValidationErrors = Record<string, string>;

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface AddressSuggestion {
    id: string;
    text: string;
    score: number;
}

export interface FormattedAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
}

export interface CaseAnalysis {
    description: string;
    type: string;
    parties: {
        user: string;
        opposing: string;
    };
    complexity: number;
    timeline: string;
    recent_filing: string;
    relationships: Array<{
        relation: string;
        name: string | null;
        ask_for_id: boolean;
    }>;
}