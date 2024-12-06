// src/app/features/form/components/address-input/address-input.component.ts
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../../shared/services/address.service';
import { AddressSuggestion } from '../../../../core/models/address.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-input',
  template: 'address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {
  addressInput = new FormControl('');
  suggestions$ = this.addressService.getSuggestions();

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    // Subscribe to address input changes to trigger search
    this.addressInput.valueChanges.subscribe(value => {
      if (value) {
        this.addressService.search(value);
      }
    });
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addressService.search(input.value);
  }

  selectAddress(suggestion: AddressSuggestion): void {
    this.addressInput.setValue(
      `${suggestion.address}, ${suggestion.city}, ${suggestion.state} ${suggestion.zipCode}`
    );
  }
}
