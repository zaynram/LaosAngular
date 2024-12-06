// src/app/shared/services/persistence.service.ts
import { Injectable } from '@angular/core';
import { FormData, FormProgress } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  private readonly FORM_ID_KEY = 'currentFormId';
  private readonly FORM_PREFIX = 'form_progress_';

  generateFormId(): string {
    return `form_${Date.now()}`;
  }

  getCurrentFormId(): string | null {
    return localStorage.getItem(this.FORM_ID_KEY);
  }

  setCurrentFormId(formId: string): void {
    localStorage.setItem(this.FORM_ID_KEY, formId);
  }

  async saveProgress(formData: FormData, currentIndex: number): Promise<string> {
    try {
      const formId = this.getCurrentFormId() ?? this.generateFormId();
      const progress: FormProgress = {
        formId,
        formData,
        lastQuestionIndex: currentIndex,
        lastAnsweredQuestionIndex: currentIndex,
        lastUpdated: new Date().toISOString()
      };

      await this.saveFormProgress(formId, progress);
      this.setCurrentFormId(formId);
      return formId;
    } catch (error) {
      console.error('Error saving form progress:', error);
      throw error;
    }
  }

  async loadProgress(formId: string): Promise<FormProgress | null> {
    try {
      const saved = localStorage.getItem(this.getProgressKey(formId));
      if (saved) {
        const progress = JSON.parse(saved) as FormProgress;
        // Validate loaded data structure
        if (this.isValidProgress(progress)) {
          return progress;
        }
      }
      return null;
    } catch (error) {
      console.error('Error loading form progress:', error);
      return null;
    }
  }

  clearProgress(formId?: string): void {
    const idToRemove = formId ?? this.getCurrentFormId();
    if (idToRemove) {
      localStorage.removeItem(this.getProgressKey(idToRemove));
      if (idToRemove === this.getCurrentFormId()) {
        localStorage.removeItem(this.FORM_ID_KEY);
      }
    }
  }

  clearAllProgress(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.FORM_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem(this.FORM_ID_KEY);
  }

  private async saveFormProgress(formId: string, progress: FormProgress): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        localStorage.setItem(this.getProgressKey(formId), JSON.stringify(progress));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private getProgressKey(formId: string): string {
    return `${this.FORM_PREFIX}${formId}`;
  }

  private isValidProgress(progress: any): progress is FormProgress {
    return (
      progress &&
      typeof progress === 'object' &&
      typeof progress.formId === 'string' &&
      typeof progress.formData === 'object' &&
      typeof progress.lastQuestionIndex === 'number' &&
      typeof progress.lastAnsweredQuestionIndex === 'number' &&
      typeof progress.lastUpdated === 'string'
    );
  }
}

