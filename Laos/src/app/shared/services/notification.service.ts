// src/app/shared/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification = new BehaviorSubject<Notification | null>(null);
  private timeout: number | null = null;

  getNotification(): Observable<Notification | null> {
    return this.notification.asObservable();
  }

  show(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.notification.next({ message, type });

    this.timeout = window.setTimeout(() => {
      this.notification.next(null);
      this.timeout = null;
    }, duration);
  }

  clear(): void {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.notification.next(null);
  }
}