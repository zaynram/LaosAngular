// src/app/features/form/components/address-input/address-input.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressInputComponent } from './address-input.component';
import { AddressService } from '../../../../shared/services/address.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AddressInputComponent', () => {
  let component: AddressInputComponent;
  let fixture: ComponentFixture<AddressInputComponent>;
  let mockAddressService: jasmine.SpyObj<AddressService>;

  beforeEach(async () => {
    mockAddressService = jasmine.createSpyObj('AddressService', ['search', 'getSuggestions']);
    mockAddressService.getSuggestions.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [AddressInputComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AddressService, useValue: mockAddressService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search on input', () => {
    const testValue = '123 Main St';
    const mockInput = document.createElement('input');
    mockInput.value = testValue;
    const mockEvent = new Event('input');
    Object.defineProperty(mockEvent, 'target', { value: mockInput });
    component.onInput(mockEvent);
    expect(mockAddressService.search).toHaveBeenCalledWith(testValue);
  });
});