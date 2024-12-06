import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionInputComponent } from './question-input.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

describe('QuestionInputComponent', () => {
  let component: QuestionInputComponent;
  let fixture: ComponentFixture<QuestionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [QuestionInputComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionInputComponent);
    component = fixture.componentInstance;
    component.question = {
      id: 'test-question',
      text: 'Test Question',
      type: 'text',
      required: true,
      section: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value on input', () => {
    const testValue = 'test input';
    spyOn(component.valueChange, 'emit');

    const input = fixture.nativeElement.querySelector('input');
    input.value = testValue;
    input.dispatchEvent(new Event('input'));

    expect(component.valueChange.emit).toHaveBeenCalledWith(testValue);
  });

  it('should emit on enter key', () => {
    spyOn(component.enter, 'emit');

    const input = fixture.nativeElement.querySelector('input');
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    input.dispatchEvent(enterEvent);

    expect(component.enter.emit).toHaveBeenCalled();
  });

  it('should show error state when hasError is true', () => {
    component.hasError = true;
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.input-wrapper');
    expect(wrapper.classList.contains('has-error')).toBeTruthy();
  });
});