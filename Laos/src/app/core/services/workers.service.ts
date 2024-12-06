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
  private readonly apiUrl = environment.workerUrl;

  constructor(private http: HttpClient) {}

  getAddressSuggestions(query: string): Observable<{ suggestions: AddressSuggestion[] }> {
    const params = new HttpParams().set('query', query);
    return this.http.get<{ suggestions: AddressSuggestion[] }>(
      `${this.apiUrl}/address-suggestions`,
      { params }
    );
  }

  analyzeCaseDescription(text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/analyze-case`, { caseDescription: text });
  }

  checkHealth(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/api/health`);
  }
}
