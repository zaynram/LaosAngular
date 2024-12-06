// src/app/core/models/address.model.ts
export interface AddressSuggestion {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AddressSuggestionsResponse {
  suggestions: AddressSuggestion[];
}