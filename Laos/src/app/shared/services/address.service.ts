// src/app/features/form/services/address.service.ts
import { Injectable } from '@angular/core';
import { WorkersService, AddressSuggestion } from 'src/app/core/services/workers.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private searchTerms = new Subject<string>();

  constructor(private workersService: WorkersService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getSuggestions(): Observable<AddressSuggestion[]> {
    return this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => 
        this.workersService.getAddressSuggestions(term)
          .pipe(
            map(response => response.suggestions)
          )
      )
    );
  }
}