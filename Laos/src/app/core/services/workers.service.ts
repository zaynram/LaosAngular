import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  // Fetch address suggestions based on a query string
  getAddressSuggestions(query: string): Observable<{ suggestions: AddressSuggestion[] }> {
    const params = new HttpParams().set('query', query);
    return this.http.get<{ suggestions: AddressSuggestion[] }>(
      `${this.workersURL}/address-suggestions`,
      { params }
    );
  }

  // Analyze a case description and return the analysis result
  analyzeCaseDescription(text: string): Observable<any> {
    return this.http.post(`${this.workersURL}/api/analyze-case`, { caseDescription: text });
  }

  // Check the health status of the API
  checkHealth(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.workersURL}/api/health`);
  }
}