import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AddressSuggestion {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private readonly workersURL = environment.workerUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch address suggestions based on a query string.
   * @param query - The query string to search for address suggestions.
   * @returns An observable containing an array of address suggestions.
   */
  getAddressSuggestions(query: string): Observable<{ suggestions: AddressSuggestion[] }> {
    const params = new HttpParams().set('query', query);
    return this.http.get<{ suggestions: AddressSuggestion[] }>(
      `${this.workersURL}/address-suggestions`,
      { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Analyze a case description and return the analysis result.
   * @param text - The case description text to analyze.
   * @returns An observable containing the analysis result.
   */
  analyzeCaseDescription(text: string): Observable<any> {
    return this.http.post<any>(`${this.workersURL}/api/analyze-case`, { caseDescription: text })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Check the health status of the API.
   * @returns An observable containing the health status.
   */
  checkHealth(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.workersURL}/api/health`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors.
   * @param error - The HTTP error response.
   * @returns An observable throwing an error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}