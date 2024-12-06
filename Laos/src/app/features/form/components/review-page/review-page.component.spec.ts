// src/app/features/form/components/review-page/review-page.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPageComponent } from './review-page.component';
import { Question } from '../../../../shared/models/form.model';
import { By } from '@angular/platform-browser';

describe('ReviewPageComponent', () => {
  let component: ReviewPageComponent;
  let fixture: ComponentFixture<ReviewPageComponent>;

  const mockQuestions: Question[] = [
    { id: 'q1', text: 'Question 1', type: 'text', required: true },
    { id: 'q2', text: 'Question 2', type: 'text', required: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPageComponent);
    component = fixture.componentInstance;
    component.questions = mockQuestions;
    component.formData = { q1: 'Answer 1', q2: 'Answer 2' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all answered questions', () => {
    const answerItems = fixture.debugElement.queryAll(By.css('.answer-item'));
    expect(answerItems.length).toBe(mockQuestions.length);
  });

  it('should emit submit event on submit button click', () => {
    spyOn(component.submit, 'emit');
    const submitButton = fixture.debugElement.query(By.css('.submit-button')).nativeElement;
    submitButton.click();
    expect(component.submit.emit).toHaveBeenCalled();
  });

  it('should emit inputChange event on input change', () => {
    spyOn(component.inputChange, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'New Answer';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.inputChange.emit).toHaveBeenCalledWith({ questionId: 'q1', value: 'New Answer' });
  });
});