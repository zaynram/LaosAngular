// src/app/shared/services/form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormData, Question, FormProgress } from '../models/form.model';
import { ValidationErrors } from '../models/validation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formData = new BehaviorSubject<FormData>({});
  private questions = new BehaviorSubject<Question[]>([]);
  private currentQuestionIndex = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getFormData(): Observable<FormData> {
    return this.formData.asObservable();
  }

  updateFormData(data: Partial<FormData>): void {
    this.formData.next({ ...this.formData.value, ...data });
  }

  getQuestions(): Observable<Question[]> {
    return this.questions.asObservable();
  }

  setQuestions(questions: Question[]): void {
    this.questions.next(questions);
  }

  getCurrentQuestionIndex(): Observable<number> {
    return this.currentQuestionIndex.asObservable();
  }

  setCurrentQuestionIndex(index: number): void {
    this.currentQuestionIndex.next(index);
  }

  async saveProgress(formData: FormData, currentIndex: number): Promise<string> {
    const formId = localStorage.getItem('currentFormId') ?? `form_${Date.now()}`;
    const progress: FormProgress = {
      formId,
      formData,
      lastQuestionIndex: currentIndex,
      lastAnsweredQuestionIndex: currentIndex,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(`form_progress_${formId}`, JSON.stringify(progress));
    localStorage.setItem('currentFormId', formId);
    return formId;
  }

  async loadProgress(formId: string): Promise<FormProgress | null> {
    const saved = localStorage.getItem(`form_progress_${formId}`);
    if (saved) {
      return JSON.parse(saved) as FormProgress;
    }
    return null;
  }

  clearProgress(): void {
    const formId = localStorage.getItem('currentFormId');
    if (formId) {
      localStorage.removeItem(`form_progress_${formId}`);
      localStorage.removeItem('currentFormId');
    }
  }

  async generateDynamicQuestions(caseDescription: string): Promise<Question[]> {
    try {
      const response = await this.http.post<{questions: Question[]}>(
        `${environment.apiUrl}/analyze-case`,
        { description: caseDescription }
      ).toPromise();
      return response?.questions || [];
    } catch (error) {
      console.error('Error generating dynamic questions:', error);
      throw error;
    }
  }

  async submitForm(data: FormData): Promise<any> {
    try {
      const response = await this.http.post(
        `${environment.apiUrl}/submit-form`,
        data
      ).toPromise();
      this.clearProgress();
      return response;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  }

  validateForm(data: FormData, questions: Question[]): ValidationErrors {
    const errors: ValidationErrors = {};
    questions.forEach(question => {
      if (question.required && !data[question.id]) {
        errors[question.id] = 'This field is required';
      }
    });
    return errors;
  }
}