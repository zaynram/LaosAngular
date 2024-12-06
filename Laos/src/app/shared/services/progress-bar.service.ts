// src/app/features/shared/services/progress-bar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private progress = new BehaviorSubject<number>(0);

  setProgress(value: number): void {
    this.progress.next(value);
  }

  getProgress(): Observable<number> {
    return this.progress.asObservable();
  }

  updateProgress(currentIndex: number, total: number): void {
    const percentage = (currentIndex / total) * 100;
    this.setProgress(Math.min(percentage, 100));
  }
}