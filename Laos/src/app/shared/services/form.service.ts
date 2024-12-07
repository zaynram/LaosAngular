// src/app/shared/services/form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, last, lastValueFrom } from 'rxjs';
import { FormData, Question, FormProgress } from '../models/form.model';
import { ValidationErrors } from '../models/validation.model';
import { environment } from '../../../environments/environment';
import { of, from } from 'rxjs';
import { map, catchError, tap, throwError } from 'rxjs/operators';

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

  resetFormData(): void {
    this.formData.next({});
    this.currentQuestionIndex.next(0);
  }

  saveProgress(formData: FormData, currentIndex: number): Observable<string> {
    const formId = localStorage.getItem('currentFormId') ?? `form_${Date.now()}`;
    const progress: FormProgress = {
      formId,
      formData,
      lastQuestionIndex: currentIndex,
      lastAnsweredQuestionIndex: currentIndex,
      lastUpdated: new Date()
    };
    
    localStorage.setItem(`form_progress_${formId}`, JSON.stringify(progress));
    localStorage.setItem('currentFormId', formId);
    return of(formId);
  }

  loadProgress(formId: string): Observable<FormProgress | null> {
    const saved = localStorage.getItem(`form_progress_${formId}`);
    if (saved) {
      return of(JSON.parse(saved) as FormProgress);
    }
    return of(null);
  }

  clearProgress(): void {
    const formId = localStorage.getItem('currentFormId');
    if (formId) {
      localStorage.removeItem(`form_progress_${formId}`);
      localStorage.removeItem('currentFormId');
    }
  }

  generateDynamicQuestions(caseDescription: string): Observable<Question[]> {
    return this.http.post<{questions: Question[]}>(
      `${environment.apiUrl}/analyze-case`,
      { description: caseDescription }
    ).pipe(
      take(1),
      map(response => response.questions || []),
      catchError(error => {
        console.error('Error generating dynamic questions:', error);
        return of([]);
      })
    );
  }

  submitForm(data: FormData): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/submit-form`,
      data
    ).pipe(
      take(1),
      tap(() => this.clearProgress()),
      catchError(error => {
        console.error('Error submitting form:', error);
        return throwError(error);
      })
    );
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