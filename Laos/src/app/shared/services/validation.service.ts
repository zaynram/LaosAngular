// src/app/shared/services/validation.service.ts
import { Injectable } from '@angular/core';
import { FormData, Question } from '../models/form.model';
import { ValidationErrors } from '../models/validation.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  validateForm(data: FormData, questions: Question[]): ValidationErrors {
    const errors: ValidationErrors = {};

    questions.forEach(question => {
      if (!this.validateQuestion(question, data[question.id])) {
        errors[question.id] = this.getErrorMessage(question);
      }
    });

    return errors;
  }

  private validateQuestion(question: Question, value: string | undefined): boolean {
    if (question.required && !value) {
      return false;
    }

    switch (question.type) {
      case 'email':
        return !value || this.validateEmail(value);
      case 'tel':
        return !value || this.validatePhone(value);
      case 'date':
        return !value || this.validateDate(value);
      default:
        return true;
    }
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private validatePhone(phone: string): boolean {
    const phonePattern = /^\+?[\d\s-]{10,}$/;
    return phonePattern.test(phone);
  }

  private validateDate(date: string): boolean {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  private getErrorMessage(question: Question): string {
    if (question.required) {
      return 'This field is required';
    }
    switch (question.type) {
      case 'email':
        return 'Please enter a valid email address';
      case 'tel':
        return 'Please enter a valid phone number';
      case 'date':
        return 'Please enter a valid date';
      default:
        return 'Invalid input';
    }
  }
}