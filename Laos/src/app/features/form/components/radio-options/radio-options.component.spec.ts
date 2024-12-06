import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioOptionsComponent } from './radio-options.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

describe('RadioOptionsComponent', () => {
  let component: RadioOptionsComponent;
  let fixture: ComponentFixture<RadioOptionsComponent>;

  const mockQuestion = {
    id: 'test-radio',
    text: 'Test Radio Question',
    type: 'radio',
    required: true,
    section: 1,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [RadioOptionsComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioOptionsComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all radio options', () => {
    const radioInputs = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(radioInputs.length).toBe(mockQuestion.options.length);
  });

  it('should emit selected value on change', () => {
    spyOn(component.optionSelect, 'emit');
    const selectedValue = 'option1';

    const radioInput = fixture.nativeElement.querySelector(`input[value="${selectedValue}"]`);
    radioInput.click();

    expect(component.optionSelect.emit).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      value: selectedValue
    });
  });

  it('should mark saved value as checked', () => {
    const savedValue = 'option2';
    component.savedValue = savedValue;
    fixture.detectChanges();

    const checkedInput = fixture.nativeElement.querySelector(`input[value="${savedValue}"]`) as HTMLInputElement;
    expect(checkedInput.checked).toBeTruthy();
  });

  it('should show error state when hasError is true', () => {
    component.hasError = true;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Please select an option');
  });
});