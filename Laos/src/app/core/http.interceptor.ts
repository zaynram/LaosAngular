// src/app/core/http.interceptor.ts
import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, 
  HttpErrorResponse, HttpResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from '../shared/services/notification.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Add common headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return next.handle(modifiedRequest).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          // Handle successful responses
          if (event.status === 201) {
            this.notificationService.show('Resource created successfully', 'success');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        let errorMessage = 'An error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.notificationService.show(errorMessage, 'error');
        return throwError(() => error);
      })
    );
  }
}